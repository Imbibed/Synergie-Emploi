import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { MailSettingsService } from '../../services/mail-settings.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MeetingsDialogComponent } from '../../pages/meetings/meetings-dialog/meetings-dialog.component';
import { MeetingsService } from '../../services/meetings.service';
import { Meeting } from '../../models/meeting.model';
import { Jobseeker } from '../../models/jobseeker.model';
import * as L from 'leaflet';

interface Experience {
  company: string;
  startDate: string;
  endDate: string;
  skills: string;
  description: string;
  endFor: string;

};

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Child {
  id: number;
  name: string;
  surname: string;
  guardStatus: boolean;
  visitRight: boolean;
  presence: boolean;
};

interface ParcoursEmploi {
  unemployedDate: Date;
  FranceTravailDate: Date;
  dernierRdv: Date,
  prochainRdv: Date,
}


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
    MatSlideToggleModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  templateUrl: './edit-jobseeker.component.html',
  styleUrls: ['./edit-jobseeker.component.scss']
})
export class JobseekerEditComponent implements OnInit {
  form!: FormGroup;
  jobseekerId!: number;
  jobseekerDetails!: Jobseeker;
  isInterviewMode = false;
  isReadOnly = true;
  isCvHidden = false;
  isCollapsedSC = true;
  isCollapsedIP = true;
  isCollapsedIPR = true;
  isCollapsedIC = true;
  isCollapsedLOC = true;
  isCollapsedMAP = true;
  isCollapsedDEM = true;


  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  map!: L.Map;
  marker?: L.Marker;
  latitude: number = 49.450001;  // Canteleu
  longitude: number = 1.03333;

  gradesLevel = [
    { value: 'niveau-I', label: 'Niveau I' },
    { value: 'niveau-II', label: 'Niveau II' },
    { value: 'niveau-III', label: 'Niveau III' },
    { value: 'niveau-IV', label: 'Niveau IV' },
    { value: 'niveau-V', label: 'Niveau V' },
    { value: 'niveau-VI', label: 'Niveau VI' }
  ];

  licenceTypes = [
    { value: 'AM', label: 'Permis AM - Cyclomoteur' },
    { value: 'A', label: 'Permis A - Moto' },
    { value: 'A1', label: 'Permis A1 - Moto' },
    { value: 'A2', label: 'Permis A2 - Moto' },
    { value: 'C', label: 'Permis C - Transport Marchandises/Matériels' },
    { value: 'C1', label: 'Permis C1 - Transport Marchandises/Matériels' },
    { value: 'C1E', label: 'Permis C1E - Transport Marchandises/Matériels' },
    { value: 'D', label: 'Permis D - Transport en Commun' },
    { value: 'E', label: 'Permis E - (BE, CE, DE)' },
    { value: 'notAllowed', label: 'Retrait ou Supendu' },
    { value: 'none', label: 'Sans permis' },
  ];

  transportMeans = [
    { value: '', label: '' },
    { value: 'voiturePerso', label: 'Voiture perso' },
    { value: 'covoiturage', label: 'Covoiturage' },
    { value: 'transportCommun', label: 'Transport en Commun' },
    { value: 'velo', label: 'Vélo' },
    { value: 'transportAdapté', label: 'Transport adapté' },
  ];

  languagesList = [
    { value: 'zh-CN', label: 'Chinois (mandarin)' },
    { value: 'es-ES', label: 'Espagnol' },
    { value: 'en-US', label: 'Anglais' },
    { value: 'hi-IN', label: 'Hindi' },
    { value: 'ar-SA', label: 'Arabe' },
    { value: 'bn-BD', label: 'Bengali' },
    { value: 'pt-BR', label: 'Portugais (Brésil)' },
    { value: 'ru-RU', label: 'Russe' },
    { value: 'ja-JP', label: 'Japonais' },
    { value: 'pa-IN', label: 'Panjabi' },
    { value: 'de-DE', label: 'Allemand' },
    { value: 'jv-ID', label: 'Javanais' },
    { value: 'ko-KR', label: 'Coréen' },
    { value: 'fr-FR', label: 'Français' },
    { value: 'te-IN', label: 'Télougou' },
    { value: 'vi-VN', label: 'Vietnamien' },
    { value: 'mr-IN', label: 'Marathi' },
    { value: 'tr-TR', label: 'Turc' },
    { value: 'ta-IN', label: 'Tamoul' },
    { value: 'ur-PK', label: 'Ourdou' }
  ];

