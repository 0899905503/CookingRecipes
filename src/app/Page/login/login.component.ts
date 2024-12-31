import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { FormsModule } from '@angular/forms';
import { ErrorsCodeEnum } from '../../Shared/Value/Enums/errorsCodeEnums';

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
  @Input() activeButton: string = '';
  @Output() toggle = new EventEmitter<string>();

  isLoginChecked: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.deviceUuid = this.authService.getDeviceUuid();
  }

  toggleActive(button: string) {
    this.activeButton = button;
    this.toggle.emit(button);
  }

  onLogin() {
    this.authService
      .login(this.username, this.password, this.deviceUuid)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/home']);
          this.loggedIn = true;
          console.log(res);
        },
        error: (err) => {
          this.errorMessage = ErrorsCodeEnum.AUTH_LOGIN_INVALID_CREDENTIAL;
          console.error(err);
        },
      });
  }

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isLoginChecked = input.checked;
    console.log('Remember Me:', this.isLoginChecked);
  }

  isLoggedIn(): boolean {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log('token : ' + token);
    return !!token;
  }
}
