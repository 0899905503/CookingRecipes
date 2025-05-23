import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ImagePaths } from '../Value/Constant/imageConstants';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bottom-menu',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './bottom-menu.component.html',
  styleUrl: './bottom-menu.component.scss',
})
export class BottomMenuComponent {
  bottom_logo = ImagePaths.logo_button;
  facebook = ImagePaths.facebook;
  tiktok = ImagePaths.tiktok;
  ins = ImagePaths.ins;
  youtube = ImagePaths.youtube;
  userRole: string = '';
  //translate
  currentLang: string = 'en';
  constructor(private router: Router, private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit() {
    // Giả sử lấy role từ localStorage
    this.userRole = localStorage.getItem('role') || 'guest';
  }
  checkAccessAndNavigate(path: string, event: Event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>

    if (this.userRole === 'guest') {
      this.translate.get('ALERT').subscribe((res: string) => {
        alert(res);
      });
      return;
    }

    this.router.navigate([`/${path}`]);
  }
}
