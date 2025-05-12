import { Component } from '@angular/core';
import { SettingPageComponent } from '../../Shared/Component/setting-page/setting-page.component';

@Component({
  selector: 'app-settingpage',
  standalone: true,
  templateUrl: './settingpage.component.html',
  imports: [SettingPageComponent],
  styleUrl: './settingpage.component.scss',
})
export class SettingpageComponent {}
