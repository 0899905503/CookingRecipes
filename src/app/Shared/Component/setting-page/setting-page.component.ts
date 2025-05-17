import { Component } from '@angular/core';
import { AuthService } from '../../../Service/Auth/Login/login.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss'],
  imports: [TranslateModule, HttpClientModule],
})
export class SettingPageComponent {
  constructor(
    private authService: AuthService,
    public translate: TranslateService
  ) {
    // Khởi tạo ngôn ngữ mặc định
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && ['en', 'vi'].includes(savedLang)) {
      this.translate.use(savedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang?.match(/en|vi/) ? browserLang : 'en');
    }
  }

  toggleDarkMode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  changeLanguage(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedLang = select.value;
    this.translate.use(selectedLang);
    localStorage.setItem('selectedLanguage', selectedLang); // 👈 Lưu vào localStorage
  }

  logout() {
    this.authService.logout();
  }
}
