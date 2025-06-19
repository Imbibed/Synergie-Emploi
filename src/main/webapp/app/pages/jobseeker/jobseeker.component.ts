import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {Router, RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
//import * as FileSaver from 'file-saver';
import {JobSeeker} from './jobseeker.model';
import {JobseekerService} from "../../services/jobseeker.service";
import { JobSeekerModel, JobSeeker } from './jobseeker.model';

@Component({
  selector: 'app-jobseeker',
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
  templateUrl: './jobseeker.component.html',
  styleUrls: ['./jobseeker.component.scss']
})


export class JobseekerComponent implements OnInit {


  displayedColumns: string[] =
  ['gender', 'nom', 'prenom', 'qpv', 'activity', 'dernierRdv',
    'licence', 'status', 'action-edit'];
  dataSource = new MatTableDataSource<JobSeeker>();

  selection = new Set<any>(); // ou MatSelectionModel si tu veux plus avancé

  //filtre avancée

  filterGender: string | null = null;
  filterQpv: string | null = null;
  filterActivity: string | null = null;
  filterStatus: number | null = null;
  //PErsonnalisation des colonnes
  allColumns = [
    { key: 'gender', label: 'Civilité' },
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'qpv', label: 'QPV' },
    { key: 'activity', label: 'Secteur d\'activité' },
    { key: 'dernierRdv', label: 'Date dernier RDV' },
    { key: 'licence', label: 'Permis de conduire' },
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

  demandeurs = [
    { id: 1, gender: 'Mme', nom: 'Durand', prenom: 'Sophie', qpv: 'oui', activity: 'BTP', dernierRdv: new Date(), licence: 'Permis B', status: 1 },
    { id: 2, gender: 'M.', nom: 'Martin', prenom: 'Julien', qpv: 'non', activity: 'Informatique', dernierRdv: new Date(), licence: 'Permis A', status: 0 },
    { id: 3, gender: 'Mme', nom: 'Petit', prenom: 'Camille', qpv: 'oui', activity: 'Commerce', dernierRdv: new Date(), licence: 'Aucun', status: 1 },
    { id: 4, gender: 'M.', nom: 'Robert', prenom: 'Lucas', qpv: 'non', activity: 'BTP', dernierRdv: new Date(), licence: 'Permis B', status: 2 },
    { id: 5, gender: 'Mme', nom: 'Moreau', prenom: 'Chloé', qpv: 'oui', activity: 'Santé', dernierRdv: new Date(), licence: 'Permis C', status: 1 },
    { id: 6, gender: 'M.', nom: 'Garcia', prenom: 'Thomas', qpv: 'non', activity: 'Informatique', dernierRdv: new Date(), licence: 'Aucun', status: 0 },
    { id: 7, gender: 'Mme', nom: 'Bernard', prenom: 'Élodie', qpv: 'oui', activity: 'Éducation', dernierRdv: new Date(), licence: 'Permis B', status: 2 },
    { id: 8, gender: 'M.', nom: 'Lemoine', prenom: 'Antoine', qpv: 'non', activity: 'Transport', dernierRdv: new Date(), licence: 'Permis C', status: 1 },
    { id: 9, gender: 'Mme', nom: 'Faure', prenom: 'Claire', qpv: 'oui', activity: 'Santé', dernierRdv: new Date(), licence: 'Permis B', status: 0 },
    { id: 10, gender: 'M.', nom: 'Andre', prenom: 'Matthieu', qpv: 'oui', activity: 'BTP', dernierRdv: new Date(), licence: 'Permis A', status: 2 },
    { id: 11, gender: 'Mme', nom: 'Mercier', prenom: 'Nathalie', qpv: 'non', activity: 'Commerce', dernierRdv: new Date(), licence: 'Permis B', status: 1 },
    { id: 12, gender: 'M.', nom: 'Fernandez', prenom: 'Kevin', qpv: 'oui', activity: 'Éducation', dernierRdv: new Date(), licence: 'Permis C', status: 1 },
    { id: 13, gender: 'Mme', nom: 'Leroy', prenom: 'Lucie', qpv: 'oui', activity: 'Informatique', dernierRdv: new Date(), licence: 'Aucun', status: 0 },
    { id: 14, gender: 'M.', nom: 'Lopez', prenom: 'Enzo', qpv: 'non', activity: 'Transport', dernierRdv: new Date(), licence: 'Permis B', status: 1 },
    { id: 15, gender: 'Mme', nom: 'Roux', prenom: 'Manon', qpv: 'non', activity: 'Santé', dernierRdv: new Date(), licence: 'Permis A', status: 2 },
    { id: 16, gender: 'M.', nom: 'Blanc', prenom: 'Hugo', qpv: 'oui', activity: 'BTP', dernierRdv: new Date(), licence: 'Permis B', status: 0 },
    { id: 17, gender: 'Mme', nom: 'Meunier', prenom: 'Amandine', qpv: 'oui', activity: 'Commerce', dernierRdv: new Date(), licence: 'Permis C', status: 1 },
    { id: 18, gender: 'M.', nom: 'Perez', prenom: 'Quentin', qpv: 'non', activity: 'Informatique', dernierRdv: new Date(), licence: 'Aucun', status: 2 },
    { id: 19, gender: 'Mme', nom: 'Fournier', prenom: 'Marion', qpv: 'oui', activity: 'Éducation', dernierRdv: new Date(), licence: 'Permis B', status: 1 },
    { id: 20, gender: 'M.', nom: 'Girard', prenom: 'Bastien', qpv: 'non', activity: 'Transport', dernierRdv: new Date(), licence: 'Permis C', status: 0 },
    { id: 21, gender: 'Mme', nom: 'Garnier', prenom: 'Justine', qpv: 'oui', activity: 'Santé', dernierRdv: new Date(), licence: 'Permis B', status: 1 },
    { id: 22, gender: 'M.', nom: 'Chevalier', prenom: 'Yanis', qpv: 'non', activity: 'BTP', dernierRdv: new Date(), licence: 'Permis A', status: 2 },
    { id: 23, gender: 'Mme', nom: 'Lambert', prenom: 'Emma', qpv: 'oui', activity: 'Informatique', dernierRdv: new Date(), licence: 'Aucun', status: 0 },
    { id: 24, gender: 'M.', nom: 'Bonnet', prenom: 'Noah', qpv: 'oui', activity: 'Commerce', dernierRdv: new Date(), licence: 'Permis C', status: 1 },
    { id: 25, gender: 'Mme', nom: 'Dupuis', prenom: 'Céline', qpv: 'non', activity: 'Éducation', dernierRdv: new Date(), licence: 'Permis B', status: 2 },
    { id: 26, gender: 'M.', nom: 'Bertrand', prenom: 'Alexis', qpv: 'oui', activity: 'Transport', dernierRdv: new Date(), licence: 'Permis A', status: 1 },
    { id: 27, gender: 'Mme', nom: 'Perrin', prenom: 'Isabelle', qpv: 'non', activity: 'Santé', dernierRdv: new Date(), licence: 'Permis C', status: 0 },
    { id: 28, gender: 'M.', nom: 'Rolland', prenom: 'Léo', qpv: 'oui', activity: 'BTP', dernierRdv: new Date(), licence: 'Permis B', status: 2 },
    { id: 29, gender: 'Mme', nom: 'Leclerc', prenom: 'Anaïs', qpv: 'oui', activity: 'Commerce', dernierRdv: new Date(), licence: 'Aucun', status: 1 },
    { id: 30, gender: 'M.', nom: 'Gaillard', prenom: 'Nathan', qpv: 'non', activity: 'Éducation', dernierRdv: new Date(), licence: 'Permis B', status: 0 }
  ];

  newJobSeeker: JobSeeker = {
    id: 0,
    gender: '',
    nom: '',
    prenom: '',
    qpv: '',
    activity: '',
    dernierRdv: null,
    licence: '',
    status: 0,
  };

  newSeeker: JobSeeker = new JobSeekerModel();



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private jobseekerService: JobseekerService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.jobseekerService.getAllLazy({pageNumber: 0, size: 10}).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: err => console.error(err)
    });

    // Simule des données — remplace par le service back
    this.dataSource.data = [
      {
        id: 1,
        gender: 'Mme',
        nom: 'Durand',
        prenom: 'Sophie',
        qpv: "oui",
        activity: 'BTP',
        dernierRdv: new Date(),
        licence: 'Permis B',
        status: 1
      },
      {
        id: 2,
        gender: 'Mme',
        nom: 'Dupond',
        prenom: 'Janine',
        qpv: "oui",
        activity: 'BTP',
        dernierRdv: new Date(),
        licence: 'Permis B',
        status: 2
      },
      {
        id: 3,
        gender: 'M.',
        nom: 'Bernard',
        prenom: 'Robert',
        qpv: "non",
        activity: 'BTP',
        dernierRdv: new Date(),
        licence: 'Permis B',
        status: 3
      },
    ];
    this.dataSource = new MatTableDataSource<JobSeeker>(this.demandeurs as JobSeeker[]);

    this.dataSource.filterPredicate = (data: JobSeeker, filter: string): boolean => {
      const search = JSON.parse(filter);

      const matchesText =
        data.nom.toLowerCase().includes(search.text) ||
        data.prenom.toLowerCase().includes(search.text) ||
        (!!data.activity && data.activity.toLowerCase().includes(search.text));

      const matchesGender = search.gender ? data.gender === search.gender : true;
      const matchesQpv = search.qpv ? data.qpv.toLowerCase() === search.qpv.toLowerCase() : true;
      const matchesActivity = search.activity ? data.activity === search.activity : true;
      const matchesStatus = search.status !== null && search.status !== undefined ? data.status === search.status : true;

      return Boolean(matchesText && matchesGender && matchesQpv && matchesActivity && matchesStatus);
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
      gender: this.filterGender || null,
      qpv: this.filterQpv || null,
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
    XLSX.writeFile(workbook, 'liste-jobseekers.xlsx');
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
    this.router.navigate(['jobseeker', row.id]);
  }

  /* GESTION DE L'AJOUT D'UN JOBSEEKER  */

  openAddDialog() {
    const dialogRef = this.dialog.open(JobseekerAddDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: JobSeeker | undefined) => {
      if (result) {
        this.onAddJobSeeker(result);
      }
    });
  }

  onAddJobSeeker(newSeeker: JobSeeker): void {
    const safeSeeker = {
      ...newSeeker,
      dernierRdv: newSeeker.dernierRdv ?? new Date()
    };
    this.demandeurs.push(safeSeeker);
    this.dataSource.data = [...this.demandeurs];
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
        return { icon: 'error', label: 'Sans Emploi', class: 'icon-error' };
      case 2:
        return { icon: 'check_circle', label: 'Sous contrat', class: 'icon-success' };
      case 3:
        return { icon: 'hourglass_empty', label: 'Nouveau', class: 'icon-pending' };
      default:
        return { icon: 'help_outline', label: 'Inconnu', class: 'icon-default' };
    }
  }

}
