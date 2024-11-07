import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './Shared/menu/menu.component';
import { BottomMenuComponent } from './Shared/bottom-menu/bottom-menu.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, MenuComponent, BottomMenuComponent],
})
export class AppComponent {
  title = 'CookingRecipes';
}
