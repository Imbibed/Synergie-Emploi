import { Component, OnInit , ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-partner-edit',
  standalone: true,
  imports: [
    CommonModule,
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
  ],
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent implements OnInit {
  form!: FormGroup;
  partnerId!: string;
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

    constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router : Router,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      urlPhoto:[''],
      entreprise:[''],
      descriptif: [''],
      urlAttachement: [''],
      nom: [''],
      prenom: [''],
      tel: [''],
      portable :[''],
      adresse: [''],
      ville :[''],
      zipCode:[''],
      email: [''],
      longitude: [''],
      latitude: [''],
      dernierRdv: [null],
      prochainRdv: [null],
      statut: [''],
    });
  }

  toggle(section: string): void {
    (this as any)[section] = ! (this as any)[section];
    this.cd.detectChanges(); 
  }
   
    ngOnInit(): void {
        this.partnerId = this.route.snapshot.paramMap.get('id')!;

        console.log('ID reçu dans l’URL :', this.partnerId);
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
      }


        onPhotoChange(event:any){
            console.log(event)
        }
    //TODO : Voir pk doublon ?
        changePhoto()
        {
          console.log()
        }

        onFileUpload(event:any,fileType:string){
          //Gerer l'upload de fichier
          console.log(event, fileType)
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
        onCancel(){
          this.router.navigate(['partner']);
        }

        onExport(){
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
        { date: new Date(), type: 'Entretien téléphonique', note: 'Interessé' },
        { date: new Date(), type: 'Présentation', note: 'Envoyé à XYZ' },
      ]); 
      displayedColumnsActions: string[] = ['date', 'type', 'note'];
    

      linkToJobseeker = new MatTableDataSource([
        { date: new Date(), type: 'Michel Dupont', note: 'Période d\'essai inachevée' },
        { date: new Date(), type: 'Gwendoline Henri',note: 'CDD 3 ans' },
      ]); 
      displayedColumnsLink: string[] = ['date', 'type', 'note'];
}


  

