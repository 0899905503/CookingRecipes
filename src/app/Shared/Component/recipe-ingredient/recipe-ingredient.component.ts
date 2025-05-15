import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe-ingredient',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './recipe-ingredient.component.html',
  styleUrl: './recipe-ingredient.component.scss',
})
export class RecipeIngredientComponent {
  @Input() title!: string;
  @Input() ingredientName!: string[];
}
