import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './Shared/menu/menu.component';
import { BottomMenuComponent } from './Shared/bottom-menu/bottom-menu.component';
import { AuthService } from './Service/Auth/Login/login.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Page/login/login.component';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule,
    MenuComponent,
    BottomMenuComponent,
    LoginComponent,
    CommonModule,
  ],
})
export class AppComponent {
  title = 'CookingRecipes';
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      console.log('Is Logged In: ', isLoggedIn); // Kiểm tra trạng thái đăng nhập
    });
  }
  activeButton: string = 'login'; // Default active button

  toggleActive(button: string) {
    this.activeButton = button; // Change active button
  }
}
