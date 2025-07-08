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

interface Matches {
  nom: string;
  prenom: string;
  contrat: string;
  startDate: string;
  endDate: string;
  description: string;
};


@Component({
  selector: 'app-edit-company',
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
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.scss'
})
export class EditCompanyComponent implements OnInit {
  form!: FormGroup;
  companyId!: string;
  isInterviewMode = false;
  isReadOnly = true;
  isMatchesLog = false;
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
      nom: [''],
      prenom: [''],
      tel: [''],
      portable: [''],
      adresse: [''],
      ville: [''],
      zipCode: [''],
      email: [''],
      longitude: [''],
      latitude: [''],
      dernierRdv: [null],
      prochainRdv: [null],
      statut: [''],
    });
  }

  dataSource = new MatTableDataSource<any>([]); // ton tableau source ici
  selection = new Set<any>(); // ou MatSelectionModel si tu veux plus avancé

  ngOnInit(): void {
    this.setReadonly(this.isReadOnly);
    this.companyId = this.route.snapshot.paramMap.get('id')!;

    console.log('ID reçu dans l’URL :', this.companyId);
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
      descriptif: 'Recherche de stagiaire', urlAttachement: '',
      nom: 'Thierry', prenom: 'Marcel', tel: '0145789654', adresse: '78 Rue du lapin', zipCode: '7620', ville: 'Le Havre',
      portable: '0678945123',
      email: 'marcel.thierry@bouygues.fr',
      activity: 'BTP'
    }];

    const company = this.dataSource.data.find(item => item.id === Number(this.companyId));
    if (company) {
      this.form.patchValue({
        entreprise: company.entreprise,
        nom: company.nom,
        prenom: company.prenom,
        tel: company.tel,
        portable: company.portable,
        email: company.email,
        adresse: company.adresse,
        ville: company.ville,
        zipCode: company.zipCode,
        statut: company.statut,
        commentaires: company.commentaires,
        latitude: company.latitude,
        longitude: company.longitude,
        dernierRdv: company.dernierRdv,
        prochainRdv: company.prochainRdv,
        descriptif: company.descriptif
      });
    }
    // Gestion spéciale pour le FormArray `experiences`
    const expArray = this.form.get('Partenariat') as FormArray;

    if (Array.isArray(company.experiences)) {
      company.experiences.forEach((exp: Matches) => {
        expArray.push(this.fb.group({
          nom: [exp.nom],
          prenom: [exp.nom],
          contrat: [exp.nom],
          startDate: [exp.startDate],
          endDate: [exp.endDate],
          description: [exp.description],
        }));
      });
    }
  }
   onPhotoChange(event: any) {
      console.log(event)
    }
  
    changePhoto() {
      console.log()
    }
  
    onFileUpload(event: any, fileType: string) {
      //Gerer l'upload de fichier
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
      this.isInterviewMode = true;
  
    }
  
    expandAll() { //consultMode OK
  
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
  
    addMatches() {
      // expArray.push(this.createExperienceGroup(exp));
      console.log()
    }
    removeMatches(i: any) {
      console.log()
    }
  
  
    onNewRdv() {
      console.log()
      //this.router.navigate(['companyRdv',this.companyId]);
      //TODO : CREER La page de gestion ndes rendez vous
    }
    onSave() {
      console.log();
      this.showSuccess('Formulaire sauvegardé avec succès !');
      //TODO : SAUVEGARDE DU FORMULAIRE
    }
  
    onCancel() {
      this.router.navigate(['company']);
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
  
  
    linkToCompany = new MatTableDataSource([
      { date: new Date(), type: 'Michel Dupont', note: 'Période d\'essai inachevée', status:'Fin'},
      { date: new Date(), type: 'Gwendoline Henri', note: 'CDD 3 ans', status:'Fin' },
      { date: new Date('2025-02-15'), type: 'Gwendoline Henri', note: 'CDD 3 ans',  status:'En cours'},
      { date: new Date('2023-06-10'), type: 'Réunion téléphonique', note: 'Premier échange positif',  status:'En cours' },
      { date: new Date('2023-09-01'), type: 'Jean-Marc Dupuis', note: 'CDI proposé, en attente de réponse',  status:'En attente' },
      { date: new Date('2023-12-20'), type: 'Visite entreprise', note: 'Découverte des locaux',  status:'En cours' },
      { date: new Date('2024-03-05'), type: 'Suivi RH', note: 'Entretien de mi-parcours' ,  status:'Fin'},
      { date: new Date('2024-06-15'), type: 'Clôture contrat', note: 'Contrat terminé, retour positif' ,  status:'Fin'}
    ]);
    displayedColumnsLink: string[] = ['date', 'type', 'note','status'];
  
    toggleMatchesLog() {
      this.isMatchesLog = !this.isMatchesLog;
    }
  

}
