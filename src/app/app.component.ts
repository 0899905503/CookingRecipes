import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './Shared/menu/menu.component';
import { BottomMenuComponent } from './Shared/bottom-menu/bottom-menu.component';
import { LoginComponents } from './Shared/login/login.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, MenuComponent, BottomMenuComponent, LoginComponents],
})
export class AppComponent {
  title = 'CookingRecipes';
}
