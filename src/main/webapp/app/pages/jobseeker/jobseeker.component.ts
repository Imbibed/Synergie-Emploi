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
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
//import * as FileSaver from 'file-saver';
import {JobseekerService} from "../../services/jobseeker.service";
import {JobSeekerDto} from "../../model/JobSeekerDto";
import {PaginationResponse} from "../../model/PaginationResponse";
import {debounceTime, Subject} from "rxjs";
import {JobSeekerFilter} from "../../model/JobSeekerFilter";
import {JobSeekerInputPagination} from "../../model/export class JobSeekerInputPagination";

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
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './jobseeker.component.html',
  styleUrls: ['./jobseeker.component.scss']
})


export class JobseekerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['gender', 'nom', 'prenom', "phoneNumber", 'status', 'action-edit'];
  dataSource = new MatTableDataSource<JobSeekerDto, MatPaginator>([]);
  selection = new Set<any>(); // ou MatSelectionModel si tu veux plus avancé

  firstNameControl = new FormControl('');
  lastNameControl = new FormControl('');
  genderControl = new FormControl('');
  phoneNumberControl = new FormControl('');
  statusControl = new FormControl('');

  jobsSeekersDto: WritableSignal<JobSeekerDto[]> = signal<JobSeekerDto[]>([]);
  jobSeekerCount: WritableSignal<number> = signal(0);

  jobSeekerInputPagination: WritableSignal<JobSeekerInputPagination> = signal(new JobSeekerInputPagination());

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private jobseekerService: JobseekerService,
    private dialog: MatDialog) {
    this.setupFilters();
    effect(() => {
      this.refreshJobSeekers(this.jobSeekerInputPagination());
    })
    effect(() => {
      this.dataSource = new MatTableDataSource<JobSeekerDto, MatPaginator>(this.jobsSeekersDto());
    })
  }

  ngOnInit() {
    //this.refreshJobSeekers(this.jobSeekerInputPagination());
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

  refreshJobSeekers(jobSeekerInputPagination: JobSeekerInputPagination) {
    this.jobseekerService.getAllLazy(jobSeekerInputPagination).subscribe({
      next: (data: PaginationResponse<JobSeekerDto>) => {
        this.jobSeekerCount.set(data.totalElements!);
        this.jobsSeekersDto.set(data.content!);
      },
      error: err => console.error(err)
    });
  }

  onPageChange(event: PageEvent) {
    this.jobSeekerInputPagination.update(current => {
      return {...current, pageIndex: event.pageIndex, pageSize: event.pageSize}
    });
  }

  setupFilters() {
    this.firstNameControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(firstName => {
        this.jobSeekerInputPagination.update((current: JobSeekerInputPagination) => {
          return {...current, jobSeekerFilter: {...current.jobSeekerFilter, firstName: firstName}} as JobSeekerInputPagination
        })
      })
    this.lastNameControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(lastName => {
        this.jobSeekerInputPagination.update((current: JobSeekerInputPagination) => {
          return {...current, jobSeekerFilter: {...current.jobSeekerFilter, lastName: lastName}} as JobSeekerInputPagination
        })
      })
    this.genderControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe( gender => {
        this.jobSeekerInputPagination.update((current: JobSeekerInputPagination) => {
          return {...current, jobSeekerFilter: {...current.jobSeekerFilter, gender: gender}} as JobSeekerInputPagination
        })
      })
    this.phoneNumberControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe( phoneNumber => {
        this.jobSeekerInputPagination.update((current: JobSeekerInputPagination) => {
          return {...current, jobSeekerFilter: {...current.jobSeekerFilter, phoneNumber: phoneNumber}} as JobSeekerInputPagination
        })
      })
    this.statusControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe( status => {
        this.jobSeekerInputPagination.update((current: JobSeekerInputPagination) => {
          return {...current, jobSeekerFilter: {...current.jobSeekerFilter, status: status}} as JobSeekerInputPagination
        })
      })
  }

}
