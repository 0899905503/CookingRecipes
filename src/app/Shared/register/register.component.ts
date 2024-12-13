import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegisterService } from '../../Service/Auth/register.service';
import * as bcrypt from 'bcryptjs'; // Đảm bảo bạn đã cài bcryptjs
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  @Input() activeButton: string = ''; // Nhận trạng thái từ AuthComponent
  @Output() toggle = new EventEmitter<string>(); // Gửi sự kiện lên AuthComponent

  toggleActive(button: string) {
    this.activeButton = button;
    this.toggle.emit(button); // Kích hoạt sự kiện khi nút được nhấn
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {
    // Tùy chọn, bạn có thể thêm logic khác nếu cần
  }

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

    // Kiểm tra xem các trường có bị bỏ trống không
    if (!formData.email || !formData.username || !formData.password) {
      console.log('All fields are required.');
      return;
    }

    // Kiểm tra email hợp lệ
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      console.log('Please enter a valid email address.');
      return;
    }

    // Mã hóa mật khẩu trước khi gửi
    bcrypt.hash(formData.password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }

      // Tạo đối tượng user với passwordHash
      const userData = {
        email: formData.email,
        username: formData.username,
        passwordHash: hashedPassword, // Gửi mật khẩu đã mã hóa
        role: formData.role,
      };

      // Gọi service để gửi yêu cầu đăng ký
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
    });
  }
}
