import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ajoutez ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';

// Importations Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav'; // Pour le menu latéral
import { MatListModule } from '@angular/material/list';
import { JobseekerService } from '../../../services/jobseeker.service';
import { Jobseeker } from '../../../models/jobseeker.model';
import { Meeting, Task } from '../../../models/meeting.model';
import { MeetingsService } from '../../../services/meetings.service'; // Votre service
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QuillModule } from 'ngx-quill';


@Component({
  selector: 'app-meetings-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Pour ngModel
    ReactiveFormsModule, // Pour FormGroup
    MatTabsModule, // Le module des onglets
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    QuillModule,
  ],
  templateUrl: './meetings-dialog.component.html',
  styleUrl: './meetings-dialog.component.scss'
})
export class MeetingsDialogComponent implements OnInit {
  meetingForm!: FormGroup;
  nextMeetingForm!: FormGroup; // Formulaire pour le prochain RDV
  jobseekerDetails: Jobseeker | undefined; // Pour afficher le nom du jobseeker

  tasks: Task[] = []; // Tableau pour stocker les tâches
  newTaskDescription: string = ''; // Pour le champ d'ajout de nouvelle tâche
  newDueDate: Date | null = null;
  newStatus: 'en attente' | 'en cours' | 'realise' | 'abandonne' = 'en attente';

  taskStatuses = [
    { value: 'en attente', viewValue: 'En attente' },
    { value: 'en cours', viewValue: 'En cours' },
    { value: 'realise', viewValue: 'Réalisé' },
    { value: 'abandonne', viewValue: 'Abandonné' }
  ];

