import { Component } from '@angular/core';

// Angular Material modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Angular common & router
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss']
})
export class MainLayout {

  constructor(private router: Router,
    private dialog: MatDialog) { }

  logout() {

    this.router.navigate(['/login']);
  }

  openSettings() {
    this.dialog.open(SettingsDialogComponent, {
      width: '1820px',
      height: '800px',
      panelClass: 'settings-dialog'
    });
  }

  openAbout() {
    this.dialog.open(AboutDialogComponent);
  }
}