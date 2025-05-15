import { Component } from '@angular/core';
import { SettingPageComponent } from '../../Shared/Component/setting-page/setting-page.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settingpage',
  standalone: true,
  templateUrl: './settingpage.component.html',
  imports: [SettingPageComponent, TranslateModule],
  styleUrl: './settingpage.component.scss',
})
export class SettingpageComponent {}
