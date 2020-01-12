import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse } from '../shared/interfaces/auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;
  error = '';
  isAuthSuccess = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;

    const email = form.value.email;
    const pass = form.value.pass;

    let authObs: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, pass);
    }
    else {
      authObs = this.authService.signup(email, pass);
    }

    authObs.subscribe(
      (res) => {
        console.log(res);

        this.isLoading = false;
        if (this.isLoginMode) {
          this.router.navigate(['/home']);
        }
        else {
          this.isLoading = false;
          this.isAuthSuccess = true;
        }
      },
      (errMessage) => {
        this.error = errMessage;
        this.isLoading = false;
      }
    )
  }

}
