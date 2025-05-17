import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe-title',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './recipe-title.component.html',
  styleUrl: './recipe-title.component.scss',
})
export class RecipeTitleComponent {
  @Input() title1!: string;
  @Input() title2!: string;
  @Input() title3!: string;
  @Input() description1!: string;
  @Input() description2!: string;
  @Input() description3!: string;
}
