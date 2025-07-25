import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { FormsModule } from '@angular/forms';
import { ErrorsCodeEnum } from '../../Shared/Value/Enums/errorsCodeEnums';
import { ForgotPasswordComponent } from '../../Shared/Component/forgot-password/forgot-password.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    ForgotPasswordComponent,
    TranslateModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
})
export class LoginComponent {
  username = '';
  password = '';
  deviceUuid = '';
  errorMessage = '';

  //GUEST
  showGuestForm: boolean = false;
  guestName: string = '';
  guestCaptchaToken: string = '';
  private loggedIn = false;
  @Input() activeButton: string = '';
  @Output() toggle = new EventEmitter<string>();

  //forgot password
  showForgotPasswordModal = false;
  emailForOtp = '';
  otpCode = '';
  newPassword = '';
  step = 1;
  message = '';
  emailError = '';
  otpError = '';
  resetError = '';

  isLoginChecked: boolean = false;
  //translate
  currentLang: string = 'en';
  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.deviceUuid = this.authService.getDeviceUuid();
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
  ngOnInit() {
    this.deviceUuid = this.authService.getDeviceUuid();
    console.log('Device UUID:', this.deviceUuid);
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
  openForgotPasswordModal() {
    this.showForgotPasswordModal = true;
    this.step = 1;
    this.emailForOtp = '';
    this.otpCode = '';
    this.newPassword = '';
    this.message = '';
  }

  sendOtp() {
    this.authService.sendOtpS(this.emailForOtp).subscribe({
      next: (res) => {
        this.message = res.message;
        this.step = 2;
      },
      error: (err) => {
        this.emailError = 'Failed to send OTP. Check email.';
      },
    });
  }

  verifyOtp() {
    this.authService.verifyOtpS(this.emailForOtp, this.otpCode).subscribe({
      next: (res) => {
        this.message = res.message;
        this.step = 3;
      },
      error: (err) => {
        this.otpError = 'OTP verification failed.';
      },
    });
  }

  resetPassword() {
    this.authService
      .resetPasswordS(this.emailForOtp, this.newPassword)
      .subscribe({
        next: (res) => {
          this.message = res.message;
          this.showForgotPasswordModal = false;
        },
        error: (err) => {
          this.resetError = 'Password reset failed.';
        },
      });
  }

  //GUEST LOGIN
  onCaptchaResolved(token: string | null) {
    console.log('Token:', token); // ✅ kiểm tra token thực sự có
    this.guestCaptchaToken = token ?? '';
  }
  onGuestLogin() {
    this.errorMessage = '';

    if (!this.guestCaptchaToken || !this.guestName.trim()) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin và xác thực.';
      return;
    }

    this.authService
      .loginGuest(this.guestName, this.guestCaptchaToken)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/home']);
          console.log('Guest login successful:', res);
        },
        error: (err) => {
          this.errorMessage =
            'Xác thực reCAPTCHA không hợp lệ hoặc lỗi máy chủ.';
          console.error(err);
        },
      });
  }
}
