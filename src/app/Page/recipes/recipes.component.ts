import { Component, Input } from '@angular/core';
import { RecipeService } from '../../Service/Recipe/recipe-service.service';
import { RecipeMainComponent } from '../../Shared/Component/recipe-main/recipe-main.component';
import { CommonModule } from '@angular/common';
import { RecipeIngredientComponent } from '../../Shared/Component/recipe-ingredient/recipe-ingredient.component';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  //imports: [CommonModule],
  imports: [RecipeMainComponent, CommonModule, RecipeIngredientComponent],
})
export class RecipesComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() prepTime!: string;
  @Input() cookTime!: string;
  @Input() serves!: string;
  @Input() imageUrl!: string;
  @Input() totalView!: string;
  //Ingredient
  @Input() ingredientName!: string[];
  @Input() ingredientQuantity!: string;
  @Input() ingredientUnit!: string;
  Recipes: any[] = [];
  RecipesById: any = {};
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.onGetId(456);
  }

  getImagePath(imagePath: string): string {
    if (imagePath.startsWith('\\')) {
      return 'assets/images' + imagePath.replace('\\', '/');
    } else if (imagePath.includes('src\\assets')) {
      return imagePath.replace(/\\/g, '/').split('src/assets/')[1];
    }
    return imagePath;
  }

  onGetAllRecipe(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data) => {
        this.Recipes = data;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  onGetId(id: number): void {
    this.recipeService.getByIdRecipes(id).subscribe(
      (data) => {
        this.RecipesById = data;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }
  getIngredientDetails(recipeIngredients: any[]): string[] {
    return recipeIngredients.map(
      (ingredient) =>
        `${ingredient.ingredient.ingredientName} ${ingredient.quantity} (${ingredient.ingredient.unit})`
    );
  }
}
