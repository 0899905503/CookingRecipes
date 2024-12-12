import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { FormsModule } from '@angular/forms';
import { ErrorsCodeEnum } from '../../Shared/Value/Enums/errorsCodeEnums';
import { LoginComponents } from '../../Shared/login/login.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username = '';
  password = '';
  deviceUuid = '';
  errorMessage = '';
  private loggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.deviceUuid = this.authService.getDeviceUuid();
  }

  onLogin() {
    this.authService
      .login(this.username, this.password, this.deviceUuid)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
          this.loggedIn = true;
        },
        error: (err) => {
          this.errorMessage = ErrorsCodeEnum.AUTH_LOGIN_INVALID_CREDENTIAL;
          console.error(err);
        },
      });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  activeButton: string = 'login';

  toggleActive(button: string) {
    this.activeButton = button;
  }

  isLoginChecked: boolean = false;

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isLoginChecked = input.checked;
  }
}
