import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-ingredient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-ingredient.component.html',
  styleUrl: './recipe-ingredient.component.scss',
})
export class RecipeIngredientComponent {
  @Input() title!: string;
  @Input() ingredientName!: string[];
}
