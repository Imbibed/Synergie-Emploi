import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MailSettingsService } from '../../../services/mail-settings.service';
import { QuillModule } from 'ngx-quill';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Groups {
  id: number;
  groupName: string;
}

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    QuillModule,
    MatSnackBarModule
  ],
})
export class SettingsDialogComponent {
  activeSection: string = 'general';

  selectedLanguage: string = 'fr';
  languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'Anglais', flag: '🇬🇧' },
    { code: 'es', name: 'Espagnol', flag: '🇪🇸' },
  ];

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];

  users: User[] = [
    { id: 1, firstName: 'Florian', lastName: 'RAULT', email: 'florian.rault@live.fr' },
    { id: 2, firstName: 'Ludovic', lastName: 'DELESQUE', email: 'ludovic.delesque@ville-canteleu.fr' },
    { id: 3, firstName: 'Belinda', lastName: 'BOUCHRY', email: 'belinda?bouchry@ville-canteleu.fr' },
    { id: 4, firstName: 'Amal', lastName: 'JOHN', email: 'amal.john@ville-canteleu.fr' },
  ];

  groups: Groups[] = [
    { id: 1, groupName: 'Agent accueil' },
    { id: 2, groupName: 'Agent insertion' },
    { id: 3, groupName: 'Intervenant' },
    { id: 4, groupName: 'Administrateur' }];

  menus: string[] = [
    "Espace demandeur d'emploi",
    'Partenaire',
    'Entreprise',
    'Dashboard',
  ];



  newUser: Partial<User> = {
    firstName: '',
    lastName: '',
    email: '',
  };

  showAddUserForm = false;

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean']
    ]
  };
  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    public mailSettings: MailSettingsService,
    private snackBar: MatSnackBar) { }

  // Pour la matrice utilisateur ↔ groupe
  permissions: { [userId: number]: { [groupId: number]: boolean } } = {};

  // Pour la matrice groupe ↔ menu
  groupPermissions: { [groupId: number]: { [menu: string]: boolean } } = {};

  ngOnInit(): void {
    // Initialiser permissions utilisateur → groupe
    this.users.forEach(user => {
      this.permissions[user.id] = {};
      this.groups.forEach(group => {
        this.permissions[user.id][group.id] = false;
      });
    });

    // Initialiser permissions groupe → menu
    this.groups.forEach(group => {
      this.groupPermissions[group.id] = {};
      this.menus.forEach(menu => {
        this.groupPermissions[group.id][menu] = false;
      });
    });
  }

  select(section: string) {
    this.activeSection = section;
  }

  saveLanguages() {
    console.log('Langue sélectionnée :', this.selectedLanguage);
  }

  close(): void {
    this.dialogRef.close();
  }

  //Gestion des utilisateurs
  toggleAddUser() {
    this.showAddUserForm = !this.showAddUserForm;
    if (!this.showAddUserForm) {
      this.newUser = { firstName: '', lastName: '', email: '' };
    }
  }

  addUser() {
    if (!this.newUser.firstName || !this.newUser.lastName || !this.newUser.email) return;

    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;

    this.users = [
      ...this.users,
      {
        id: newId,
        firstName: this.newUser.firstName,
        lastName: this.newUser.lastName,
        email: this.newUser.email,
      },
    ];

    this.newUser = { firstName: '', lastName: '', email: '' };
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  //GEstio ndes droits role

  savePermissions() {
    console.log('Droits sauvegardés :', this.permissions);
    // TODO: appeler un service si besoin
  }


  updateMailSettings(): void {
    const { subject, body, signature } = this.mailSettings;

    if (!subject || !body || !signature) {
      this.snackBar.open('Veuillez remplir au moins le sujet et le corps du mail.', 'Fermer', { duration: 3000 });
      return;
    }

    this.snackBar.open('Modèle de mail mis à jour avec succès.', 'Fermer', {
      duration: 3000
    });


  }
}
