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
import { CompanyModel, Company } from './company.model';
import { CompanyAddDialogComponent } from '././company-add-dialog/company-add-dialog.component';

@Component({
  selector: 'app-companiessnetwork',
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
  templateUrl: './companiesnetwork.component.html',
  styleUrl: './companiesnetwork.component.scss'
})
export class CompaniesnetworkComponent implements OnInit {
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

  companies = [
     { id: 1, entreprise: 'Total', nomContact: 'Ladal', prenomContact: 'Pascal', activity: 'Chimie', tel: '0123456789', adresse: 'Paris', dernierRdv: new Date('2025-05-01'), prochainRdv: new Date('2025-07-01'), status: 'actif' },
  { id: 2, entreprise: 'L’Oréal', nomContact: 'Dupont', prenomContact: 'Claire', activity: 'Cosmétique', tel: '0147852369', adresse: 'Lyon', dernierRdv: new Date('2025-04-20'), prochainRdv: new Date('2025-06-15'), status: 'inactif' },
  { id: 3, entreprise: 'Renault', nomContact: 'Martin', prenomContact: 'Julien', activity: 'Automobile', tel: '0169852374', adresse: 'Toulouse', dernierRdv: new Date('2025-03-10'), prochainRdv: new Date('2025-08-05'), status: 'actif' },
  { id: 4, entreprise: 'Airbus', nomContact: 'Bernard', prenomContact: 'Sophie', activity: 'Aéronautique', tel: '0198745632', adresse: 'Bordeaux', dernierRdv: new Date('2025-02-25'), prochainRdv: new Date('2025-07-20'), status: 'actif' },
  { id: 5, entreprise: 'Danone', nomContact: 'Petit', prenomContact: 'Antoine', activity: 'Agroalimentaire', tel: '0178529630', adresse: 'Marseille', dernierRdv: new Date('2025-01-15'), prochainRdv: new Date('2025-06-30'), status: 'inactif' },
  { id: 6, entreprise: 'Veolia', nomContact: 'Moreau', prenomContact: 'Isabelle', activity: 'Environnement', tel: '0187456321', adresse: 'Nantes', dernierRdv: new Date('2025-04-01'), prochainRdv: new Date('2025-08-10'), status: 'actif' },
  { id: 7, entreprise: 'Capgemini', nomContact: 'Laurent', prenomContact: 'David', activity: 'Informatique', tel: '0158741236', adresse: 'Paris', dernierRdv: new Date('2025-03-22'), prochainRdv: new Date('2025-07-25'), status: 'actif' },
  { id: 8, entreprise: 'BNP Paribas', nomContact: 'Michel', prenomContact: 'Emma', activity: 'Banque', tel: '0132569874', adresse: 'Lille', dernierRdv: new Date('2025-05-10'), prochainRdv: new Date('2025-09-01'), status: 'inactif' },
  { id: 9, entreprise: 'Schneider Electric', nomContact: 'Rousseau', prenomContact: 'Marc', activity: 'Énergie', tel: '0147859632', adresse: 'Strasbourg', dernierRdv: new Date('2025-02-05'), prochainRdv: new Date('2025-06-05'), status: 'actif' },
  { id: 10, entreprise: 'SNCF', nomContact: 'Fournier', prenomContact: 'Julie', activity: 'Transport', tel: '0198741256', adresse: 'Paris', dernierRdv: new Date('2025-01-20'), prochainRdv: new Date('2025-05-30'), status: 'actif' },
  ];

  newcompany: Company = new CompanyModel();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
     this.dataSource = new MatTableDataSource<Company>(this.companies as Company[]);
    
        this.dataSource.filterPredicate = (data: Company, filter: string): boolean => {
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
    this.router.navigate(['companies', row.id]);
  }

  /* GESTION DE L'AJOUT D'UN JOBSEEKER  */

  openAddDialog() {
    const dialogRef = this.dialog.open(CompanyAddDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: Company | undefined) => {
      if (result) {
        this.onAddJobcompanies(result);
      }
    });
  }

  onAddJobcompanies(newcompanies: Company): void {
    const safecompanies = {
      ...newcompanies,
      dernierRdv: newcompanies.dernierRdv ?? new Date(),
      prochainRdv:newcompanies.prochainRdv ?? new Date()
    };
    this.companies.push(safecompanies);
    this.dataSource.data = [...this.companies];
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
