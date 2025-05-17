import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe-tip',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './recipe-tip.component.html',
  styleUrls: ['./recipe-tip.component.scss'],
})
export class RecipeTipComponent {
  @Input() actionType!: string;
  @Input() actionType1!: string;
  @Input() description!: string[];
  @Input() description1!: string[];
  @Input() title!: string[];
  @Input() title1!: string[];
}
