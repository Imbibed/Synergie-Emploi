import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthenticationService){
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmitLogin() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (token: {token: string}) => {
          console.log(token);
          //this.authService.setToken(token.token);
          //this.toastService.addToast({message: `Bienvenue.`, type: 'success'});
          //this.router.navigate(['home']).then();
        },
        error: err => {
          //this.toastService.addToast({message: err.error, type: 'error'});
          console.error(err);
        }
      });
    }
  }

  testLog() {
    this.authService.isLogged().subscribe({
      next: (data: any) => {
        console.log('ok', data);
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
