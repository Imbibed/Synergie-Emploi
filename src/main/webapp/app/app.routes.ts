import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotfoundComponent} from "./pages/notfound/notfound.component";
import {LoginComponent} from "./pages/login/login.component";
import {ForbidenComponent} from "./pages/forbiden/forbiden.component";
import {authGuardFn} from "./guards/auth.guard";
import {AdminComponent} from "./pages/admin/admin.component";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full"},
  { path: "login", component: LoginComponent},
  { path: "home", component: HomeComponent, canActivate: [authGuardFn], data: {roles: []}},
  { path: "admin", component: AdminComponent, canActivate: [authGuardFn], data: {roles: ["Administrateur"]}},
  { path: "forbiden", component: ForbidenComponent},
  { path: "**", component: NotfoundComponent},
];
