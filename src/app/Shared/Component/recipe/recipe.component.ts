import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() recipename: string = '';
  @Input() time: string = '';
  @Input() level: string = '';
  @Input() serve: string = '';
}
