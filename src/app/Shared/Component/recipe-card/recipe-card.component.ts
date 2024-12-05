import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() imageUrl!: string;
  @Input() description!: string;
  @Input() prepTime!: string;
  @Input() cookTime!: string;
  @Input() serves!: string;
  @Input() title!: string;
  @Input() totalView!: string;
  @Input() unit1!: string;
  @Input() unit2!: string;
  @Input() isVegan: boolean = false;
}
// export interface Recipe {
//   imageUrl: string;
//   title: string;
//   description: string;
//   time: string;
//   difficulty: string;
//   servings: string;
// }
