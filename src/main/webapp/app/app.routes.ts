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
//Entreprise
import { CompaniesnetworkComponent } from './pages/companiesnetwork/companiesnetwork.component';
//import { EditCompanyComponent } from './pages/edit-partner/edit-partner.component';

//Tableau de bord
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {authGuardFn} from "./guards/auth.guard";


export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuardFn],
    data: {roles: []},
    children: [
      { path: '', redirectTo: 'jobseeker', pathMatch: 'full' }, // page par défaut dans layout
      { path: 'dashboard', component: DashboardComponent }, //tableau de bord
      { path: 'jobseeker', component: JobseekerComponent }, //Demandeurs d'emploi
      { path: 'jobseeker/:id', component: JobseekerEditComponent },//edition d'un demandeur d'emploi

      { path: 'partner', component: PartnersnetworkComponent },//Réseau partenaire
      { path: 'partner/:id', component: EditPartnerComponent },//edition d'un demandeur d'emploi

      { path: 'companies', component: CompaniesnetworkComponent },//Réseau d'entreprise
      //{ path: 'companies/:id', component: EditCompanyComponent },//edition d'une entreprise

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];
