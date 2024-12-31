import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../Service/Auth/Register/register.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  email = '';
  username = '';
  password = '';
  role = 'user';
  isLoginChecked: boolean = false;
  passwordVisible = false;

  @Input() activeButton: string = '';
  @Output() toggle = new EventEmitter<string>();

  toggleActive(button: string) {
    this.activeButton = button;
    this.toggle.emit(button);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {}

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isLoginChecked = input.checked;
  }

  onRegister() {
    const formData = {
      email: this.email.trim(),
      username: this.username.trim(),
      password: this.password.trim(),
      role: 'user',
    };

    if (!formData.email || !formData.username || !formData.password) {
      console.log('All fields are required.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      console.log('Please enter a valid email address.');
      return;
    }

    const userData = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      role: formData.role,
    };

    this.registerService.registerUser(userData).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        console.log('Registration successful!');
      },
      (error) => {
        console.error('Error during registration:', error);
        console.log('Registration failed. Please try again.');
      }
    );
  }
}
