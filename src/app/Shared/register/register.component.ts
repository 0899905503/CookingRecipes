import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../Service/Auth/Register/register.service';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, CommonModule, TranslateModule],
})
export class RegisterComponent {
  email = '';
  username = '';
  password = '';
  role = 'user';
  isLoginChecked: boolean = false;
  passwordVisible = false;

  //Authentication
  otpSent: boolean = false;
  otp: string = '';
  generatedOtp: string = ''; // Được trả từ server (nếu xác minh OTP ở client, KHÔNG nên dùng cách này nếu muốn bảo mật tốt)
  emailConfirmed: boolean = false;
  emailForOtp = '';
  otpCode = '';
  message = '';
  emailError = '';
  otpError = '';

  //Check register
  registerError: string = '';

  @Input() activeButton: string = '';
  @Output() toggle = new EventEmitter<string>();

  toggleActive(button: string) {
    this.activeButton = button;
    this.toggle.emit(button);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(
    private registerService: RegisterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isLoginChecked = input.checked;
  }

  onRegisterOtp() {
    if (!this.email || !this.username || !this.password) {
      console.log('All fields are required.');
      return;
    }

    // Gửi OTP qua email
    this.authService.sendOtpS(this.email).subscribe(
      (response: any) => {
        console.log('OTP sent:', response);
        this.otpSent = true;
        this.generatedOtp = response.otp; // nếu bạn xác thực OTP ở frontend
      },
      (error) => {
        console.error('Failed to send OTP:', error);
      }
    );
  }

  verifyOtp() {
    this.authService.verifyOtpS(this.email, this.otpCode).subscribe({
      next: (res) => {
        this.message = res.message;
        this.emailConfirmed = true;
        this.onRegister(); // chỉ đăng ký khi xác thực OTP thành công
      },
      error: (err) => {
        console.error('OTP verification failed:', err);
        this.otpError = 'OTP verification failed.';
      },
    });
  }

  onRegister() {
    const formData = {
      email: this.email.trim(),
      username: this.username.trim(),
      password: this.password.trim(),
      role: 'user',
    };

    // Kiểm tra dữ liệu đầu vào
    if (!formData.email || !formData.username || !formData.password) {
      this.registerError = 'All fields are required.';
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      this.registerError = 'Please enter a valid email address.';
      return;
    }

    this.registerService.register(formData).subscribe({
      next: (response: any) => {
        if (response.success) {
          console.log('User registered successfully:', response);
          this.registerError = '';
          alert('Registration successful!');
        } else {
          this.registerError = response.message || 'Registration failed.';
          alert(this.registerError);
        }
      },
      error: (error) => {
        console.error('Registration error:', error);

        if (error.status === 404 && error.error && error.error.message) {
          this.registerError = error.error.message;
        } else if (error.error && error.error.message) {
          this.registerError = error.error.message;
        } else if (typeof error.error === 'string') {
          this.registerError = error.error;
        } else {
          this.registerError = 'Email or Username already exists.';
        }

        alert(this.registerError);
      },
    });
  }
}
