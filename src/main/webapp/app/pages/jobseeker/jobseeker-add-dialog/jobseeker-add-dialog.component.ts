import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { JobSeeker, JobSeekerModel } from '../jobseeker.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-jobseeker-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './jobseeker-add-dialog.component.html',
  styleUrl: './jobseeker-add-dialog.component.scss'
})
export class JobseekerAddDialogComponent {

  newSeeker: JobSeeker = new JobSeekerModel();
  
  statusOptions = [
  { value: 1, icon: 'error', label: 'Sans Emploi', class: 'icon-error' },
  { value: 2, icon: 'check_circle', label: 'Sous contrat', class: 'icon-success' },
  { value: 3, icon: 'hourglass_empty', label: 'Nouveau', class: 'icon-pending' },
  { value: 0, icon: 'help_outline', label: 'Inconnu', class: 'icon-default' }
];

  constructor(
    private dialogRef: MatDialogRef<JobseekerAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  ) { }

  onSubmit() {
    this.dialogRef.close(this.newSeeker);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
