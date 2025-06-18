import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router'; // Pour rediriger
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


interface Partner {
  entreprise : string;
  nomContact: string;
  prenomContact: string;
  tel: string;
  adresse: string;
  dernierRdv: Date;
  prochainRdv: Date;
  statut: string;
}

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
      MatIconModule
  
    ],
  templateUrl: './partnersnetwork.component.html',
  styleUrl: './partnersnetwork.component.scss'
})
export class PartnersnetworkComponent implements OnInit {
  displayedColumns: string[] = 
  ['select','entreprise','nomContact', 'prenomContact', 'tel', 'adresse', 
    'dernierRdv', 'prochainRdv', 'statut','action'
  ];
  dataSource = new MatTableDataSource<any>([]); 
  selection = new Set<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {}

  ngOnInit() {
    // Simule des données — remplace par le service back
    this.dataSource.data = [
      { id:1, entreprise: 'TOTAL',nom: 'Ladal', prenom: 'Pascal', tel: '0123456789', 
        adresse: 'Paris', dernierRdv: new Date(), 
        prochainRdv: new Date(), statut: 'actif'
      },

      { id:2, entreprise: 'Voxens',nom: 'Grosdesir', prenom: 'Justin', tel: '0123456789', 
        adresse: 'Le Havre', dernierRdv: new Date(),
        prochainRdv: new Date(), statut: 'inactif' 
      },

      { id:3, entreprise: 'Ville de Rouen', nom: 'Le merle', prenom: 'Lucas', tel: '0123456789',
        adresse: 'Rouen', dernierRdv: new Date(),
        prochainRdv: new Date(), statut: 'nouveau'
      },
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
  this.router.navigate(['partner', row.id]);
}

addPartner() {

    this.router.navigate(['add-partner']);
}

deleteSelectedRows() {
  const remaining = this.dataSource.data.filter(row => !this.selection.has(row));
  this.selection.clear();
  this.dataSource.data = remaining;
}


}
