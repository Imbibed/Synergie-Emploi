import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import * as L from 'leaflet';

interface Experience {
  company: string;
  startDate: string;
  endDate: string;
  skills: string;
  description: string;
};

@Component({
  selector: 'app-jobseeker-edit',
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
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSelectModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
  ],
  templateUrl: './edit-jobseeker.component.html',
  styleUrls: ['./edit-jobseeker.component.scss']
})
export class JobseekerEditComponent implements OnInit {
  form!: FormGroup;
  jobseekerId!: string;

  map!: L.Map;
  marker?: L.Marker;
  latitude: number = 49.450001;  // Canteleu
  longitude: number = 1.03333;


  //TODO pouvoir retracter les cards pour plus de lisibilité
  isProfileCollapsed = false;
  isContactCollapsed = false;
  isLocationCollapsed = false;
  isHistoryCollapsed = false;
  isLinkCollapsed = false;

  gradesLevel = [
    {value: 'niveau-I', label: 'Niveau I'},
    {value: 'niveau-II', label: 'Niveau II'},
    {value: 'niveau-III', label: 'Niveau III'},
    {value: 'niveau-IV', label: 'Niveau IV'},
    {value: 'niveau-V', label: 'Niveau V'},
    {value: 'niveau-VI', label: 'Niveau VI'}
  ];

  licenceTypes = [
    {value: 'AM', label: 'Permis AM - Cyclomoteur'},
    {value: 'A', label: 'Permis A - Moto'},
    {value: 'A1', label: 'Permis A1 - Moto'},
    {value: 'A2', label: 'Permis A2 - Moto'},
    {value: 'C', label: 'Permis C - Transport Marchandises/Matériels'},
    {value: 'C1', label: 'Permis C1 - Transport Marchandises/Matériels'},
    {value: 'C1E', label: 'Permis C1E - Transport Marchandises/Matériels'},
    {value: 'D', label: 'Permis D - Transport en Commun'},
    {value: 'E', label: 'Permis E - (BE, CE, DE)'},
    {value: 'notAllowed', label: 'Retrait ou Supendu'},
    {value: 'none', label: 'Sans permis'},
  ];

  transportMeans = [
    {value: '', label: ''},
    {value: 'voiturePerso', label: 'Voiture perso'},
    {value: 'covoiturage', label: 'Covoiturage'},
    {value: 'transportCommun', label: 'Transport en Commun'},
    {value: 'velo', label: 'Vélo'},
    {value: 'transportAdapté', label: 'Transport adapté'},
  ];

  languagesList = [
    {value: 'zh-CN', label: 'Chinois (mandarin)'},
    {value: 'es-ES', label: 'Espagnol'},
    {value: 'en-US', label: 'Anglais'},
    {value: 'hi-IN', label: 'Hindi'},
    {value: 'ar-SA', label: 'Arabe'},
    {value: 'bn-BD', label: 'Bengali'},
    {value: 'pt-BR', label: 'Portugais (Brésil)'},
    {value: 'ru-RU', label: 'Russe'},
    {value: 'ja-JP', label: 'Japonais'},
    {value: 'pa-IN', label: 'Panjabi'},
    {value: 'de-DE', label: 'Allemand'},
    {value: 'jv-ID', label: 'Javanais'},
    {value: 'ko-KR', label: 'Coréen'},
    {value: 'fr-FR', label: 'Français'},
    {value: 'te-IN', label: 'Télougou'},
    {value: 'vi-VN', label: 'Vietnamien'},
    {value: 'mr-IN', label: 'Marathi'},
    {value: 'tr-TR', label: 'Turc'},
    {value: 'ta-IN', label: 'Tamoul'},
    {value: 'ur-PK', label: 'Ourdou'}
  ];

