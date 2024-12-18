import { NotFoundPageComponent } from './../../Shared/not-found-page/not-found-page.component';
// RecipesComponent
import { Component } from '@angular/core';
import { RecipeService } from '../../Service/Recipe/recipe-service.service';
import { RecipeMainComponent } from '../../Shared/Component/recipe-main/recipe-main.component';
import { CommonModule } from '@angular/common';
import { RecipeIngredientComponent } from '../../Shared/Component/recipe-ingredient/recipe-ingredient.component';
import { RecipeTipComponent } from '../../Shared/Component/recipe-tip/recipe-tip.component';
import { RecipeInstructionComponent } from '../../Shared/Component/recipe-instruction/recipe-instruction.component';
import { RecipeCardComponent } from '../../Shared/Component/recipe-card/recipe-card.component';
import { ActivatedRoute } from '@angular/router';

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
    RecipeCardComponent,
    NotFoundPageComponent,
  ],
})
export class RecipesComponent {
  RecipesById: any = {};
  doTips: string[] = [];
  dontTips: string[] = [];
  stepTitle: string[] = [];
  steps: string[] = [];
  titleTipDo: string[] = [];
  titleTipDont: string[] = [];
  SimilarRecipes: any[] = [];
  recipeIds!: number;
  notFound: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recipeIds = Number(params.get('recipeId'));
      console.log('Recipe ID received from URL:', this.recipeIds);
    });
    if (this.recipeIds) {
      this.onGetId(this.recipeIds);
      this.onGetSimilar(this.recipeIds);
    } else {
      this.notFound = true;
      console.log('recipeId null');
    }
  }

  onRecipeSelected(id: number): void {
    this.recipeIds = id;
    this.onGetId(this.recipeIds);
    this.onGetSimilar(this.recipeIds);
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

        const instructions = this.RecipesById.instructions || [];
        if (instructions.length > 0) {
          this.stepTitle = instructions.map(
            (instruction: any) =>
              `Step ${instruction.stepNumber}:  ${instruction.title}`
          );
        }
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  async onGetSimilar(id: number) {
    try {
      const data = await this.recipeService.getSimilarRecipes(id).toPromise();
      if (data) {
        this.SimilarRecipes = data.map((recipeData: any) => {
          return {
            recipeId: recipeData.recipeId,
            sharedIngredientsCount: recipeData.sharedIngredientsCount,
            recipeDetails: recipeData.recipe[0],
            isVegan: recipeData.recipe[0].vegan,
          };
        });
        console.log('Similar recipes fetched successfully');
      } else {
        console.warn('No similar recipes found');
      }
    } catch (error) {
      console.error('Error fetching similar recipes:', error);
    }
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
    return instructions.map((instruction) => instruction.instructionText);
  }
}
