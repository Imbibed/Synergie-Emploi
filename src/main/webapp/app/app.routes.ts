import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotfoundComponent} from "./pages/notfound/notfound.component";
import {LoginComponent} from "./pages/login/login.component";

export const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "**", component: NotfoundComponent},
];
