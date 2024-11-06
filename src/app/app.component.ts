import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './Shared/menu/menu.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, MenuComponent],
})
export class AppComponent {
  title = 'CookingRecipes';
}
