import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() activeButton: string = ''; // Nhận trạng thái từ AuthComponent
  @Output() toggle = new EventEmitter<string>(); // Gửi sự kiện lên AuthComponent

  toggleActive(button: string) {
    this.activeButton = button;
    this.toggle.emit(button); // Kích hoạt sự kiện khi nút được nhấn
  }
  constructor(private authService: AuthService, private router: Router) {
    this.deviceUuid = this.authService.getDeviceUuid();
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

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isLoginChecked: boolean = false;

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isLoginChecked = input.checked;
  }
}