  skillsList = [
    { value: 'plomberie', label: 'Plomberie' },
    { value: 'electricite', label: 'Électricité' },
    { value: 'menuiserie', label: 'Menuiserie' },
    { value: 'maçonnerie', label: 'Maçonnerie' },
    { value: 'carrelage', label: 'Pose de carrelage' },
    { value: 'peinture', label: 'Peinture intérieure/extérieure' },
    { value: 'chauffage', label: 'Installation chauffage' },
    { value: 'climatisation', label: 'Climatisation' },
    { value: 'soudure', label: 'Soudure' },
    { value: 'mécanique-auto', label: 'Mécanique automobile' },
    { value: 'usinage', label: 'Usinage / Fraisage' },
    { value: 'maintenance-industrielle', label: 'Maintenance industrielle' },
    { value: 'logistique', label: 'Logistique' },
    { value: 'conduite-engins', label: 'Conduite d’engins de chantier' },
    { value: 'caces', label: 'CACES (cariste / chariot élévateur)' },
    { value: 'pose-menuiserie', label: 'Pose de fenêtres / portes' },
    { value: 'nettoyage-industriel', label: 'Nettoyage industriel' },
    { value: 'élingage', label: 'Élingage / Levage' },
    { value: 'plâtrerie', label: 'Plâtrerie / Isolation' },
    { value: 'couvreur', label: 'Couverture / Toiture' },
    // Développement & Tech
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'sql', label: 'SQL' },
    { value: 'devops', label: 'DevOps' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'git', label: 'Git' },

    // Data & IA
    { value: 'data-analysis', label: 'Analyse de données' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'deep-learning', label: 'Deep Learning' },
    { value: 'powerbi', label: 'Power BI' },
    { value: 'excel', label: 'Excel avancé' },

    // Gestion de projet
    { value: 'agile', label: 'Méthodologie Agile' },
    { value: 'scrum', label: 'Scrum' },
    { value: 'kanban', label: 'Kanban' },
    { value: 'jira', label: 'Jira' },
    { value: 'notion', label: 'Notion' },

    // Design & UX
    { value: 'ui-design', label: 'UI Design' },
    { value: 'ux-design', label: 'UX Design' },
    { value: 'figma', label: 'Figma' },
    { value: 'adobe-creative-suite', label: 'Adobe Creative Suite' },

    // Communication & Soft Skills
    { value: 'communication', label: 'Communication' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'teamwork', label: 'Travail en équipe' },
    { value: 'problem-solving', label: 'Résolution de problèmes' },
    { value: 'time-management', label: 'Gestion du temps' },

    // Marketing & Digital
    { value: 'seo', label: 'SEO' },
    { value: 'sem', label: 'SEM / Google Ads' },
    { value: 'social-media', label: 'Marketing des réseaux sociaux' },
    { value: 'content-creation', label: 'Création de contenu' },

