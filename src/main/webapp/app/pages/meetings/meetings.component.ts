import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { MeetingsDialogComponent } from '../meetings/meetings-dialog/meetings-dialog.component'
import { MeetingsService } from '../../services/meetings.service'
import { JobseekerService } from '../../services/jobseeker.service';
import { Meeting } from '../../models/meeting.model'
import { Jobseeker } from '../../models/jobseeker.model'

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSelectModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatListModule,
    MatCheckboxModule
  ],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss'
})
export class MeetingsComponent {
  jobseekerDetails!: Jobseeker;
  @Input() jobseekerId!: number;
  meetings: Meeting[] = [];
  upcomingMeetings: Meeting[] = [];
  pastMeetings: Meeting[] = [];

  constructor(
    private dialog: MatDialog,
    private meetingsService: MeetingsService,
    private jobseekerService: JobseekerService) { }

  ngOnInit(): void {
    if (!this.jobseekerId) {
      console.warn("jobseekerId non fourni via @Input, utilisation de l'ID par défaut (1) pour le test.");
      this.jobseekerId = 1; // ID par défaut pour le test
    }
    this.loadJobseekerDetails(this.jobseekerId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobseekerId'] && this.jobseekerId) {
      this.loadMeetings();
      this.loadJobseekerDetails(this.jobseekerId);
    }
  }

  private loadJobseekerDetails(id: number): void {
    this.jobseekerService.getJobseekerById(id).subscribe(
      (jobseeker: Jobseeker) => {
        this.jobseekerDetails = jobseeker;
      },
      error => {
        console.error('Erreur lors du chargement des détails du jobseeker :', error);
        // Fournit un objet Jobseeker de secours pour éviter les erreurs de template
        this.jobseekerDetails = {
          id: id,
          urlPhoto:'',
          nom: 'Erreur',
          prenom: 'Chargement',
          email: '',
          tel: '',
          experiences: [],
          entreprise: '',
          descriptif: '',
          urlAttachement: '',         
        };
      }
    );
  }

  loadMeetings(): void {

    const testMeetings: Meeting[] = [
      {
        id: 101,
        jobseekerId: this.jobseekerId, // Utilise l'ID du demandeur d'emploi actuel
        date: new Date('2025-06-25T10:00:00'), // Rendez-vous passé
        type: 'Physique',
        location: 'Bureau Paris',
        note: "Rendez-vous initial de présentation. Discussion des objectifs de carrière et des compétences clés. Le demandeur d'emploi semble motivé mais manque d'expérience en rédaction de CV.",
        tasks: [
          { id: 201, meetingId: 101, description: 'Envoyer guide CV par email', isCompleted: true },
          { id: 202, meetingId: 101, description: 'Prendre un nouveau rendez-vous pour relecture CV', isCompleted: false },
        ]
      },
      {
        id: 102,
        jobseekerId: this.jobseekerId,
        date: new Date('2025-07-10T14:30:00'), // Rendez-vous futur
        type: 'Visio',
        location: 'Teams',
        note: "Suivi CV. Préparation entretien simulé pour le poste de 'Chef de Projet Junior' chez XYZ Corp. Revoir les points faibles identifiés précédemment.",
        tasks: [
          { id: 203, meetingId: 102, description: 'Rédiger une lettre de motivation pour XYZ Corp', isCompleted: false },
          { id: 204, meetingId: 102, description: 'Préparer 3 questions à poser à l\'employeur', isCompleted: false },
          { id: 205, meetingId: 102, description: 'Rechercher des informations sur XYZ Corp', isCompleted: false },
        ]
      },
      {
        id: 103,
        jobseekerId: this.jobseekerId,
        date: new Date('2025-05-15T11:00:00'), // Autre rendez-vous passé
        type: 'Téléphone',
        location: 'N/A',
        note: "Point rapide sur l'avancement de la recherche. Le demandeur a postulé à 5 offres. Semble découragé par les rejets.",
        tasks: [
          { id: 206, meetingId: 103, description: 'Faire le point sur les retours des candidatures', isCompleted: true },
        ]
      },
      {
        id: 104,
        jobseekerId: this.jobseekerId,
        date: new Date('2025-08-01T09:00:00'), // Autre rendez-vous futur
        type: 'Physique',
        location: 'Agence Pôle Emploi',
        note: "Bilan intermédiaire parcours. Évaluation des compétences complémentaires. Définition d'un plan d'action pour les 3 prochains mois. Peut-être envisager une formation courte.",
        tasks: [
          { id: 207, meetingId: 104, description: 'Identifier 2 formations courtes pertinentes', isCompleted: false },
          { id: 208, meetingId: 104, description: 'Mettre à jour le profil LinkedIn', isCompleted: false },
        ]
      },
    ];

    this.meetings = testMeetings.sort((a, b) => a.date.getTime() - b.date.getTime());

    this.filterMeetings();
    this.meetingsService.getMeetingsByJobseekerId(this.jobseekerId).subscribe(
      (data: Meeting[]) => {
        this.meetings = data.sort((a, b) => a.date.getTime() - b.date.getTime()); // Tri par date
        this.filterMeetings();
      },
      error => console.error('Erreur lors du chargement des rendez-vous :', error)
    );
  }

  filterMeetings(): void {
    const now = new Date();
    this.upcomingMeetings = this.meetings.filter(m => new Date(m.date) >= now);
    this.pastMeetings = this.meetings.filter(m => new Date(m.date) < now);
  }

  openMeetingDialog(meeting?: Meeting): void {
    const dialogRef = this.dialog.open(MeetingsDialogComponent, {
      width: '2500px',
      height: '800px',
      data: { meeting: meeting, jobseekerId: this.jobseekerId },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMeetings(); // Recharger les rendez-vous après ajout/modification
      }
    });
  }
  deleteMeeting(meetingId: number | null): void { // <-- Modifiez le type du paramètre
    if (meetingId === null) {
      console.warn("Impossible de supprimer un rendez-vous sans ID.");
      return; // Sortir si l'ID est nul
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      // Maintenant, TypeScript sait que meetingId est un 'number' ici
      this.meetingsService.deleteMeeting(meetingId).subscribe(
        () => {
          this.loadMeetings();
        },
        error => console.error('Erreur lors de la suppression du rendez-vous :', error)
      );
    }
  }

}
