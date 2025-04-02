import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateRecipeDataService {
  recipeData: any = {
    Title: '',
    ImagePath: null,
    UserId: 1,
    Description: '',
    Servings: '',
    PrepTime: '',
    CookTime: '',
    CategoryId: '',
    DateCreated: '2025-01-01',
    Vegan: '',
  };

  recipeTool: any[] = [];

  recipeIngredient: any = {
    IngredientId: '',
    Quantity: '',
  };

  recipeNutrient: any = {
    NutrientId: '',
    Quantity: '',
  };

  instructions: any = {
    Title: '',
    Step: '',
    InstructionText: '',
    CookingToolId: '',
  };

  recipeTips: any = {
    Title: '',
    ActionText: '',
    ActionType: '',
  };

  updateRecipeData(key: string, value: any): void {
    this.recipeData[key] = value;
  }

  getRecipeData(): any {
    return this.recipeData;
  }

  updateRecipeTool(key: string, value: any[]): void {
    this.recipeTool = value;
  }

  getRecipeTool(): any[] {
    return this.recipeTool;
  }

  updateRecipeIngredient(key: string, value: any[]): void {
    this.recipeIngredient[key] = value;
  }

  getRecipeIngredient(): any[] {
    return this.recipeIngredient;
  }

  updateRecipeNutrient(key: string, value: any[]): void {
    this.recipeNutrient[key] = value;
  }

  getRecipeNutrient(): any[] {
    return this.recipeNutrient;
  }

  updateInstructions(key: string, value: any[]): void {
    this.instructions[key] = value;
  }

  getInstructions(): any[] {
    return this.recipeNutrient;
  }

  updateRecipeTips(key: string, value: any[]): void {
    this.recipeTips[key] = value;
  }

  getRecipeTips(): any[] {
    return this.recipeNutrient;
  }
}
