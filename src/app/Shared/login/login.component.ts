import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponents {
  activeButton: string = 'login';
  rememberMe: boolean = false;
  username: string = '';

  toggleActive(button: string) {
    this.activeButton = button;
  }

  onSubmit() {
    if (this.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('savedUsername', this.username);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('savedUsername');
    }
  }

  ngOnInit() {
    this.rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (this.rememberMe) {
      this.username = localStorage.getItem('savedUsername') || '';
    }
  }
}
