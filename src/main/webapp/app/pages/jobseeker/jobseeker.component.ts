import {Component, effect, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
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
import {JobseekerService} from "../../services/jobseeker.service";
import {JobSeeker, JobSeekerModel} from './jobseeker.model';
import {JobSeekerDto} from "../../model/JobSeekerDto";
import {PaginationResponse} from "../../model/PaginationResponse";

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
    ['gender', 'nom', 'prenom', "phoneNumber", 'status', 'action-edit'];
  dataSource = new MatTableDataSource<JobSeekerDto>([]);

  selection = new Set<any>(); // ou MatSelectionModel si tu veux plus avancé

  jobsSeekersDto: WritableSignal<JobSeekerDto[]> = signal<JobSeekerDto[]>([]);
  jobSeekerCount: WritableSignal<number> = signal(0);
  jobSeekerPageIndex: WritableSignal<number> = signal(0);
  jobSeekerPageSize: WritableSignal<number> = signal(10);

  //filtre avancée
  filterGender: string | null = null;
  filterQpv: string | null = null;
  filterActivity: string | null = null;
  filterStatus: number | null = null;
  //PErsonnalisation des colonnes
  allColumns = [
    {key: 'gender', label: 'Civilité'},
    {key: 'nom', label: 'Nom'},
    {key: 'prenom', label: 'Prénom'},
    {key: 'phoneNumber', label: 'Num. tel.'},
    {key: 'status', label: 'Statut'},
    {key: 'action-edit', label: 'Actions'},
  ];

  sectors: string[] = []; // à remplir avec tes secteurs existants
  statuses = [
    {value: 'active', label: 'Actif'},
    {value: 'inactive', label: 'Inactif'},
    {value: 'pending', label: 'En attente'},
    // adapte selon ton model
  ]

  statusOptions = [
    {value: 1, icon: 'error', label: 'Sans Emploi', class: 'icon-error'},
    {value: 2, icon: 'check_circle', label: 'Sous contrat', class: 'icon-success'},
    {value: 3, icon: 'hourglass_empty', label: 'Nouveau', class: 'icon-pending'},
    {value: 0, icon: 'help_outline', label: 'Inconnu', class: 'icon-default'}
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private jobseekerService: JobseekerService,
    private dialog: MatDialog) {
    effect(() => {
      this.dataSource.data = this.jobsSeekersDto();
    })
  }

  ngOnInit() {
    this.refreshJobSeekers(this.jobSeekerPageIndex(), this.jobSeekerPageSize());


    /*this.dataSource.filterPredicate = (data: JobSeeker, filter: string): boolean => {
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
    };*/

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

  /*exporterVersExcel(): void {
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
    const workbook = {Sheets: {Feuille1: worksheet}, SheetNames: ['Feuille1']};
    XLSX.writeFile(workbook, 'liste-jobseekers.xlsx');
  }*/

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

  /*openAddDialog() {
    const dialogRef = this.dialog.open(JobseekerAddDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: JobSeeker | undefined) => {
      if (result) {
        this.onAddJobSeeker(result);
      }
    });
  }*/

  /*onAddJobSeeker(newSeeker: JobSeeker): void {
    const safeSeeker = {
      ...newSeeker,
      dernierRdv: newSeeker.dernierRdv ?? new Date()
    };
    this.demandeurs.push(safeSeeker);
    this.dataSource.data = [...this.demandeurs];
  }*/

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

  getStatusDisplay(status: string): { icon: string; label: string; class?: string } {
    switch (status) {
      case "SANS_EMPLOI":
        return {icon: 'error', label: 'Sans Emploi', class: 'icon-error'};
      case "SOUS_CONTRAT":
        return {icon: 'check_circle', label: 'Sous contrat', class: 'icon-success'};
      default:
        return {icon: 'help_outline', label: 'Inconnu', class: 'icon-default'};
    }
  }

  refreshJobSeekers(pageNumber: number, pageSize: number) {
    this.jobseekerService.getAllLazy({pageNumber: pageNumber, size: pageSize}).subscribe({
      next: (data: PaginationResponse<JobSeekerDto>) => {
        console.log(data);
        this.jobSeekerCount.set(data.totalElements!);
        this.jobsSeekersDto.set(data.content!);
        this.jobSeekerPageIndex.set(data.pageIndex!);
        this.jobSeekerPageSize.set(data.size!);
        console.log(this.jobSeekerCount);
      },
      error: err => console.error(err)
    });
  }

  onPageChange(event: PageEvent) {
    this.refreshJobSeekers(event.pageIndex, event.pageSize);
  }

}
