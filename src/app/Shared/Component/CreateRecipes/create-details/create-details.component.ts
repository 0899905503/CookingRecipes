import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateRecipeService } from '../../../../Service/CreateRecipe/create-recipe.service';
import { CategoryEnum } from '../../../Value/Enums/category.enum';
import { VeganEnum } from '../../../Value/Enums/vegan.enum';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-details',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-details.component.html',
  styleUrl: './create-details.component.scss',
})
export class CreateDetailsComponent {
  constructor(private createRecipeDataService: CreateRecipeDataService) {}

  Servings: string = '';
  CookTime: string = '';
  PrepTime: string = '';
  CategoryId = CategoryEnum.Vegan;
  Vegan = VeganEnum.No;

  categories = Object.keys(CategoryEnum)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key.replace('_', ' '),
      value: (CategoryEnum as any)[key],
    }))
    .slice(0, 6); // Chỉ lấy 6 phần tử đầu tiên

  preptimes = ['EASY PREP', 'MEDIUM PREP', 'HARD PREP'];
  vegetarianOptions = Object.keys(VeganEnum)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key.replace('_', ' '),
      value: (VeganEnum as any)[key],
    }));

  updateDetails() {
    console.log('Updating details:', {
      Servings: this.Servings,
      CookTime: this.CookTime,
      PrepTime: this.PrepTime,
      CategoryId: this.CategoryId,
      Vegan: this.Vegan,
    });

    this.createRecipeDataService.updateRecipeData('Servings', this.Servings);
    this.createRecipeDataService.updateRecipeData('CookTime', this.CookTime);
    this.createRecipeDataService.updateRecipeData('PrepTime', this.PrepTime);
    this.createRecipeDataService.updateRecipeData(
      'CategoryId',
      this.CategoryId
    );
    this.createRecipeDataService.updateRecipeData('Vegan', this.Vegan);
  }
}
