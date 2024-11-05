import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true, // Nếu bạn muốn component này là standalone
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage =
          'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.';
        console.error(err);
      },
    });
  }
}
