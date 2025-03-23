import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onRegister() {
    // Simple client-side validation for matching passwords.
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Create the registration payload
    const registerData = {
      username: this.username,
      password: this.password,
    };

    // Call the register method from the AuthService
    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        // Navigate to login page or dashboard after successful registration
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      },
    });
  }
}
