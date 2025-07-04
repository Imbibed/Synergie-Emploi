import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';


@Component({
  selector: 'app-add-partner',
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
    MatSelectModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {
  form!: FormGroup;
  partnerId!: string;
  map!: L.Map;
  marker?: L.Marker;
  latitude: number = 49.450001;  // Canteleu
  longitude: number = 1.03333;

ngOnInit(): void {
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router : Router,
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

    onPhotoChange(event:any){
        console.log(event)
    }

    changePhoto()
    {
      console.log()
    }

    onFileUpload(event:any,fileType:string){
      console.log(event, fileType)
    }
    newRDV(row: any) {
       this.router.navigate(['partnerRdv', row.id]);
    }
    onSave() {
      console.log()
    // Traitement de sauvegarde ici
    //this.snackBar.open('Modifications enregistrées', 'Fermer', { duration: 3000 });
    }
    onCancel(){
      this.router.navigate(['partner']);
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

  displayedColumns: string[] = ['date', 'type', 'note'];

}