    // Comptabilité & Business
    { value: 'finance', label: 'Analyse financière' },
    { value: 'accounting', label: 'Comptabilité' },
    { value: 'erp', label: 'ERP (SAP, Oracle, etc.)' },
    { value: 'crm', label: 'CRM (Salesforce, HubSpot...)' }
  ];

  users: User[] = [
    { id: 1, firstName: 'Florian', lastName: 'RAULT', email: 'florian.rault@live.fr' },
    { id: 2, firstName: 'Ludovic', lastName: 'DELESQUE', email: 'ludovic.delesque@ville-canteleu.fr' },
    { id: 3, firstName: 'Belinda', lastName: 'BOUCHRY', email: 'belinda?bouchry@ville-canteleu.fr' },
    { id: 4, firstName: 'Amal', lastName: 'JOHN', email: 'amal.john@ville-canteleu.fr' },
  ];

  endForList = [
    { value: 'career-change', label: 'Changement de carrière' },
    { value: 'end-of-contract', label: 'Fin de contrat' },
    { value: 'personal-projects', label: 'Projets personnels' },
    { value: 'relocation', label: 'Déménagement' },
    { value: 'health-reasons', label: 'Raisons de santé' },
    { value: 'family-commitments', label: 'Engagements familiaux' },
    { value: 'return-to-studies', label: 'Reprise des études' },
    { value: 'entrepreneurship', label: 'Création d’entreprise' },
    { value: 'burnout', label: 'Épuisement professionnel' },
    { value: 'lack-of-growth', label: 'Manque de perspectives d’évolution' },
    { value: 'company-closure', label: 'Fermeture de l’entreprise' },
    { value: 'layoff', label: 'Licenciement économique' },
    { value: 'contractual-disagreement', label: 'Désaccord contractuel' },
    { value: 'maternity-leave', label: 'Congé maternité/paternité' },
    { value: 'sabbatical', label: 'Congé sabbatique' },
    { value: 'other', label: 'Autres...' }
  ]

  situationFamiliale: string = '';
  nbEnfantsFoyer: number = 0;
  nbEnfantsSupp: number = 0;
  totalEnfants: number = 0;

  childrenData: any[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'garde', 'visite', 'absent', 'supprimer'];


  filteredSkillsList = [...this.skillsList];
  skillFilter = '';


  filterSkills(): void {
    const filterValue = this.skillFilter.toLowerCase();
    this.filteredSkillsList = this.skillsList.filter(skill =>
      skill.label.toLowerCase().includes(filterValue)
    );
  }

  filteredendForList = [...this.endForList];
  endForFilter = '';

  filterEndFor(): void {
    const filterValue = this.endForFilter.toLowerCase();

    this.filteredendForList = this.endForList.filter(endFor =>
      endFor.label.toLowerCase().includes(filterValue)
    );
  }

  dataSource = new MatTableDataSource<any>([]); // ton tableau source ici
  selection = new Set<any>(); // ou MatSelectionModel si tu veux plus avancé

  /*Genration d'unne nouvelle expérience */
  private createExperienceGroup(exp: Experience): FormGroup {
    return this.fb.group({
      company: [exp.company],
      startDate: [exp.startDate],
      endDate: [exp.endDate],
      skills: [exp.skills],
      description: [exp.description],
      endFor: [exp.endFor]
    });
  }

  /*Get pour que TS vois le champs as a Formarray*/
  get experiencesControls() {
    return (this.form.get('experiences') as FormArray).controls;
  }

  /*Genration d'un nouvelle enfant */
  private createChildForm(): FormGroup {
    return this.fb.group({
      name: [''],
      surname: [''],
      guardStatus: [true],
      visitRight: [true],
      presence: [true],
    });
  }

  get childrenControls() {
    return (this.form.get('childrenInformations') as FormArray).controls;
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mailSettings: MailSettingsService,
    private dialog: MatDialog,
    private meetingsService: MeetingsService
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
      famillySituation: [''],
      homeChild: [''],
      suppChild: [''],
      transportMeans: [[]],
      gradesLevel: [[]],
      lastGrade: [''],
      licenceTypes: [[]],     // tableau vide par défaut
      childrenInformations: this.fb.array([]),
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

  displayedColumnsChildren = ['nom', 'prenom', 'garde', 'visite', 'absent'];

  /*GEstion de l'historique des actions*/
  actions = new MatTableDataSource<Meeting>();
  displayedColumnsActions: string[] = ['date', 'type', 'note', 'action'];



  linkToJobseeker = new MatTableDataSource([
    { date: new Date(), type: 'Michel Dupont', note: 'Période d\'essai inachevée' },
    { date: new Date(), type: 'Gwendoline Henri', note: 'CDD 3 ans' },
  ]);
  displayedColumnsLink: string[] = ['date', 'type', 'note'];


  ngOnInit(): void {
    //this.jobseekerId = this.route.snapshot.paramMap.get('id')!;

    this.route.paramMap.subscribe(params => {
      const idString = params.get('id'); // 'id' est le nom du paramètre dans ton chemin de route (e.g., /jobseeker/:id)
      if (idString) {
        this.jobseekerId = +idString; // Le '+' convertit la chaîne en nombre
        console.log('Jobseeker ID from route:', this.jobseekerId);

        // Une fois que tu as le jobseekerId, tu peux charger ses détails et ses meetings
        this.loadJobseekerDetails(this.jobseekerId);
        this.loadMeetingsForTable(this.jobseekerId);
      } else {
        console.warn('Jobseeker ID non trouvé dans la route. Chargement en mode création ou fallback.');
        // Gérer le cas où l'ID n'est pas fourni (ex: mode création d'un nouveau jobseeker)
        // Ou utiliser un ID par défaut pour le développement/test
        this.jobseekerId = 101; // ID factice pour tester si aucun ID n'est dans l'URL
        this.loadJobseekerDetails(this.jobseekerId);
        this.loadMeetingsForTable(this.jobseekerId);
      }
    });

    const childrenArray = this.form.get('childrenInformations') as FormArray;
    if (childrenArray.length === 0) {
      childrenArray.push(this.createChildForm());
    }

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

    const selectedUser = this.users.find(u => u.id === 1);


    this.dataSource.data = [{
      id: 1, urlPhoto: '', entreprise: 'Bouygues Construction',
      descriptif: 'Fin de contrat CDD', urlAttachement: '',
      nom: 'Durand', prenom: 'Sophie', tel: '0145789654',
      portable: '0678945123',
      email: 'sophie.durand@bouygues.fr',
      jobTitle: 'Conductrice de travaux',
      skills: ['Gestion de chantier', 'Sécurité BTP'],
      experiences: [
        {
          company: 'Bouygues Construction',
          startDate: '01/03/2019',
          endDate: '01/03/2024',
          skills: 'Gestion de chantier',
          description: 'Responsable du suivi de chantiers en Île-de-France',
          endFor: 'Fin de contrat',
        }],
      famillySituation: 'option3',
      childrenInformations: [{
        name: 'Durand',
        surname: 'Titouan',
        guardStatus: true,
        visitRight: false,
        presence: false,
      }],
      followedBy: selectedUser,
    },
    {
      id: 2,
      urlPhoto: '',
      entreprise: 'Capgemini',
      descriptif: 'Recherche de stage',
      urlAttachement: '',
      nom: 'Martin',
      prenom: 'Julien',
      tel: '0345789012',
      portable: '0654871234',
      email: 'julien.martin@capgemini.com',
      jobTitle: 'Développeur web',
      skills: ['JavaScript', 'React', 'Node.js'],
      experiences: [
        {
          company: 'Capgemini',
          startDate: '01/06/2023',
          endDate: '01/06/2024',
          skills: 'React, Node.js',
          description: 'Développement d’applications web fullstack'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 3,
      urlPhoto: '',
      entreprise: 'Carrefour',
      descriptif: 'Fin de mission intérim',
      urlAttachement: '',
      nom: 'Petit',
      prenom: 'Camille',
      tel: '0321457890',
      portable: '0625897412',
      email: 'camille.petit@carrefour.fr',
      jobTitle: 'Hôtesse de caisse',
      skills: ['Encaissement', 'Accueil client'],
      experiences: [
        {
          company: 'Carrefour',
          startDate: '01/01/2022',
          endDate: '01/01/2024',
          skills: 'Encaissement',
          description: 'Accueil des clients et gestion de la caisse'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 4,
      urlPhoto: '',
      entreprise: 'Eiffage',
      descriptif: 'Formation en alternance terminée',
      urlAttachement: '',
      nom: 'Robert',
      prenom: 'Lucas',
      tel: '0456987412',
      portable: '0689457123',
      email: 'lucas.robert@eiffage.com',
      jobTitle: 'Ouvrier polyvalent',
      skills: ['Maçonnerie', 'Lecture de plans'],
      experiences: [
        {
          company: 'Eiffage',
          startDate: '01/09/2020',
          endDate: '01/09/2023',
          skills: 'Maçonnerie',
          description: 'Travail sur chantiers de gros œuvre'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 5,
      urlPhoto: '',
      entreprise: 'Hôpital Saint-Louis',
      descriptif: 'Fin de remplacement',
      urlAttachement: '',
      nom: 'Moreau',
      prenom: 'Chloé',
      tel: '0178459632',
      portable: '0678412365',
      email: 'chloe.moreau@chu-paris.fr',
      jobTitle: 'Infirmière',
      skills: ['Soins infirmiers', 'Urgences'],
      experiences: [
        {
          company: 'Hôpital Saint-Louis',
          startDate: '01/01/2020',
          endDate: '01/01/2024',
          skills: 'Soins infirmiers',
          description: 'Soins en service d’urgences'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 6,
      urlPhoto: '',
      entreprise: 'Sopra Steria',
      descriptif: 'Fin de mission freelance',
      urlAttachement: '',
      nom: 'Garcia',
      prenom: 'Thomas',
      tel: '0154879658',
      portable: '0654874123',
      email: 'thomas.garcia@soprasteria.com',
      jobTitle: 'Consultant IT',
      skills: ['Cyber sécurité', 'DevOps'],
      experiences: [
        {
          company: 'Sopra Steria',
          startDate: '01/04/2022',
          endDate: '01/04/2024',
          skills: 'Cyber sécurité',
          description: 'Mise en place de systèmes sécurisés'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 7,
      urlPhoto: '',
      entreprise: 'Éducation Nationale',
      descriptif: 'Fin de contrat vacataire',
      urlAttachement: '',
      nom: 'Bernard',
      prenom: 'Élodie',
      tel: '0198541236',
      portable: '0665478214',
      email: 'elodie.bernard@ac-paris.fr',
      jobTitle: 'Professeure des écoles',
      skills: ['Pédagogie', 'Gestion de classe'],
      experiences: [
        {
          company: 'Éducation Nationale',
          startDate: '01/09/2021',
          endDate: '01/09/2023',
          skills: 'Pédagogie',
          description: 'Enseignement en école primaire'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 8,
      urlPhoto: '',
      entreprise: 'SNCF',
      descriptif: 'Fin de période d’essai',
      urlAttachement: '',
      nom: 'Lemoine',
      prenom: 'Antoine',
      tel: '0136987456',
      portable: '0647891235',
      email: 'antoine.lemoine@sncf.fr',
      jobTitle: 'Conducteur de train',
      skills: ['Sécurité ferroviaire', 'Conduite'],
      experiences: [
        {
          company: 'SNCF',
          startDate: '01/06/2021',
          endDate: '01/06/2024',
          skills: 'Conduite de train',
          description: 'Conduite de trains régionaux et intercités'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 9,
      urlPhoto: '',
      entreprise: 'Clinique Sainte-Marie',
      descriptif: 'Fin de contrat CDD',
      urlAttachement: '',
      nom: 'Faure',
      prenom: 'Claire',
      tel: '0187456325',
      portable: '0678542136',
      email: 'claire.faure@clinique.fr',
      jobTitle: 'Aide-soignante',
      skills: ['Hygiène', 'Soins quotidiens'],
      experiences: [
        {
          company: 'Clinique Sainte-Marie',
          startDate: '01/02/2021',
          endDate: '01/02/2024',
          skills: 'Soins quotidiens',
          description: 'Assistance aux patients et soins de base'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 10,
      urlPhoto: '',
      entreprise: 'Colas',
      descriptif: 'Fin d’apprentissage',
      urlAttachement: '',
      nom: 'Andre',
      prenom: 'Matthieu',
      tel: '0145987632',
      portable: '0625478963',
      email: 'matthieu.andre@colas.fr',
      jobTitle: 'Chef de chantier',
      skills: ['Coordination', 'Topographie'],
      experiences: [
        {
          company: 'Colas',
          startDate: '01/09/2020',
          endDate: '01/09/2023',
          skills: 'Gestion de chantier',
          description: 'Chef d’équipe sur chantiers routiers'
        }
      ], followedBy: selectedUser,
    }, {
      id: 11,
      urlPhoto: '',
      entreprise: 'EDF',
      descriptif: 'Mobilité interne refusée',
      urlAttachement: '',
      nom: 'Roux',
      prenom: 'Nicolas',
      tel: '0178459632',
      portable: '0678412569',
      email: 'nicolas.roux@edf.fr',
      jobTitle: 'Technicien de maintenance',
      skills: ['Électricité', 'Maintenance industrielle'],
      experiences: [
        {
          company: 'EDF',
          startDate: '01/01/2018',
          endDate: '01/01/2024',
          skills: 'Électricité industrielle',
          description: 'Maintenance de centrales électriques'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 12,
      urlPhoto: '',
      entreprise: 'Veolia',
      descriptif: 'Fin de projet environnemental',
      urlAttachement: '',
      nom: 'Leroy',
      prenom: 'Isabelle',
      tel: '0154759652',
      portable: '0614578236',
      email: 'isabelle.leroy@veolia.com',
      jobTitle: 'Chargée de mission environnement',
      skills: ['Analyse environnementale', 'Reporting'],
      experiences: [
        {
          company: 'Veolia',
          startDate: '01/03/2019',
          endDate: '01/03/2024',
          skills: 'Analyse environnementale',
          description: 'Suivi des indicateurs d’impact écologique'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 13,
      urlPhoto: '',
      entreprise: 'La Poste',
      descriptif: 'Fin de contrat CDD',
      urlAttachement: '',
      nom: 'Marchand',
      prenom: 'Olivier',
      tel: '0136895471',
      portable: '0689524712',
      email: 'olivier.marchand@laposte.fr',
      jobTitle: 'Facteur',
      skills: ['Distribution courrier', 'Relation client'],
      experiences: [
        {
          company: 'La Poste',
          startDate: '01/04/2021',
          endDate: '01/04/2024',
          skills: 'Distribution courrier',
          description: 'Tournée en zone périurbaine'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 14,
      urlPhoto: '',
      entreprise: 'Orange',
      descriptif: 'Reconversion en cours',
      urlAttachement: '',
      nom: 'Collet',
      prenom: 'Julie',
      tel: '0198741256',
      portable: '0654871215',
      email: 'julie.collet@orange.com',
      jobTitle: 'Conseillère client',
      skills: ['Service client', 'Vente'],
      experiences: [
        {
          company: 'Orange',
          startDate: '01/02/2019',
          endDate: '01/02/2024',
          skills: 'Vente & service client',
          description: 'Conseils et ventes en boutique Orange'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 15,
      urlPhoto: '',
      entreprise: 'Dassault Aviation',
      descriptif: 'Fin de projet',
      urlAttachement: '',
      nom: 'Benoit',
      prenom: 'François',
      tel: '0178459637',
      portable: '0665472136',
      email: 'francois.benoit@dassault.fr',
      jobTitle: 'Ingénieur aéronautique',
      skills: ['Conception mécanique', 'Logiciels CAO'],
      experiences: [
        {
          company: 'Dassault Aviation',
          startDate: '01/05/2018',
          endDate: '01/05/2024',
          skills: 'Conception CAO',
          description: 'Modélisation et tests sur Falcon 8X'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 16,
      urlPhoto: '',
      entreprise: 'Auchan',
      descriptif: 'Fin de contrat étudiant',
      urlAttachement: '',
      nom: 'Meunier',
      prenom: 'Laura',
      tel: '0154879632',
      portable: '0612548796',
      email: 'laura.meunier@auchan.fr',
      jobTitle: 'Caissière',
      skills: ['Encaissement', 'Gestion client'],
      experiences: [
        {
          company: 'Auchan',
          startDate: '01/07/2022',
          endDate: '01/07/2024',
          skills: 'Encaissement',
          description: 'Accueil client et gestion de caisse'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 17,
      urlPhoto: '',
      entreprise: 'Decathlon',
      descriptif: 'Fin de mission saisonnière',
      urlAttachement: '',
      nom: 'Henry',
      prenom: 'David',
      tel: '0145789652',
      portable: '0698451233',
      email: 'david.henry@decathlon.com',
      jobTitle: 'Vendeur sport',
      skills: ['Relation client', 'Connaissance produits'],
      experiences: [
        {
          company: 'Decathlon',
          startDate: '01/11/2023',
          endDate: '01/04/2024',
          skills: 'Vente et conseil',
          description: 'Vente équipements de sport et conseils clients'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 18,
      urlPhoto: '',
      entreprise: 'Air France',
      descriptif: 'Fin de stage long',
      urlAttachement: '',
      nom: 'Barbier',
      prenom: 'Emma',
      tel: '0178945632',
      portable: '0678451223',
      email: 'emma.barbier@airfrance.com',
      jobTitle: 'Assistante RH',
      skills: ['Recrutement', 'Gestion administrative'],
      experiences: [
        {
          company: 'Air France',
          startDate: '01/02/2023',
          endDate: '01/02/2024',
          skills: 'Administration RH',
          description: 'Participation aux entretiens et suivi RH'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 19,
      urlPhoto: '',
      entreprise: 'ENGIE',
      descriptif: 'Fin d’alternance',
      urlAttachement: '',
      nom: 'Chevalier',
      prenom: 'Maxime',
      tel: '0187456987',
      portable: '0665478954',
      email: 'maxime.chevalier@engie.com',
      jobTitle: 'Technicien énergie',
      skills: ['Gestion énergétique', 'Installation HVAC'],
      experiences: [
        {
          company: 'ENGIE',
          startDate: '01/09/2021',
          endDate: '01/09/2023',
          skills: 'Gestion thermique',
          description: 'Maintenance équipements thermiques'
        }
      ], followedBy: selectedUser,
    }, {
      id: 20,
      urlPhoto: '',
      entreprise: 'RATP',
      descriptif: 'Fin de période d’intégration',
      urlAttachement: '',
      nom: 'Renard',
      prenom: 'Lucie',
      tel: '0163254789',
      portable: '0678541235',
      email: 'lucie.renard@ratp.fr',
      jobTitle: 'Contrôleuse de titres',
      skills: ['Relation publique', 'Contrôle'],
      experiences: [
        {
          company: 'RATP',
          startDate: '01/06/2023',
          endDate: '01/06/2024',
          skills: 'Contrôle transport',
          description: 'Contrôle des titres sur le réseau francilien'
        }
      ], followedBy: selectedUser,
    }, {
      id: 21,
      urlPhoto: '',
      entreprise: 'AXA',
      descriptif: 'Rupture conventionnelle',
      urlAttachement: '',
      nom: 'Lemoine',
      prenom: 'Claire',
      tel: '0178425632',
      portable: '0689541236',
      email: 'claire.lemoine@axa.fr',
      jobTitle: 'Conseillère assurance',
      skills: ['Vente assurance', 'Conseil client'],
      experiences: [
        {
          company: 'AXA',
          startDate: '01/09/2016',
          endDate: '01/09/2023',
          skills: 'Assurance',
          description: 'Vente de produits d’assurance aux particuliers'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 22,
      urlPhoto: '',
      entreprise: 'Renault',
      descriptif: 'Licenciement économique',
      urlAttachement: '',
      nom: 'Fontaine',
      prenom: 'Pascal',
      tel: '0147852369',
      portable: '0678459632',
      email: 'pascal.fontaine@renault.com',
      jobTitle: 'Ouvrier de production',
      skills: ['Assemblage', 'Contrôle qualité'],
      experiences: [
        {
          company: 'Renault',
          startDate: '01/03/2015',
          endDate: '01/03/2024',
          skills: 'Production automobile',
          description: 'Assemblage pièces moteur'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 23,
      urlPhoto: '',
      entreprise: 'SNCF',
      descriptif: 'Départ volontaire',
      urlAttachement: '',
      nom: 'Noël',
      prenom: 'Sandrine',
      tel: '0154789654',
      portable: '0678451235',
      email: 'sandrine.noel@sncf.fr',
      jobTitle: 'Chef de bord',
      skills: ['Gestion voyageurs', 'Sécurité'],
      experiences: [
        {
          company: 'SNCF',
          startDate: '01/01/2012',
          endDate: '01/12/2023',
          skills: 'Service voyageur',
          description: 'Accueil passagers et sécurité à bord'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 24,
      urlPhoto: '',
      entreprise: 'Suez',
      descriptif: 'Fin de contrat mission eau',
      urlAttachement: '',
      nom: 'Blanc',
      prenom: 'Jérôme',
      tel: '0178456321',
      portable: '0654879632',
      email: 'jerome.blanc@suez.com',
      jobTitle: 'Technicien assainissement',
      skills: ['Réseaux eau', 'Maintenance'],
      experiences: [
        {
          company: 'Suez',
          startDate: '01/05/2020',
          endDate: '01/05/2024',
          skills: 'Gestion réseaux',
          description: 'Entretien du réseau d’eaux usées'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 25,
      urlPhoto: '',
      entreprise: 'ENEDIS',
      descriptif: 'Changement de région',
      urlAttachement: '',
      nom: 'Perrot',
      prenom: 'Marine',
      tel: '0154876598',
      portable: '0689541237',
      email: 'marine.perrot@enedis.fr',
      jobTitle: 'Chargée d’intervention',
      skills: ['Électricité', 'Sécurité'],
      experiences: [
        {
          company: 'ENEDIS',
          startDate: '01/10/2017',
          endDate: '01/10/2023',
          skills: 'Interventions terrain',
          description: 'Maintenance et dépannage réseau'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 26,
      urlPhoto: '',
      entreprise: 'Carrefour',
      descriptif: 'Fin de CDD long',
      urlAttachement: '',
      nom: 'Garcia',
      prenom: 'Luc',
      tel: '0147852369',
      portable: '0678451263',
      email: 'luc.garcia@carrefour.fr',
      jobTitle: 'Employé polyvalent',
      skills: ['Mise en rayon', 'Relation client'],
      experiences: [
        {
          company: 'Carrefour',
          startDate: '01/02/2021',
          endDate: '01/02/2024',
          skills: 'Polyvalence grande distribution',
          description: 'Rayonnage et caisse'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 27,
      urlPhoto: '',
      entreprise: 'Nestlé',
      descriptif: 'Repositionnement professionnel',
      urlAttachement: '',
      nom: 'Petit',
      prenom: 'Alice',
      tel: '0165478932',
      portable: '0612548796',
      email: 'alice.petit@nestle.com',
      jobTitle: 'Responsable qualité',
      skills: ['Qualité agroalimentaire', 'Audits'],
      experiences: [
        {
          company: 'Nestlé',
          startDate: '01/01/2016',
          endDate: '01/01/2024',
          skills: 'Contrôle qualité',
          description: 'Suivi qualité sur chaîne de production'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 28,
      urlPhoto: '',
      entreprise: 'Capgemini',
      descriptif: 'Fin de prestation client',
      urlAttachement: '',
      nom: 'Richard',
      prenom: 'Théo',
      tel: '0178459621',
      portable: '0687459632',
      email: 'theo.richard@capgemini.com',
      jobTitle: 'Développeur fullstack',
      skills: ['JavaScript', 'Node.js', 'React'],
      experiences: [
        {
          company: 'Capgemini',
          startDate: '01/06/2021',
          endDate: '01/06/2024',
          skills: 'Développement web',
          description: 'Création d’applications internes pour le client Orange'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 29,
      urlPhoto: '',
      entreprise: 'LVMH',
      descriptif: 'Fin de période d’essai',
      urlAttachement: '',
      nom: 'Dumas',
      prenom: 'Camille',
      tel: '0165478936',
      portable: '0678451232',
      email: 'camille.dumas@lvmh.fr',
      jobTitle: 'Assistant marketing',
      skills: ['Marketing produit', 'Étude de marché'],
      experiences: [
        {
          company: 'LVMH',
          startDate: '01/03/2023',
          endDate: '01/06/2024',
          skills: 'Marketing opérationnel',
          description: 'Support campagnes publicitaires'
        }
      ], followedBy: selectedUser,
    },
    {
      id: 30,
      urlPhoto: '',
      entreprise: 'Ubisoft',
      descriptif: 'Fin de production jeu vidéo',
      urlAttachement: '',
      nom: 'Faure',
      prenom: 'Julien',
      tel: '0147852639',
      portable: '0678452632',
      email: 'julien.faure@ubisoft.com',
      jobTitle: 'Game designer',
      skills: ['Level design', 'Scripting'],
      experiences: [
        {
          company: 'Ubisoft',
          startDate: '01/08/2020',
          endDate: '01/08/2024',
          skills: 'Game design',
          description: 'Création des niveaux pour jeu mobile'
        }
      ]
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
        famillySituation: jobseeker.famillySituation,
        childrenInformations: jobseeker.childrenInformations,
        gradesLevel: jobseeker.gradesLevel,
        lastGrade: jobseeker.lastGrade,
        statut: jobseeker.statut,
        latitude: jobseeker.latitude,
        longitude: jobseeker.longitude,
        dernierRdv: jobseeker.dernierRdv,
        prochainRdv: jobseeker.prochainRdv,
        licenceTypes: jobseeker.licenceTypes,
        transportMeans: jobseeker.transportMeans,
        skills: jobseeker.skills,
        languages: jobseeker.languages,
        descriptif: jobseeker.descriptif
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

    /*Test actions - historique*/
    this.jobseekerId = 101;
    this.loadJobseekerDetails(this.jobseekerId);
    this.loadMeetingsForTable(this.jobseekerId);

    this.setReadonly(this.isReadOnly);

  }

  onPhotoChange(event: any) {
    console.log(event)
  }

  changePhoto() {
    console.log()
  }

  onFileUpload(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(`Fichier reçu (${type}):`, file);
    }
  }

  sendMail(): void {
    const email = this.form.get('email')?.value;
    if (email) {
      const subject = encodeURIComponent(this.mailSettings.subject);
      const body = encodeURIComponent(this.mailSettings.body);
      const signature = encodeURIComponent(this.mailSettings.signature);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}&signature=${signature}`;
    }
  }
  setReadonly(isReadonly: boolean): void {
    this.isReadOnly = isReadonly;

    if (this.isReadOnly) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  collapseAll() {//editMode OK
    this.isCvHidden = true;
    this.isCollapsedSC = true;
    this.isCollapsedIP = true;
    this.isCollapsedIPR = true;
    this.isCollapsedIC = true;
    this.isCollapsedLOC = true;
    this.isCollapsedMAP = true;
    this.isCollapsedDEM = true;
    this.isInterviewMode = true;
  }

  expandAll() { //consultMode OK
    this.isCvHidden = false;
    this.isCollapsedSC = true;
    this.isCollapsedIP = true;
    this.isCollapsedIPR = true;
    this.isCollapsedIC = true;
    this.isCollapsedLOC = true;
    this.isCollapsedMAP = true;
    this.isCollapsedDEM = true;
    this.isInterviewMode = true;
  }

  onToggleMode(event: any) {
    if (event.checked) {
      this.collapseAll();//editMode OK
      this.setReadonly(false);
      //this.isReadOnly = false;
    } else {
      this.expandAll();//consultMode OK
      this.setReadonly(true);
      //  this.isReadOnly = true;
    }
  }

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  showSuccess(message: string) {
    this._snackBar.open(`✔️ ${message}`, 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showError(message: string) {
    this._snackBar.open(`❌ ${message}`, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  addExperience() {
    // expArray.push(this.createExperienceGroup(exp));
    console.log()
  }

  removeExperience(i: any) {
    console.log()
  }
  addChild() {
    const childrenArray = this.form.get('childrenInformations') as FormArray;

    // Vérifie si le dernier enfant est vide
    const lastChild = childrenArray.at(childrenArray.length - 1);
    if (lastChild && lastChild.invalid) {
      // Optionnel : tu peux marquer tous les champs comme "touchés" pour afficher les erreurs
      lastChild.markAllAsTouched();
      return;
    }

    childrenArray.push(this.createChildForm());
    console.log();
  }

  removeChild(i: any) {
    console.log()
  }

  onNewMeeting() {
    // Navigue vers '/meeting' et ajoute le jobseekerId comme paramètre de requête
    this.router.navigate(['meeting'], { queryParams: { jobseekerId: this.jobseekerId } });
    console.log('Tentative de navigation vers page de création de RDV pour jobseeker:', this.jobseekerId);
  }

  editMeeting(meetingId: number) {
    // 1. Récupérer les détails du rendez-vous à éditer
    this.meetingsService.getMeetingById(meetingId).subscribe(
      (meeting: Meeting) => {
        // 2. Ouvrir la modale avec les données du rendez-vous
        const dialogRef = this.dialog.open(MeetingsDialogComponent, {
          width: '1200px',
          height: '800px',
          data: {
            meeting: meeting,
            jobseekerId: this.jobseekerId
          }
        });

        // 3. Recharger la liste des rendez-vous après la fermeture de la modale
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // Recharger les rendez-vous dans le tableau JobseekerEditComponent
            // (tu auras probablement une méthode loadMeetingsForJobseeker() ici)
            console.log('Meeting updated, reloading data in JobseekerEditComponent');
            // Exemple: this.loadMeetingsForJobseeker(this.jobseekerId);
          }
        });
      },
      error => {
        console.error('Erreur lors de la récupération du rendez-vous pour édition :', error);
        // Gérer l'erreur, par ex. afficher un message à l'utilisateur
      }
    );
  }

  loadJobseekerDetails(id: number): void {
    // Pour les tests, tu peux aussi mocker jobseekerService.getJobseekerById()
    // Ou définir jobseekerDetails directement pour éviter une autre dépendance
    this.jobseekerDetails = {
      id: id,
      urlPhoto: '',
      nom: 'Demandeur',
      prenom: 'Test',
      email: 'test@example.com',
      tel: '0123456789',
      experiences: [],
      entreprise: '',
      descriptif: '',
      urlAttachement: '',
    };
    console.log('Détails du demandeur d\'emploi factices chargés:', this.jobseekerDetails);
  }

  loadMeetingsForTable(jobseekerId: number): void {
    this.meetingsService.getMeetingsByJobseekerId(jobseekerId).subscribe(
      (meetings: Meeting[]) => {
        // Met à jour la source de données du tableau avec les meetings factices
        this.actions.data = meetings;
        console.log('Données du tableau des meetings chargées (factices):', meetings);
      },
      error => {
        console.error('Erreur lors du chargement des meetings pour le tableau :', error);
        // Gérer l'erreur si le service factice ne retourne rien ou simule une erreur
      }
    );
  }


  onSave() {
    console.log();
    this.showSuccess('Formulaire sauvegardé avec succès !');
    //TODO : SAUVEGARDE DU FORMULAIRE
  }

  onCancel() {
    this.router.navigate(['jobseeker']);
  }

  updateTotalEnfants() {
    const total = (this.nbEnfantsFoyer || 0) + (this.nbEnfantsSupp || 0);
    if (this.totalEnfants !== total) {
      this.totalEnfants = total;

      // Met à jour le tableau
      this.childrenData = Array.from({ length: total }, (_, i) => ({
        nom: '',
        prenom: '',
        gardeAlternee: false,
        droitVisite: false,
        absentFoyer: false
      }));
    }
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

  toggleCv() {
    this.isCvHidden = !this.isCvHidden;
  }

}
