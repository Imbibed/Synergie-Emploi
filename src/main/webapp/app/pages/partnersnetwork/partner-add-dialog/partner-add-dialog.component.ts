import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Partner, PartnerModel } from '../partner.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-partner-add-dialog',
  standalone: true,
    imports: [
    CommonModule,
    FormsModule,
    MatDialogModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './partner-add-dialog.component.html',
  styleUrl: './partner-add-dialog.component.scss'
})
export class PartnerAddDialogComponent {
  
    newPartner: Partner = new PartnerModel();
    
    statusOptions = [
    { value: 1, icon: 'error', label: 'Sans Emploi', class: 'icon-error' },
    { value: 2, icon: 'check_circle', label: 'Sous contrat', class: 'icon-success' },
    { value: 3, icon: 'hourglass_empty', label: 'Nouveau', class: 'icon-pending' },
    { value: 0, icon: 'help_outline', label: 'Inconnu', class: 'icon-default' }
  ];
  
    constructor(
      private dialogRef: MatDialogRef<PartnerAddDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any  ) { }
  
    onSubmit() {
      this.dialogRef.close(this.newPartner);
    }
  
    onCancel() {
      this.dialogRef.close();
    }

}
