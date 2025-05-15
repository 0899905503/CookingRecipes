import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();

  step = 1;
  emailForOtp = '';
  otpCode = '';
  newPassword = '';
  emailError = '';
  otpError = '';
  resetError = '';
  message = '';

  sendOtp() {
    if (!this.emailForOtp) {
      this.emailError = 'Email is required';
      return;
    }
    this.emailError = '';
    // TODO: Call API to send OTP
    this.step = 2;
  }

  verifyOtp() {
    if (this.otpCode !== '123456') {
      // Example OTP
      this.otpError = 'Invalid OTP';
      return;
    }
    this.otpError = '';
    this.step = 3;
  }

  resetPassword() {
    if (!this.newPassword) {
      this.resetError = 'Password cannot be empty';
      return;
    }
    this.resetError = '';
    this.message = 'Password has been reset successfully.';
  }

  close() {
    this.closeModal.emit();
    this.resetState();
  }

  private resetState() {
    this.step = 1;
    this.emailForOtp = '';
    this.otpCode = '';
    this.newPassword = '';
    this.emailError = '';
    this.otpError = '';
    this.resetError = '';
    this.message = '';
  }
}
