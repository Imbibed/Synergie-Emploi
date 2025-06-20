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
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-jobseeker.component.html',
  styleUrls: ['./edit-jobseeker.component.scss']
})
export class JobseekerEditComponent implements OnInit {
  form!: FormGroup;
  jobseekerId!: string;
  isInterviewMode = false;
  isReadOnly = true;
  isCvHidden = false;
  isCollapsedSC = true;
  isCollapsedIP = true;
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

  //done
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

  //done
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
  filteredSkillsList = [...this.skillsList];
  skillFilter = '';

  filterSkills(): void {
    const filterValue = this.skillFilter.toLowerCase();
    this.filteredSkillsList = this.skillsList.filter(skill =>
      skill.label.toLowerCase().includes(filterValue)
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
    this.setReadonly(this.isReadOnly);
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
          description: 'Responsable du suivi de chantiers en Île-de-France'
        }
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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

  setReadonly(readonly: boolean) {
    if (readonly) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  collapseAll() {//editMode OK
    this.isCvHidden = true;
    this.isCollapsedSC = true;
    this.isCollapsedIP = true;
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
      this.isReadOnly = false;
    } else {
      this.expandAll();//consultMode OK
      this.setReadonly(true);
      this.isReadOnly = true;
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

  onNewRdv() {
    console.log()
    //this.router.navigate(['partnerRdv',this.partnerId]);
    //TODO : CREER La page de gestion ndes rendez vous
  }

  onSave() {
    console.log();
    this.showSuccess('Formulaire sauvegardé avec succès !');
    //TODO : SAUVEGARDE DU FORMULAIRE
  }

  onCancel() {
    this.router.navigate(['jobseeker']);
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
    { date: new Date(), type: 'Entretien téléphonique', note: 'Interessé' },
    { date: new Date(), type: 'Présentation', note: 'Envoyé à XYZ' },
  ]);
  displayedColumnsActions: string[] = ['date', 'type', 'note'];


  linkToJobseeker = new MatTableDataSource([
    { date: new Date(), type: 'Michel Dupont', note: 'Période d\'essai inachevée' },
    { date: new Date(), type: 'Gwendoline Henri', note: 'CDD 3 ans' },
  ]);
  displayedColumnsLink: string[] = ['date', 'type', 'note'];

  toggleCv() {
    this.isCvHidden = !this.isCvHidden;
  }

}
