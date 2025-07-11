import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
//import * as FileSaver from 'file-saver';
import { PartnerModel, Partner } from './partner.model';
import { PartnerAddDialogComponent } from '././partner-add-dialog/partner-add-dialog.component';

@Component({
  selector: 'app-partnersnetwork',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './partnersnetwork.component.html',
  styleUrl: './partnersnetwork.component.scss'
})
export class PartnersnetworkComponent implements OnInit {
  displayedColumns: string[] =
    ['entreprise', 'nomContact', 'prenomContact','activity', 'tel', 'adresse',
      'dernierRdv', 'prochainRdv', 'status', 'action-edit'
    ];
  dataSource = new MatTableDataSource<any>([]);
  selection = new Set<any>();

  //Filtres avancés
  filterStatus: string | null = null;
  filterActivity: string | null = null;

    allColumns = [
    { key: 'entreprise', label: 'Entreprise' },
    { key: 'nomContact', label: 'Nom' },
    { key: 'prenomContact', label: 'Prénom' },
    { key: 'tel', label: 'téléphone' },
    { key: 'activity', label: 'Secteur d\'activité' },
    { key: 'adresse', label: 'Adresse' },
    { key: 'dernierRdv', label: 'Date dernier RDV' },
    { key: 'prochainRdv', label: 'Date du prochain rendez-vous' },
    { key: 'status', label: 'Statut' },
    { key: 'action-edit', label: 'Actions' },
  ];

