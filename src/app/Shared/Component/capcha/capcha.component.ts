import { Component, EventEmitter, OnInit, Output } from '@angular/core';
declare const grecaptcha: any;
@Component({
  selector: 'app-capcha',
  standalone: true,
  imports: [],
  templateUrl: './capcha.component.html',
  styleUrl: './capcha.component.scss',
})
export class CapchaComponent implements OnInit {
  @Output() resolved = new EventEmitter<string>();

  widgetId: any;

  ngOnInit(): void {
    // Đợi đến khi grecaptcha sẵn sàng
    const interval = setInterval(() => {
      if (typeof grecaptcha !== 'undefined') {
        clearInterval(interval);

        this.widgetId = grecaptcha.render('recaptcha-container', {
          sitekey: 'YOUR_SITE_KEY', // 🔴 Thay bằng site key thật
          callback: (response: string) => {
            this.resolved.emit(response); // emit token cho parent component
          },
        });
      }
    }, 500);
  }
}
