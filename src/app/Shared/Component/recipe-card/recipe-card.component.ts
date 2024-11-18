import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() imageUrl!: string;
  @Input() description!: string;
  @Input() prepTime!: string;
  @Input() level!: string;
  @Input() serves!: string;
  @Input() title!: string;
}
// export interface Recipe {
//   imageUrl: string;
//   title: string;
//   description: string;
//   time: string;
//   difficulty: string;
//   servings: string;
// }
