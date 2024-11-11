import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePaths } from '../Value/Constant/imageConstants';

@Component({
  selector: 'app-bottom-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './bottom-menu.component.html',
  styleUrl: './bottom-menu.component.scss',
})
export class BottomMenuComponent {
  bottom_logo = ImagePaths.logo_button;
  facebook = ImagePaths.facebook;
  tiktok = ImagePaths.tiktok;
  ins = ImagePaths.ins;
  youtube = ImagePaths.youtube;
}