  sectors: string[] = []; // à remplir avec tes secteurs existants
  statuses = [
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'pending', label: 'En attente' },
    // adapte selon ton model
  ]

  statusOptions = [
    { value: 1, icon: 'error', label: 'Sans Emploi', class: 'icon-error' },
    { value: 2, icon: 'check_circle', label: 'Sous contrat', class: 'icon-success' },
    { value: 3, icon: 'hourglass_empty', label: 'Nouveau', class: 'icon-pending' },
    { value: 0, icon: 'help_outline', label: 'Inconnu', class: 'icon-default' }
  ];

  partners = [
    { id: 11, entreprise: 'Air France', nomContact: 'Girard', prenomContact: 'Lucie', activity: 'Transport aérien', tel: '0156784321', adresse: 'Paris', dernierRdv: new Date('2025-03-15'), prochainRdv: new Date('2025-07-15'), status: 'actif' },
  { id: 12, entreprise: 'Michelin', nomContact: 'Blanc', prenomContact: 'Paul', activity: 'Pneumatiques', tel: '0167894325', adresse: 'Clermont-Ferrand', dernierRdv: new Date('2025-04-18'), prochainRdv: new Date('2025-08-20'), status: 'inactif' },
  { id: 13, entreprise: 'Vinci', nomContact: 'Morel', prenomContact: 'Claire', activity: 'Construction', tel: '0145896321', adresse: 'Lyon', dernierRdv: new Date('2025-02-28'), prochainRdv: new Date('2025-06-30'), status: 'actif' },
  { id: 14, entreprise: 'EDF', nomContact: 'Dubois', prenomContact: 'Marc', activity: 'Énergie', tel: '0178564329', adresse: 'Paris', dernierRdv: new Date('2025-05-05'), prochainRdv: new Date('2025-09-10'), status: 'actif' },
  { id: 15, entreprise: 'Orange', nomContact: 'Lemoine', prenomContact: 'Sophie', activity: 'Télécommunications', tel: '0132567894', adresse: 'Nantes', dernierRdv: new Date('2025-03-12'), prochainRdv: new Date('2025-07-22'), status: 'inactif' },
  { id: 16, entreprise: 'Saint-Gobain', nomContact: 'Faure', prenomContact: 'Antoine', activity: 'Matériaux', tel: '0189745632', adresse: 'Rouen', dernierRdv: new Date('2025-04-22'), prochainRdv: new Date('2025-08-15'), status: 'actif' },
  { id: 17, entreprise: 'Dassault', nomContact: 'Mercier', prenomContact: 'Isabelle', activity: 'Aéronautique', tel: '0198745632', adresse: 'Bordeaux', dernierRdv: new Date('2025-02-10'), prochainRdv: new Date('2025-06-25'), status: 'actif' },
  { id: 18, entreprise: 'CNP Assurances', nomContact: 'Perrin', prenomContact: 'David', activity: 'Assurances', tel: '0154879632', adresse: 'Paris', dernierRdv: new Date('2025-01-30'), prochainRdv: new Date('2025-05-15'), status: 'inactif' },
  { id: 19, entreprise: 'Bouygues', nomContact: 'Renaud', prenomContact: 'Emma', activity: 'Construction', tel: '0147856329', adresse: 'Lille', dernierRdv: new Date('2025-03-05'), prochainRdv: new Date('2025-07-01'), status: 'actif' },
  { id: 20, entreprise: 'Alstom', nomContact: 'Colin', prenomContact: 'Julien', activity: 'Transport ferroviaire', tel: '0169857412', adresse: 'Strasbourg', dernierRdv: new Date('2025-02-18'), prochainRdv: new Date('2025-06-20'), status: 'actif' },

  ];

  newPartner: Partner = new PartnerModel();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
     this.dataSource = new MatTableDataSource<Partner>(this.partners as Partner[]);
    
        this.dataSource.filterPredicate = (data: Partner, filter: string): boolean => {
          const search = JSON.parse(filter);
    
          const matchesText =
            data.nomContact.toLowerCase().includes(search.text) ||
            data.prenomContact.toLowerCase().includes(search.text) ||
            (!!data.activity && data.activity.toLowerCase().includes(search.text));    

          const matchesActivity = search.activity ? data.activity === search.activity : true;
          const matchesStatus = search.status !== null && search.status !== undefined ? data.status === search.status : true;
    
          return Boolean(matchesText && matchesActivity && matchesStatus);
        };
    

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event?: Event) {
    const searchText = event ? (event.target as HTMLInputElement).value.trim().toLowerCase() : '';

    const filterObj = {
      text: searchText,
      activity: this.filterActivity || null,
      status: this.filterStatus !== undefined ? this.filterStatus : null,
    };

    this.dataSource.filter = JSON.stringify(filterObj);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exporterVersExcel(): void {
    const dataToExport = this.dataSource.filteredData.map(row => {
      const exportRow: any = {};

      this.displayedColumns.forEach(col => {
        if (col === 'status') {
          const statusInfo = this.getStatusDisplay(row.status);
          exportRow[col] = statusInfo?.label || '';
        } else if (col === 'dernierRdv') {
          exportRow[col] = row.dernierRdv ? new Date(row.dernierRdv).toLocaleDateString() : '';
        } else {
          exportRow[col] = (row as any)[col];
        }
      });

      return exportRow;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = { Sheets: { Feuille1: worksheet }, SheetNames: ['Feuille1'] };
    XLSX.writeFile(workbook, 'liste-partenaire.xlsx');
  }

  toggleSelection(row: any) {
    if (this.selection.has(row)) {
      this.selection.delete(row);
    } else {
      this.selection.add(row);
    }
  }

  toggleColumn(column: string, checked: boolean) {
    if (checked) {
      if (!this.displayedColumns.includes(column)) {
        this.displayedColumns.push(column);
      }
    } else {
      this.displayedColumns = this.displayedColumns.filter(col => col !== column);
    }
    // Optionnel : forcer un trigger Angular Material Table
    this.displayedColumns = [...this.displayedColumns];
  }

  openEdit(row: any) {
    this.router.navigate(['partner', row.id]);
  }

  /* GESTION DE L'AJOUT D'UN JOBSEEKER  */

  openAddDialog() {
    const dialogRef = this.dialog.open(PartnerAddDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: Partner | undefined) => {
      if (result) {
        this.onAddJobPartner(result);
      }
    });
  }

  onAddJobPartner(newPartner: Partner): void {
    const safePartner = {
      ...newPartner,
      dernierRdv: newPartner.dernierRdv ?? new Date(),
      prochainRdv:newPartner.prochainRdv ?? new Date()
    };
    this.partners.push(safePartner);
    this.dataSource.data = [...this.partners];
  }

  deleteRow(row: any) {
    console.log('Suppression de :', row);

  }

  //Gestion des badge de statut
  getStatusIconName(status: number): string {
    switch (status) {
      case 1:
        return 'error'; // ou 'report_problem'
      case 2:
        return 'check_circle';
      case 3:
        return 'hourglass_empty';
      default:
        return 'help_outline';
    }
  }

  getStatusIconClass(status: number): string {
    return {
      1: 'icon-warning',
      2: 'icon-success',
      3: 'icon-neutral'
    }[status] || 'icon-default';
  }

  getStatusDisplay(status: number): { icon: string; label: string; class?: string } {
    switch (status) {
      case 1:
        return { icon: 'error', label: 'Sans retour', class: 'icon-error' };
      case 2:
        return { icon: 'check_circle', label: 'Actif', class: 'icon-success' };
      case 3:
        return { icon: 'hourglass_empty', label: 'Nouveau', class: 'icon-pending' };
      default:
        return { icon: 'help_outline', label: 'Inconnu', class: 'icon-default' };
    }
  }

}
