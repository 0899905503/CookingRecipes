import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../Service/Auth/Login/login.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../../../app-routing.module';
import { Router, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../Service/Admin/admin.service';

@Component({
  standalone: true,
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss'],
  imports: [TranslateModule, HttpClientModule, CommonModule, FormsModule],
})
export class SettingPageComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef;
  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService,
    public adminService: AdminService
  ) {
    // Khởi tạo ngôn ngữ mặc định
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && ['en', 'vi'].includes(savedLang)) {
      this.translate.use(savedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang?.match(/en|vi/) ? browserLang : 'en');
    }
  }
  userRole = '';
  email = '';
  avatar = '';

  //Get user id
  UserId: number = 0;

  //GUEST
  isGuest = false;
  name = '';
  //Change password
  emailForOtp = '';
  newPassword = '';
  otpCode = '';
  message = '';
  emailError = '';
  otpError = '';
  resetError = '';
  showForgotPasswordModal = false;
  step = 1;
  ngOnInit() {
    this.userRole = this.authService.getRole();
    this.name = localStorage.getItem('name') || '';
    this.email = localStorage.getItem('email') || '';
    this.isGuest = this.userRole === 'guest';
    this.avatar = localStorage.getItem('avt') || 'assets/images/user.jpg'; // fallback avatar
    console.log(this.avatar);

    const userId = this.authService.getUserId();
    this.UserId = userId !== null ? userId : 0;
    console.log('UserId : ' + this.UserId);
  }

  goToAdminPage() {
    this.router.navigate(['/admin']); // đảm bảo bạn có route '/admin' trong Angular routing
  }
  toggleDarkMode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  changeLanguage(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedLang = select.value;
    this.translate.use(selectedLang);
    localStorage.setItem('selectedLanguage', selectedLang); // 👈 Lưu vào localStorage
  }

  logout() {
    this.authService.logout();
  }

  //Change password
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

  // ✅ Khi nhấn vào avatar
  onAvatarClick(): void {
    this.fileInputRef.nativeElement.click();
  }

  // ✅ Khi chọn ảnh
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.adminService.updateAvatars(this.UserId, file).subscribe({
        next: (res) => {
          this.avatar = res.data.avatar;
          localStorage.setItem('avt', this.avatar);
        },
        error: (err) => {
          console.error('Update avatar failed', err);
        },
      });
    }
  }
}
