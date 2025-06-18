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
    MatMenuModule
  ],
  templateUrl: './jobseeker.component.html',
  styleUrl: './jobseeker.component.scss'
})
export class JobseekerComponent implements OnInit {
  displayedColumns: string[] = [ 'gender', 'nom', 'prenom', 'qpv', 'activity', 'dernierRdv', 'licence', 'status', 'action-edit'];
  dataSource = new MatTableDataSource<any>([]); // ton tableau source ici
  selection = new Set<any>(); // ou MatSelectionModel si tu veux plus avancé

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) { }

  ngOnInit() {
    // Simule des données — remplace par le service back
    this.dataSource.data = [
      { id: 1, gender: 'Mme', nom: 'Durand', prenom: 'Sophie', qpv: "oui", activity: 'BTP', dernierRdv: new Date(), licence: 'Permis B', status: 1 },
      { id: 2, gender: 'Mme', nom: 'Dupond', prenom: 'Janine', qpv: "oui", activity: 'BTP', dernierRdv: new Date(), licence: 'Permis B', status: 2 },
      { id: 3, gender: 'M.', nom: 'Bernard', prenom: 'Robert', qpv: "non", activity: 'BTP', dernierRdv: new Date(), licence: 'Permis B', status: 3 },
    ];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    return this.selection.size === this.dataSource.data.length;
  }

  isSomeSelected() {
    return this.selection.size > 0 && !this.isAllSelected();
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.add(row));
    }
  }

  toggleSelection(row: any) {
    if (this.selection.has(row)) {
      this.selection.delete(row);
    } else {
      this.selection.add(row);
    }
  }
  openEdit(row: any) {
    this.router.navigate(['jobseeker', row.id]);
  }

  addJobSeeker() {

  }

  deleteRow(row:any) {
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