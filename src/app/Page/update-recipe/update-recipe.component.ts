import { Component, OnInit } from '@angular/core';
import { CreateCookingtoolComponent } from '../../Shared/Component/CreateRecipes/create-cookingtool/create-cookingtool.component';
import { CreateDescriptionComponent } from '../../Shared/Component/CreateRecipes/create-description/create-description.component';
import { CreateDetailsComponent } from '../../Shared/Component/CreateRecipes/create-details/create-details.component';
import { CreateIngredientComponent } from '../../Shared/Component/CreateRecipes/create-ingredient/create-ingredient.component';
import { CreateInstructionComponent } from '../../Shared/Component/CreateRecipes/create-instruction/create-instruction.component';
import { CreateNameComponent } from '../../Shared/Component/CreateRecipes/create-name/create-name.component';
import { CreateNutrientComponent } from '../../Shared/Component/CreateRecipes/create-nutrient/create-nutrient.component';
import { CreateRecipetipComponent } from '../../Shared/Component/CreateRecipes/create-recipetip/create-recipetip.component';
import { CreateSaveComponent } from '../../Shared/Component/CreateRecipes/create-save/create-save.component';
import { CreateUploadimageComponent } from '../../Shared/Component/CreateRecipes/create-uploadimage/create-uploadimage.component';
import { RecipeService } from '../../Service/Recipe/recipe-service.service';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CreateSaveComponent,
    CreateUploadimageComponent,
    CreateIngredientComponent,
    CreateNutrientComponent,
    CreateInstructionComponent,
    CreateRecipetipComponent,
    CreateDetailsComponent,
    CreateCookingtoolComponent,
    CreateDescriptionComponent,
    CreateNameComponent,
  ],
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.scss'],
})
export class UpdateRecipeComponent implements OnInit {
  imageFile: File | null = null;
  imagePreviewUrl: string | null = null;

  recipeDetails: any = {
    title: '',
    titleVI: '',
    description: '',
    descriptionVI: '',
    cookTime: 0,
    servings: 0,
    prepTime: '',
    imagePath: '',
    status: 'Pending',
    vegan: false,
    categoryId: 0,
  };

  recipeIngredients: any[] = [];
  recipeCookingTools: any[] = [];
  recipeNutrients: any[] = [];
  recipeInstructions: any[] = [];
  recipeTips: any[] = [];

