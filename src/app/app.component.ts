import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MenuComponent } from './Shared/menu/menu.component';
import { BottomMenuComponent } from './Shared/bottom-menu/bottom-menu.component';
import { AuthService } from './Service/Auth/Login/login.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Page/login/login.component';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  currentUrl: string = '';
  activeButton: string = 'login'; // Default active button

  constructor(private authService: AuthService, private router: Router) {
    // Lắng nghe URL thay đổi
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAuthenticated$;

    this.isLoggedIn$.subscribe((isLoggedIn) => {
      console.log('Is Logged In: ', isLoggedIn);
      if (isLoggedIn == true) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }

  toggleActive(button: string) {
    this.activeButton = button;
  }

  isAdminPage(): boolean {
    return this.currentUrl.startsWith('/admin');
  }
}
