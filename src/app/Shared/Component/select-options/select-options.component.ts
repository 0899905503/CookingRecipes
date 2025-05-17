import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-options',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './select-options.component.html',
  styleUrl: './select-options.component.scss',
})
export class SelectOptionsComponent {
  @Input() imageUrl: string = ''; // Đường dẫn ảnh
  @Input() description: string = ''; // Mô tả
}
