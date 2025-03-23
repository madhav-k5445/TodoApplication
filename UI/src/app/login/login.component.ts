import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthServiceService, private router:Router) {}

  onSubmit() {
    if (this.userName && this.password) {
      this.authService.login({ userName: this.userName, password: this.password }).subscribe(
        (response) => {
          localStorage.setItem("token", response.token);
          this.router.navigate(["/todo"]);
        },
        (error) => this.errorMessage = error.message
      );
    }
  }   
}
