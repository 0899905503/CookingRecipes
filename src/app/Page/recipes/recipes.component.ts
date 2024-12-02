import { Component } from '@angular/core';
import { RecipeService } from '../../Service/Recipe/recipe-service.service';
import { RecipeMainComponent } from '../../Shared/Component/recipe-main/recipe-main.component';
import { CommonModule } from '@angular/common';
import { RecipeIngredientComponent } from '../../Shared/Component/recipe-ingredient/recipe-ingredient.component';
import { RecipeTipComponent } from '../../Shared/Component/recipe-tip/recipe-tip.component';
import { RecipeInstructionComponent } from '../../Shared/Component/recipe-instruction/recipe-instruction.component';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  imports: [
    RecipeMainComponent,
    CommonModule,
    RecipeIngredientComponent,
    RecipeTipComponent,
    RecipeInstructionComponent,
  ],
})
export class RecipesComponent {
  RecipesById: any = {};
  doTips: string[] = [];
  dontTips: string[] = [];
  steps: string[] = [];
  titleTipDo: string[] = [];
  titleTipDont: string[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.onGetId(456);
    this.steps = this.getInstructionDetails(this.RecipesById.instructions);
  }

  onGetId(id: number): void {
    this.recipeService.getByIdRecipes(id).subscribe(
      (data) => {
        this.RecipesById = data || {};
        const tips = this.RecipesById.recipeTip || [];

        if (tips.length > 0) {
          this.doTips = tips
            .filter((tip: any) => tip.actionType === true)
            .map((tip: any) => tip.actionText);
          this.dontTips = tips
            .filter((tip: any) => tip.actionType === false)
            .map((tip: any) => tip.actionText);
          this.titleTipDo = tips
            .filter((tip: any) => tip.actionType === true)
            .map((tip: any) => `${tip.title}:`);
          this.titleTipDont = tips
            .filter((tip: any) => tip.actionType === false)
            .map((tip: any) => `${tip.title}:`);
        } else {
          console.warn('No recipe tips available.');
        }
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  getIngredientDetails(recipeIngredients: any[]): string[] {
    if (!recipeIngredients || recipeIngredients.length === 0) {
      return ['No ingredients available.'];
    }
    return recipeIngredients.map(
      (ingredient) =>
        `${ingredient.ingredient.ingredientName}: ${ingredient.quantity} (${ingredient.ingredient.unit})`
    );
  }

  getCookingToolDetails(recipeTools: any[]): string[] {
    if (!recipeTools || recipeTools.length === 0) {
      return ['No cooking tools available.'];
    }
    return recipeTools.map((tool) => tool.cookingTool.cookingToolName);
  }

  getNutrientDetails(recipeNutrient: any[]): string[] {
    if (!recipeNutrient || recipeNutrient.length === 0) {
      return ['No nutrient information available.'];
    }
    return recipeNutrient.map(
      (nutrientType) =>
        `${nutrientType.nutrientType.nutrientTypeName}: ~ ${nutrientType.quantity} (${nutrientType.nutrientType.unit})`
    );
  }

  getInstructionDetails(instructions: any[]): string[] {
    if (!instructions || instructions.length === 0) {
      return ['No instructions available.'];
    }
    return instructions.map(
      (instruction) =>
        `Step ${instruction.stepNumber}: ${instruction.instructionText}`
    );
  }
}
