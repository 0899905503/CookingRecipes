import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrl: './recipe-main.component.scss',
})
export class RecipeMainComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() prepTime!: string;
  @Input() cookTime!: string;
  @Input() serves!: string;
  @Input() imageUrl!: string;
}