  skillsList = [
    {value: 'plomberie', label: 'Plomberie'},
    {value: 'electricite', label: 'Électricité'},
    {value: 'menuiserie', label: 'Menuiserie'},
    {value: 'maçonnerie', label: 'Maçonnerie'},
    {value: 'carrelage', label: 'Pose de carrelage'},
    {value: 'peinture', label: 'Peinture intérieure/extérieure'},
    {value: 'chauffage', label: 'Installation chauffage'},
    {value: 'climatisation', label: 'Climatisation'},
    {value: 'soudure', label: 'Soudure'},
    {value: 'mécanique-auto', label: 'Mécanique automobile'},
    {value: 'usinage', label: 'Usinage / Fraisage'},
    {value: 'maintenance-industrielle', label: 'Maintenance industrielle'},
    {value: 'logistique', label: 'Logistique'},
    {value: 'conduite-engins', label: 'Conduite d’engins de chantier'},
    {value: 'caces', label: 'CACES (cariste / chariot élévateur)'},
    {value: 'pose-menuiserie', label: 'Pose de fenêtres / portes'},
    {value: 'nettoyage-industriel', label: 'Nettoyage industriel'},
    {value: 'élingage', label: 'Élingage / Levage'},
    {value: 'plâtrerie', label: 'Plâtrerie / Isolation'},
    {value: 'couvreur', label: 'Couverture / Toiture'},
    // Développement & Tech
    {value: 'javascript', label: 'JavaScript'},
    {value: 'typescript', label: 'TypeScript'},
    {value: 'react', label: 'React.js'},
    {value: 'angular', label: 'Angular'},
    {value: 'nodejs', label: 'Node.js'},
    {value: 'python', label: 'Python'},
    {value: 'java', label: 'Java'},
    {value: 'sql', label: 'SQL'},
    {value: 'devops', label: 'DevOps'},
    {value: 'docker', label: 'Docker'},
    {value: 'kubernetes', label: 'Kubernetes'},
    {value: 'git', label: 'Git'},

    // Data & IA
    {value: 'data-analysis', label: 'Analyse de données'},
    {value: 'machine-learning', label: 'Machine Learning'},
    {value: 'deep-learning', label: 'Deep Learning'},
    {value: 'powerbi', label: 'Power BI'},
    {value: 'excel', label: 'Excel avancé'},

    // Gestion de projet
    {value: 'agile', label: 'Méthodologie Agile'},
    {value: 'scrum', label: 'Scrum'},
    {value: 'kanban', label: 'Kanban'},
    {value: 'jira', label: 'Jira'},
    {value: 'notion', label: 'Notion'},

    // Design & UX
    {value: 'ui-design', label: 'UI Design'},
    {value: 'ux-design', label: 'UX Design'},
    {value: 'figma', label: 'Figma'},
    {value: 'adobe-creative-suite', label: 'Adobe Creative Suite'},

    // Communication & Soft Skills
    {value: 'communication', label: 'Communication'},
    {value: 'leadership', label: 'Leadership'},
    {value: 'teamwork', label: 'Travail en équipe'},
    {value: 'problem-solving', label: 'Résolution de problèmes'},
    {value: 'time-management', label: 'Gestion du temps'},

    // Marketing & Digital
    {value: 'seo', label: 'SEO'},
    {value: 'sem', label: 'SEM / Google Ads'},
    {value: 'social-media', label: 'Marketing des réseaux sociaux'},
    {value: 'content-creation', label: 'Création de contenu'},

    // Comptabilité & Business
    {value: 'finance', label: 'Analyse financière'},
    {value: 'accounting', label: 'Comptabilité'},
    {value: 'erp', label: 'ERP (SAP, Oracle, etc.)'},
    {value: 'crm', label: 'CRM (Salesforce, HubSpot...)'}
  ];

  dataSource = new MatTableDataSource<any>([]); // ton tableau source ici
  selection = new Set<any>(); // ou MatSelectionModel si tu veux plus avancé

  /*Genration d'unne nouvelle expérience */
  private createExperienceGroup(exp: Experience): FormGroup {
    return this.fb.group({
      company: [exp.company],
      startDate: [exp.startDate],
      endDate: [exp.endDate],
      skills: [exp.skills],
      description: [exp.description]
    });
  }

