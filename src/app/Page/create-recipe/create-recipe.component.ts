import { Component } from '@angular/core';
import { CreateIngredientComponent } from '../../Shared/Component/CreateRecipes/create-ingredient/create-ingredient.component';
import { CreateNutrientComponent } from '../../Shared/Component/CreateRecipes/create-nutrient/create-nutrient.component';
import { CreateInstructionComponent } from '../../Shared/Component/CreateRecipes/create-instruction/create-instruction.component';
import { CreateRecipetipComponent } from '../../Shared/Component/CreateRecipes/create-recipetip/create-recipetip.component';
import { CreateDetailsComponent } from '../../Shared/Component/CreateRecipes/create-details/create-details.component';
import { CreateCookingtoolComponent } from '../../Shared/Component/CreateRecipes/create-cookingtool/create-cookingtool.component';
import { CreateDescriptionComponent } from '../../Shared/Component/CreateRecipes/create-description/create-description.component';
import { CreateUploadimageComponent } from '../../Shared/Component/CreateRecipes/create-uploadimage/create-uploadimage.component';
import { CreateNameComponent } from '../../Shared/Component/CreateRecipes/create-name/create-name.component';
import { CreateSaveComponent } from '../../Shared/Component/CreateRecipes/create-save/create-save.component';
import { RecipeTipComponent } from '../../Shared/Component/recipe-tip/recipe-tip.component';
import { CreateRecipeDataService } from '../../Service/CreateRecipeData/create-recipe-data.service';
import { CreateRecipeService } from './../../Service/CreateRecipe/create-recipe.service';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    CreateSaveComponent,
    CreateUploadimageComponent,
    CreateIngredientComponent,
    CreateNutrientComponent,
    CreateInstructionComponent,
    CreateRecipetipComponent,
    CreateDetailsComponent,
    CreateCookingtoolComponent,
    CreateDescriptionComponent,
    CreateRecipetipComponent,
    CreateNameComponent,
    RecipeTipComponent,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  constructor(
    private createRecipeDataService: CreateRecipeDataService,
    private createRecipeService: CreateRecipeService
  ) {}

  saveRecipe() {
    const recipeData = this.createRecipeDataService.getRecipeData();
    const recipeTools = this.createRecipeDataService.getRecipeTool();
    const recipeIngredients =
      this.createRecipeDataService.getRecipeIngredient();
    const recipeNutrients = this.createRecipeDataService.getRecipeNutrient();
    const recipeInstructions = this.createRecipeDataService.getInstructions();
    const recipeRecipeTips = this.createRecipeDataService.getRecipeTips();

    this.createRecipeService.createRecipe(recipeData).subscribe({
      next: (response: any) => {
        const recipeId = response.data?.recipeId;
        if (recipeId) {
          console.log('Recipe ID:', recipeId);
          //console.log('Recipe Tools:', recipeTools);
          //this.saveRecipeTools(recipeId, recipeTools);
          console.log('check : ', recipeIngredients);
          this.saveRecipeIngredients(recipeId, recipeIngredients);
          //this.saveNutrients(recipeId, recipeNutrients);
          //this.saveInstrucions(recipeId, recipeInstructions);
          // this.saveRecipeTips(recipeId, recipeRecipeTips);
        } else {
          console.error('Failed to get recipe ID from response:', response);
        }
      },
      error: (error) => {
        console.error('Error creating recipe:', error);
      },
    });
  }

  saveRecipeTools(recipeId: number, tools: any[]) {
    if (!tools || tools.length === 0) {
      console.warn('No tools to save for this recipe.');
      return;
    }

    const recipeTools = tools.map((tool) => ({
      recipeId,
      cookingToolId: tool.cookingToolId,
    }));

    this.createRecipeService.addRecipeTool(recipeTools).subscribe({
      next: () => {
        console.log('Recipe tools saved successfully.');
      },
      error: (error) => {
        console.error('Error saving recipe tools:', error);
      },
    });
  }

  saveRecipeIngredients(recipeId: number, ingredients: any[] = []) {
    if (!ingredients || ingredients.length === 0) {
      console.warn('No ingredients to save.');
      return;
    }
    const recipeIngredients = ingredients.map((ingredient) => ({
      recipeId: recipeId,
      ingredientId: ingredient.ingredientId,
      quantity: ingredient.Quantity,
    }));

    this.createRecipeService.addRecipeIngredient(recipeIngredients).subscribe({
      next: (res: any) => {
        console.log('Recipe ingredients saved successfully.', res);
      },
      error: (error) => {
        console.error('Error saving recipe ingredients:', error);
      },
    });
  }

  saveNutrients(recipeId: number, nutrients: any[]) {
    if (!nutrients || nutrients.length === 0) {
      console.warn('No nutrients to save for this recipe.');
      return;
    }

    const recipeNutrients = nutrients.map((nutrients) => ({
      recipeId,
      nutrientId: nutrients.nutrientId,
      quantity: nutrients.quantity,
    }));

    this.createRecipeService.addRecipeNutrient(recipeNutrients).subscribe({
      next: (res: any) => {
        console.log('Recipe nutrients saved successfully.', res);
      },
      error: (error) => {
        console.error('Error saving recipe nutrients:', error);
      },
    });
  }

  saveInstrucions(recipeId: number, instructions: any[]) {
    if (!instructions || instructions.length === 0) {
      console.warn('No nutrients to save for this recipe.');
      return;
    }

    const recipeInstruction = instructions.map((instructions) => ({
      recipeId,
      stepNumber: instructions.stepNumber,
      instructionText: instructions.instructionText,
      cookingToolId: instructions.cookingToolId,
    }));

    this.createRecipeService.addRecipeInstruction(recipeInstruction).subscribe({
      next: (res: any) => {
        console.log('Recipe instructions saved successfully.', res);
      },
      error: (error) => {
        console.error('Error saving recipe instructions:', error);
      },
    });
  }

  saveRecipeTips(recipeId: number, recipeTips: any[]) {
    if (!recipeTips || recipeTips.length === 0) {
      console.warn('No recipeTips to save for this recipe.');
      return;
    }

    const recipeRecipeTips = recipeTips.map((recipeTips) => ({
      recipeId,
      actionType: recipeTips.actionType,
      actionText: recipeTips.actionText,
      title: recipeTips.Title,
    }));

    this.createRecipeService.addRecipeTip(recipeRecipeTips).subscribe({
      next: (res: any) => {
        console.log('Recipe recipeTips saved successfully.', res);
      },
      error: (error) => {
        console.error('Error saving recipeTips instructions:', error);
      },
    });
  }
}
