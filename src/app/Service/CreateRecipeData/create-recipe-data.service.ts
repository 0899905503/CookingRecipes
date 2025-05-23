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
    DateCreated: '2025-1-1',
    Vegan: '',
  };

  recipeTool: any[] = [];
  recipeIngredient: any[] = [];
  recipeNutrient: any[] = [];
  recipeInstructions: any[] = [];
  recipeTips: any[] = [];

  updateRecipeData(key: string, value: any): void {
    this.recipeData[key] = value;
  }

  getRecipeData(): any {
    return this.recipeData;
  }

  updateRecipeTool(value: any[]): void {
    this.recipeTool = value || []; // Đảm bảo không bị null
    console.log('Updated Tools:', this.recipeTool);
  }

  getRecipeTool(): any[] {
    return this.recipeTool || []; // Đảm bảo trả về mảng rỗng nếu null
  }

  updateRecipeIngredient(value: any[]): void {
    if (!Array.isArray(value)) {
      console.error('Invalid data for ingredients. Expected an array:', value);
      return;
    }

    // In log toàn bộ dữ liệu trước khi lọc
    console.log('Original Ingredients:', value);

    // Lọc các giá trị không hợp lệ
    const validIngredients = value.filter(
      (ingredient) =>
        ingredient &&
        ingredient.ingredientId !== null &&
        ingredient.quantity !== null &&
        ingredient.ingredientId !== '' &&
        ingredient.quantity !== ''
    );

    // In log dữ liệu sau khi lọc
    console.log('Valid Ingredients:', validIngredients);

    this.recipeIngredient = validIngredients;

    // In log dữ liệu sau khi cập nhật
    console.log('Updated Ingredients in service:', this.recipeIngredient);
  }

  getRecipeIngredient(): any[] {
    return this.recipeIngredient || []; // Đảm bảo trả về mảng rỗng nếu null
  }

  updateRecipeNutrient(value: any[]): void {
    if (!Array.isArray(value)) {
      console.error('Invalid data for nutrients. Expected an array:', value);
      return;
    }

    // In log toàn bộ dữ liệu trước khi lọc
    console.log('Original Nutrients:', value);

    // Lọc các giá trị không hợp lệ
    const validNutrients = value.filter(
      (nutrient) =>
        nutrient &&
        nutrient.nutrientTypeId &&
        nutrient.quantity &&
        nutrient.nutrientTypeId !== '' &&
        nutrient.quantity !== ''
    );

    // In log dữ liệu sau khi lọc
    console.log('Valid Nutrients:', validNutrients);

    this.recipeNutrient = validNutrients;
    console.log('Updated Nutrients:', this.recipeNutrient);
  }

  getRecipeNutrient(): any[] {
    return this.recipeNutrient || []; // Đảm bảo trả về mảng rỗng nếu null
  }

  updateInstructions(value: any[]): void {
    if (!Array.isArray(value)) {
      console.error('Invalid data for instructions. Expected an array:', value);
      return;
    }

    // In log toàn bộ dữ liệu trước khi lọc
    console.log('Original Instructions:', value);

    // Lọc các giá trị không hợp lệ
    const validInstructions = value.filter(
      (instruction) =>
        instruction &&
        instruction.stepNumber &&
        instruction.instructionText &&
        instruction.stepNumber !== '' &&
        instruction.instructionText !== ''
    );

    // In log dữ liệu sau khi lọc
    console.log('Valid Instructions:', validInstructions);

    this.recipeInstructions = validInstructions;
    console.log('Updated Instructions:', this.recipeInstructions);
  }

  getInstructions(): any[] {
    return this.recipeInstructions || []; // Đảm bảo trả về mảng rỗng nếu null
  }

  updateRecipeTips(value: any[]): void {
    if (!Array.isArray(value)) {
      console.error('Invalid data for recipe tips. Expected an array:', value);
      return;
    }

    // In log toàn bộ dữ liệu trước khi lọc
    console.log('Original Tips:', value);

    // Lọc các giá trị không hợp lệ
    const validTips = value.filter(
      (tip) =>
        tip &&
        tip.actionType &&
        tip.actionText &&
        tip.title &&
        tip.actionType !== '' &&
        tip.actionText !== '' &&
        tip.title !== ''
    );

    // In log dữ liệu sau khi lọc
    console.log('Valid Tips:', validTips);

    this.recipeTips = validTips;
    console.log('Updated RecipeTips:', this.recipeTips);
  }
  getRecipeTips(): any[] {
    return this.recipeTips || [];
  }
}
