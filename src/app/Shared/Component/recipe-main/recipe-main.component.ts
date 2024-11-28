import { Component, Input } from '@angular/core';
import { ImagePaths } from '../../Value/Constant/imageConstants';
import { RecipeIngredientComponent } from '../recipe-ingredient/recipe-ingredient.component';

@Component({
  standalone: true,
  selector: 'app-recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrl: './recipe-main.component.scss',
  imports: [RecipeIngredientComponent],
})
export class RecipeMainComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() prepTime!: string;
  @Input() cookTime!: string;
  @Input() serves!: string;
  @Input() imageUrl!: string;
  @Input() view!: string;
  @Input() additionalText!: string;

  icCookTime = ImagePaths.icCookTime;
  icPrepTime = ImagePaths.icPrepTime;
  icServes = ImagePaths.icServes;
}