  recipeIds: number = 0;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('recipeId');
    if (recipeId) {
      this.recipeIds = +recipeId;
      this.loadRecipeData(this.recipeIds);
    }
  }

  loadRecipeData(recipeId: number): void {
    this.recipeService.getByIdRecipes(recipeId).subscribe((data) => {
      this.recipeDetails = {
        title: data.title || '',
        titleVI: data.titleVI || '',
        description: data.description || '',
        descriptionVI: data.descriptionVI || '',
        cookTime: data.cookTime ?? 0,
        servings: data.servings ?? 0,
        prepTime: data.prepTime || '',
        status: data.status || 'Pending',
        imagePath: data.imagePath || '',
        vegan: data.vegan ?? false,
        categoryId: data.categoryId ?? null,
      };
      this.imagePreviewUrl = data.imagePath || '';
      this.recipeIngredients = data.recipeIngredients || [];
      this.recipeCookingTools = data.recipeTools || [];
      this.recipeNutrients = data.recipeNutrient || [];
      this.recipeInstructions = data.instructions || [];
      this.recipeTips = data.recipeTip || [];
    });
  }

  onTitleChange(newTitle: string): void {
    this.recipeDetails.title = newTitle;
  }
  onTitleVIChange(newTitleVI: string): void {
    this.recipeDetails.titleVI = newTitleVI;
  }
  onDescriptionChange(newDesc: string): void {
    this.recipeDetails.description = newDesc;
  }
  onDescriptionVIChange(newDescVI: string): void {
    this.recipeDetails.descriptionVI = newDescVI;
  }
  onCookTimeChange(newCookTime: any): void {
    this.recipeDetails.cookTime = Number(newCookTime);
  }
  onPrepTimeChange(newPrepTime: string): void {
    this.recipeDetails.prepTime = newPrepTime;
  }
  onServingsChange(newServings: any): void {
    this.recipeDetails.servings = Number(newServings);
  }
  onStatusChange(newStatus: string): void {
    this.recipeDetails.status = newStatus;
  }
  onVeganChange(isVegan: any): void {
    this.recipeDetails.vegan = this.toBoolean(isVegan);
  }
  onCategoryChange(newCategoryId: number): void {
    this.recipeDetails.categoryId = newCategoryId;
  }
  onImageChange(file: File): void {
    this.imageFile = file;
    this.imagePreviewUrl = URL.createObjectURL(file);
    this.recipeDetails.imagePath = this.imagePreviewUrl || '';
  }
  onIngredientsChange(newIngredients: any[]): void {
    this.recipeIngredients = newIngredients;
  }
  onCookingToolsChange(newTools: any[]): void {
    this.recipeCookingTools = newTools;
  }
  onNutrientsChange(newNutrients: any[]): void {
    this.recipeNutrients = newNutrients;
  }
  onInstructionsChange(newInstructions: any[]): void {
    this.recipeInstructions = newInstructions;
  }
  onRecipeTipsChange(newTips: any[]): void {
    this.recipeTips = newTips;
  }
  onDetailsChange(updatedDetails: any): void {
    // Cập nhật đồng bộ các trường chi tiết khi component con emit
    this.recipeDetails = {
      ...this.recipeDetails,
      cookTime: updatedDetails.cookTime ?? this.recipeDetails.cookTime,
      servings: updatedDetails.servings ?? this.recipeDetails.servings,
      prepTime: updatedDetails.prepTime || this.recipeDetails.prepTime,
      status: updatedDetails.status || this.recipeDetails.status,
      vegan: updatedDetails.vegan ?? this.recipeDetails.vegan,
      categoryId: updatedDetails.categoryId ?? this.recipeDetails.categoryId,
      imagePath: updatedDetails.imagePath || this.recipeDetails.imagePath,
    };
  }

  updateRecipe(recipeId: number): void {
    const recipeDataToSend = {
      title: this.recipeDetails.title || '',
      titleVI: this.recipeDetails.titleVI || '',
      description: this.recipeDetails.description || '',
      descriptionVI: this.recipeDetails.descriptionVI || '',
      cookTime: Number(this.recipeDetails.cookTime) || 0, // ép kiểu number
      servings: Number(this.recipeDetails.servings) || 0, // ép kiểu number
      prepTime: this.recipeDetails.prepTime || '',
      imagePath: this.recipeDetails.imagePath || '',
      status: 'Pending',
      vegan: this.toBoolean(this.recipeDetails.vegan), // ép kiểu boolean
      categoryId: Number(this.recipeDetails.categoryId) || 0,
    };
    this.recipeService
      .updateRecipeById(recipeId, recipeDataToSend)
      .subscribe(() => {
        console.log('Recipe updated successfully');
      });

    this.recipeService
      .updateRecipeIngredientByRecipeId(recipeId, this.recipeIngredients)
      .subscribe(() => {
        console.log('Ingredients updated');
      });

    this.recipeService
      .updateRecipeNutrientByRecipeId(recipeId, this.recipeNutrients)
      .subscribe(() => {
        console.log('Nutrients updated');
      });

    this.recipeService
      .updateInstructionbyRecipeId(recipeId, this.recipeInstructions)
      .subscribe(() => {
        console.log('Instructions updated');
      });

    this.recipeService
      .updateRecipeTipByRecipeId(recipeId, this.recipeTips)
      .subscribe(() => {
        console.log('Recipe tips updated');
      });

    this.recipeService
      .updateRecipeToolByReipceId(recipeId, this.recipeCookingTools)
      .subscribe(() => {
        console.log('Cooking tools updated');
      });
  }
  toBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  }
}
