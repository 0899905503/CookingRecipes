import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponents {
  activeButton: string = 'login'; // Default active button

  toggleActive(button: string) {
    this.activeButton = button; // Toggle between 'login' and 'register'
  }
}
