import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bcrypt from 'bcryptjs';
import { AppModule } from '../../app.module';
import { RegisterComponent } from '../../Shared/register/register.component';
import { LoginComponent } from '../login/login.component';
import { RegisterService } from '../../Service/Auth/Register/register.service';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [FormsModule, CommonModule, RegisterComponent, LoginComponent],
})
export class AuthComponent {
  activeButton: string = 'login'; // Default to login
  isLoginChecked: boolean = false;

  username = '';
  password = '';
  deviceUuid = '';
  errorMessage = '';
  private loggedIn = false;

  email = '';
  registerUsername = '';
  registerPassword = '';
  role = 'user';

  constructor(
    private authService: AuthService,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.deviceUuid = this.authService.getDeviceUuid();
  }

  toggleActive(button: string) {
    this.activeButton = button;
  }

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isLoginChecked = input.checked;
  }

  // onLogin() {
  //   this.authService
  //     .login(this.username, this.password, this.deviceUuid)
  //     .subscribe({
  //       next: () => {
  //         this.router.navigate(['/home']);
  //         this.loggedIn = true;
  //         console.log('Login successful!');
  //       },
  //       error: (err) => {
  //         this.errorMessage = 'Invalid login credentials.';
  //         console.error('Login error:', err);
  //       },
  //     });
  // }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  // onRegister() {
  //   const formData = {
  //     email: this.email.trim(),
  //     username: this.registerUsername.trim(),
  //     password: this.registerPassword.trim(),
  //     role: 'user',
  //   };

  //   if (!formData.email || !formData.username || !formData.password) {
  //     console.log('All fields are required.');
  //     return;
  //   }

  //   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  //   if (!emailPattern.test(formData.email)) {
  //     console.log('Please enter a valid email address.');
  //     return;
  //   }

  //   bcrypt.hash(formData.password, 10, (err, hashedPassword) => {
  //     if (err) {
  //       console.error('Error hashing password:', err);
  //       return;
  //     }

  //     const userData = {
  //       email: formData.email,
  //       username: formData.username,
  //       passwordHash: hashedPassword,
  //       role: formData.role,
  //     };

  //     this.registerService.registerUser(userData).subscribe({
  //       next: (response) => {
  //         console.log('User registered successfully:', response);
  //         console.log('Registration successful!');
  //       },
  //       error: (error) => {
  //         console.error('Error during registration:', error);
  //         console.log('Registration failed. Please try again.');
  //       },
  //     });
  //   });
  // }
}