  /*Get pour que TS vois le champs experiences as a Formarray*/
  get experiencesControls() {
    return (this.form.get('experiences') as FormArray).controls;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      urlPhoto: [''],
      entreprise: [''],
      descriptif: [''],
      urlAttachement: [''],
      gender: [''],
      nom: [''],
      prenom: [''],
      tel: [''],
      portable: [''],
      email: [''],
      jobTitle: [''],
      skills: [[]],
      languages: [[]],
      experiences: this.fb.array([]),
      aboutMe: [''],
      qpv: [''],
      rth: [''],
      rsa: [''],
      gradesLevel: [[]],
      lastGrade: [''],
      licenceTypes: [[]],     // tableau vide par défaut
      transportMeans: [[]],
      adresse: [''],
      ville: [''],
      zipCode: [''],
      longitude: [''],
      latitude: [''],
      dernierRdv: [null],
      prochainRdv: [null],
      statut: [''],
      comments: ['']
    });
  }


  ngOnInit(): void {
    this.jobseekerId = this.route.snapshot.paramMap.get('id')!;

    console.log('ID reçu dans l’URL :', this.jobseekerId);
    this.latitude = 49.450001;  // Canteleu
    this.longitude = 1.03333;
    this.map = L.map('map').setView([this.latitude, this.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;
      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng).addTo(this.map);
      }
    });


    this.dataSource.data = [{
      id: 1,
      urlPhoto: '',
      entreprise: 'Total',
      descriptif: 'Fin de contrat CDD',
      urlAttachement: '',
      nom: 'Blaise',
      prenom: 'Pascal',
      tel: '0254875487',
      portable: '0664542132',
      email: 'blaise.pascal@wanadoo.fr',
      jobTitle: 'Opérateur pétrochimie',
      skills: ['Opération pétrochimie', 'Sécurité industrielle'],
      /*Nouveau format*/
      experiences: [{
        company: 'Total',
        startDate: '01/01/2018',
        endDate: '01/01/2023',
        skills: 'Opération pétrochimie',
        description: 'Conduite de process en raffinerie'
      },
        {
          company: 'Shell',
          startDate: '01/02/2016',
          endDate: '31/12/2017',
          skills: 'Sécurité industrielle',
          description: 'Suivi HSE des installations'
        }],
      languages: ['Français', 'Turc'],
      aboutMe: 'bla bla',
      qpv: 'Oui',
      rth: 'Non',
      rsa: 'Non',
      gradesLevel: 'Niveau3',
      lastGrade: 'BTS Petrochimie',
      licenceTypes: ['A', 'B'],
      transportMeans: ['voiturePerso', 'transportCommun'],
      adresse: '52 route des oiseaux',
      ville: 'Canteleu',
      zipCode: '76380',
      longitude: '',
      latitude: '',
      dernierRdv: [null],
      prochainRdv: [null],
      statut: 'Sans Emploi',
      comments: '45 ans et motivé !'
    }];

    const jobseeker = this.dataSource.data.find(item => item.id === Number(this.jobseekerId));
    if (jobseeker) {
      this.form.patchValue({
        nom: jobseeker.nom,
        prenom: jobseeker.prenom,
        tel: jobseeker.tel,
        portable: jobseeker.portable,
        email: jobseeker.email,
        adresse: jobseeker.adresse,
        ville: jobseeker.ville,
        zipCode: jobseeker.zipCode,
        qpv: jobseeker.qpv,
        rth: jobseeker.rth,
        rsa: jobseeker.rsa,
        gradesLevel: jobseeker.gradesLevel,
        lastGrade: jobseeker.lastGrade,
        statut: jobseeker.statut,
        commentaires: jobseeker.commentaires,
        latitude: jobseeker.latitude,
        longitude: jobseeker.longitude,
        dernierRdv: jobseeker.dernierRdv,
        prochainRdv: jobseeker.prochainRdv,
        licenceTypes: jobseeker.licenceTypes,
        transportMeans: jobseeker.transportMeans,
        skills: jobseeker.skills,
        languages: jobseeker.languages,
        comments: jobseeker.comments
      });
      // Gestion spéciale pour le FormArray `experiences`
      const expArray = this.form.get('experiences') as FormArray;

      if (Array.isArray(jobseeker.experiences)) {
        jobseeker.experiences.forEach((exp: Experience) => {
          expArray.push(this.fb.group({
            company: [exp.company],
            startDate: [exp.startDate],
            endDate: [exp.endDate],
            skills: [exp.skills],
            description: [exp.description],
          }));
        });
      }
    }
  }

  onPhotoChange(event: any) {
    console.log(event)
  }

  changePhoto() {
    console.log()
  }

  onFileUpload(event: any, fileType: string) {
    console.log(event, fileType)
  }


  addExperience() {
    // expArray.push(this.createExperienceGroup(exp));
    console.log()
  }

  removeExperience(i: any) {
    console.log()
  }

  onNewRdv() {
    console.log()
    //this.router.navigate(['partnerRdv',this.partnerId]);
    //TODO : CREER La page de gestion ndes rendez vous
  }

  onSave() {
    console.log()
    //TODO : SAUVEGARDE DU FORMULAIRE
  }

  onCancel() {
    this.router.navigate(['jobseeker']);
  }

  onExport() {
    console.log()
    //TODO : export de l'enemble de l'historique d'est échange avec le partenaire

  }

  /*GESTION LEAFLET MAP*/

  initMap(): void {
    this.map = L.map('map').setView([48.8566, 2.3522], 13); // Paris par défaut

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;

      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng).addTo(this.map);
      }
    });
  }

  updateMarker(): void {
    const latlng = L.latLng(this.latitude, this.longitude);
    if (this.marker) {
      this.marker.setLatLng(latlng);
    } else {
      this.marker = L.marker(latlng).addTo(this.map);
    }
    this.map.setView(latlng, 13);
  }

  actions = new MatTableDataSource([
    {date: new Date(), type: 'Entretien téléphonique', note: 'Interessé'},
    {date: new Date(), type: 'Présentation', note: 'Envoyé à XYZ'},
  ]);
  displayedColumnsActions: string[] = ['date', 'type', 'note'];


  linkToJobseeker = new MatTableDataSource([
    {date: new Date(), type: 'Michel Dupont', note: 'Période d\'essai inachevée'},
    {date: new Date(), type: 'Gwendoline Henri', note: 'CDD 3 ans'},
  ]);
  displayedColumnsLink: string[] = ['date', 'type', 'note'];


}
