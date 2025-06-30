import {AfterViewInit, Component, effect, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
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


export class JobseekerComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] =
    ['gender', 'nom', 'prenom', "phoneNumber", 'status', 'action-edit'];
  dataSource = new MatTableDataSource<JobSeekerDto, MatPaginator>([]);

  selection = new Set<any>(); // ou MatSelectionModel si tu veux plus avancé

  jobsSeekersDto: WritableSignal<JobSeekerDto[]> = signal<JobSeekerDto[]>([]);
  jobSeekerCount: WritableSignal<number> = signal(0);
  jobSeekerPageIndex: WritableSignal<number> = signal(0);
  jobSeekerPageSize: WritableSignal<number> = signal(10);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private jobseekerService: JobseekerService,
    private dialog: MatDialog) {
    effect(() => {
      this.dataSource = new MatTableDataSource<JobSeekerDto, MatPaginator>(this.jobsSeekersDto());
    })
  }

  ngOnInit() {
    this.refreshJobSeekers(this.jobSeekerPageIndex(), this.jobSeekerPageSize());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggleSelection(row: any) {
    if (this.selection.has(row)) {
      this.selection.delete(row);
    } else {
      this.selection.add(row);
    }
  }

  openEdit(row: any) {
    this.router.navigate(['jobseeker', row.id]).then();
  }

  deleteRow(row: any) {
    console.log('Suppression de :', row);
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
        this.jobSeekerCount.set(data.totalElements!);
        this.jobsSeekersDto.set(data.content!);
        this.jobSeekerPageIndex.set(data.pageIndex!);
        this.jobSeekerPageSize.set(data.size!);
      },
      error: err => console.error(err)
    });
  }

  onPageChange(event: PageEvent) {
    this.refreshJobSeekers(event.pageIndex, event.pageSize);
  }

}