  constructor(
    public dialogRef: MatDialogRef<MeetingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { meeting?: Meeting, jobseekerId: number },
    private fb: FormBuilder,
    private meetingsService: MeetingsService,
    private jobseekerService: JobseekerService

  ) { }

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // Styles de texte
      ['blockquote', 'code-block'],                     // Blocs
      [{ 'header': 1 }, { 'header': 2 }],               // Titres
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],     // Listes
      [{ 'script': 'sub' }, { 'script': 'super' }],      // Exposant/Indice
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // Indentation
      [{ 'direction': 'rtl' }],                         // Direction du texte

      [{ 'size': ['small', false, 'large', 'huge'] }],  // Taille de police
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         // En-têtes (h1-h6)

      [{ 'color': [] }, { 'background': [] }],          // Couleurs
      [{ 'font': [] }],                                 // Police
      [{ 'align': [] }],                                // Alignement

      ['clean'],                                        // Supprimer le formatage
      ['link', 'image', 'video']                        // Médias
    ]
  };

  ngOnInit(): void {
    this.initForms();

    if (this.data.jobseekerId) {
      this.loadJobseekerDetails(this.data.jobseekerId);
    }

    if (this.data.meeting) {
      this.meetingForm.patchValue(this.data.meeting);
      this.tasks = this.data.meeting.tasks.map(task => ({
        ...task,
        meetingId: task.meetingId === undefined ? null : task.meetingId,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        status: task.status || 'en attente'
      })) || [];
      console.log('Mode édition. Données du rendez-vous:', this.data.meeting);
    } else {
      // Mode création : initialiser avec des valeurs par défaut
      this.meetingForm.patchValue({
        date: new Date(), // Date du jour par défaut
        type: 'Physique', // Type par défaut
        location: ''
      });
      console.log('Mode création de nouveau rendez-vous.');
    }
  }

  initForms(): void {
    this.meetingForm = this.fb.group({
      id: [null], // Pour les nouveaux meetings, l'ID sera null
      jobseekerId: [this.data.jobseekerId, Validators.required],
      date: [new Date(), Validators.required],
      type: ['', Validators.required],
      location: [''],
      note: ['']
    });

    this.nextMeetingForm = this.fb.group({
      nextDate: [null, Validators.required],
      nextType: ['', Validators.required],
      status: ['en attente', Validators.required]
    });
  }

  loadJobseekerDetails(id: number): void {
    this.jobseekerService.getJobseekerById(id).subscribe(
      (data: Jobseeker) => {
        this.jobseekerDetails = data;
      },
      error => {
        console.error('Erreur lors du chargement des détails du jobseeker dans la modale :', error);
        // Fallback pour les tests ou si le service n'est pas encore là
        this.jobseekerDetails = {
          id: id, urlPhoto: '', nom: 'Demandeur', prenom: 'Inconnu', email: '', tel: '', experiences: [], entreprise: '', descriptif: '', urlAttachement: '',
        };
      }
    );
  }

  /* get tasks(): FormArray {
     return this.meetingForm.get('tasks') as FormArray;
   }*/

  createTaskFormGroup(task?: Task): FormGroup {
    return this.fb.group({
      id: [task ? task.id : null],
      // L'ID de la réunion pour la tâche ne sera connu qu'après l'enregistrement si c'est un nouveau rendez-vous
      meetingId: [task && task.meetingId ? task.meetingId : null],
      description: [task ? task.description : '', Validators.required],
      isCompleted: [task ? task.isCompleted : false],
      // Assurez-vous que la date est bien un objet Date
      dueDate: [task && task.dueDate ? new Date(task.dueDate) : null]
    });
  }

  addTask(): void {
    if (this.newTaskDescription.trim()) {
      const newTaskId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id || 0)) + 1 : 1;

      this.tasks.push({
        id: newTaskId,
        meetingId: this.data.meeting?.id || null,
        description: this.newTaskDescription.trim(),
        isCompleted: false,
        dueDate: this.newDueDate,
        status: this.newStatus
      });
      this.newTaskDescription = '';
      this.newDueDate = null;
      this.newStatus = 'en attente';
      console.log('Tâche ajoutée:', this.tasks);
    }
  }


  toggleTaskCompletion(task: Task): void {
    task.isCompleted = !task.isCompleted;
    console.log('Tâche modifiée:', task);
  }



  removeTask(taskId?: number): void { // <-- Changed to 'taskId?: number'
    if (taskId !== undefined && taskId !== null) { // Add a check to ensure it's a valid number
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      console.log('Tâche supprimée. Tâches restantes:', this.tasks);
    } else {
      console.warn('Attempted to remove a task with an invalid ID (null or undefined).');
      // You might want to handle this case, perhaps by removing the task based on index or another property.
    }
  }

  updateTaskStatus(task: Task, newStatus: 'en attente' | 'en cours' | 'realise' | 'abandonne'): void {
    task.status = newStatus;
  }

  updateTaskDueDate(task: Task, newDate: Date | null): void {
    task.dueDate = newDate;
  }


  saveMeeting(): void {
    if (this.meetingForm.valid) {
      const meetingToSave: Meeting = {
        ...this.meetingForm.value,
        tasks: this.tasks // Inclure les tâches mises à jour
      };

      if (this.data.meeting?.id) {
        // Mode édition
        this.meetingsService.updateMeeting(meetingToSave).subscribe(
          response => {
            console.log('Rendez-vous mis à jour avec succès', response);
            this.dialogRef.close(true); // Fermer la modale et indiquer le succès
          },
          error => {
            console.error('Erreur lors de la mise à jour du rendez-vous', error);
            // Gérer l'erreur
          }
        );
      } else {
        // Mode création
        this.meetingsService.createMeeting(meetingToSave).subscribe(
          response => {
            console.log('Rendez-vous créé avec succès', response);
            this.dialogRef.close(true); // Fermer la modale et indiquer le succès
          },
          error => {
            console.error('Erreur lors de la création du rendez-vous', error);
            // Gérer l'erreur
          }
        );
      }
    } else {
      console.warn('Formulaire invalide. Veuillez vérifier les champs.');
    }
  }
  onCancel(): void {
    this.dialogRef.close(false); // Fermer la modale sans sauvegarder
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  /*===R&D===*/

  /**
  * Génère et télécharge un fichier ICS pour le rendez-vous actuel.
  * @param meeting Le rendez-vous à ajouter.
  */
  addMeetingToCalendar(meeting: Meeting): void {
    if (!meeting || !meeting.date || !meeting.type) {
      console.error("Impossible d'ajouter au calendrier : Données de rendez-vous manquantes.");
      return;
    }

    // Formatage des dates pour ICS (YYYYMMDDTHHMMSSZ)
    // IMPORTANT: Les dates ICS doivent être au format UTC et sans millisecondes.
    // Assure-toi que meeting.date est bien un objet Date JavaScript.
    // Si meeting.date est une string, tu devras la parser en Date d'abord.
    const startDate = new Date(meeting.date); // Crée une copie pour manipulation
    const endDate = new Date(startDate.getTime() + (60 * 60 * 1000)); // Exemple: durée de 1 heure

    // Fonction pour formater la date en UTC YYYYMMDDTHHMMSSZ
    const formatICSDate = (date: Date): string => {
      return date.toISOString().replace(/[-:]|\.\d{3}/g, '') + 'Z';
    };

    const formattedStartDate = formatICSDate(startDate);
    const formattedEndDate = formatICSDate(endDate);

    // Escape du texte pour éviter les problèmes de formatage ICS
    const escapeICS = (text: string | undefined): string => {
      return text ? text.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n') : '';
    };

    const title = escapeICS(`Rendez-vous avec ${this.jobseekerDetails?.prenom} ${this.jobseekerDetails?.nom}`);
    const description = escapeICS(`Type: ${meeting.type}\nNotes: ${meeting.note || 'Aucune note'}`);
    const location = escapeICS(meeting.location || 'Non spécifié');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Angular App//NONSGML v1.0//EN',
      'BEGIN:VEVENT',
      `UID:${meeting.id || new Date().getTime()}@yourdomain.com`, // UID unique pour l'événement
      `DTSTAMP:${formatICSDate(new Date())}`, // Date de création de l'événement ICS
      `DTSTART:${formattedStartDate}`,
      `DTEND:${formattedEndDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    // Créer un Blob (Binary Large Object) avec le contenu ICS
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

    // Créer un lien de téléchargement
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `rendez-vous-${this.jobseekerDetails?.nom}-${startDate.toLocaleDateString('fr-FR')}.ics`);
    document.body.appendChild(link); // Nécessaire pour que le clic fonctionne sur certains navigateurs
    link.click(); // Simuler un clic pour déclencher le téléchargement

    // Nettoyage
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    console.log('Fichier ICS généré et téléchargé.');
  }
}
