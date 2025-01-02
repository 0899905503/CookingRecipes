import { Component } from '@angular/core';
import { SettingPageComponent } from '../../Shared/Component/setting-page/setting-page.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SettingPageComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {}
