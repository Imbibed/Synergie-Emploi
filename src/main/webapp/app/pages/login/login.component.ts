import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

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

  ngOnInit() {

  }

  constructor(private authService: AuthenticationService, private router: Router){
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }



  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          //this.authService.setToken(token.token);
          //this.toastService.addToast({message: `Bienvenue.`, type: 'success'});
          console.log('before navigate');
          this.router.navigate(['']).then();
        },
        error: err => {
          //this.toastService.addToast({message: err.error, type: 'error'});
          console.error(err);
        }
      });
    }
  }
}
