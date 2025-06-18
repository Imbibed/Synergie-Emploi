import { Routes } from '@angular/router';
import { MainLayout } from "./pages/mainlayout/mainlayout.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { LoginComponent } from "./pages/login/login.component";
//Demandeur d'emploi
import { JobseekerComponent } from './pages/jobseeker/jobseeker.component';
import { JobseekerEditComponent } from './pages/edit-jobseeker/edit-jobseeker.component';
//Partenaire
import { PartnersnetworkComponent } from './pages/partnersnetwork/partnersnetwork.component';
import { EditPartnerComponent } from './pages/edit-partner/edit-partner.component';
import { AddPartnerComponent } from './pages/add-partner/add-partner.component';
//Tableau de bord
import { DashboardComponent } from './pages/dashboard/dashboard.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'jobseeker', pathMatch: 'full' }, // page par défaut dans layout
      { path: 'dashboard', component: DashboardComponent }, //tableau de bord
      { path: 'jobseeker', component: JobseekerComponent }, //Demandeurs d'emploi
      { path: 'jobseeker/:id', component: JobseekerEditComponent },//edition d'un demandeur d'emploi
      { path: 'partner', component: PartnersnetworkComponent },//Réseau partenaire
      { path: 'add-partner', component: AddPartnerComponent },//page de création d'un nouveau partenaire
      { path: 'partner/:id', component: EditPartnerComponent },//edition d'un demandeur d'emploi

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];
