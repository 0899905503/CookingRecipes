import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePaths } from '../Value/Constant/imageConstants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  logo = ImagePaths.logo;
}
