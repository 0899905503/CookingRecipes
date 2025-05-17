import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateRecipeService } from '../../../../Service/CreateRecipe/create-recipe.service';
import { CategoryEnum } from '../../../Value/Enums/category.enum';
import { VeganEnum } from '../../../Value/Enums/vegan.enum';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-details',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-details.component.html',
  styleUrl: './create-details.component.scss',
})
export class CreateDetailsComponent {
  constructor(
    private createRecipeDataService: CreateRecipeDataService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
  currentLang: string = 'en';
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

  preptimes = [
    { en: 'EASY PREP', vi: 'DỄ' },
    { en: 'MEDIUM PREP', vi: 'TRUNG BÌNH' },
    { en: 'HARD PREP', vi: 'KHÓ' },
  ];
  categoriesList = [
    { labelEN: 'Vegan', labelVI: 'Chay', value: CategoryEnum.Vegan },
    {
      labelEN: 'Breakfast',
      labelVI: 'Bữa sáng',
      value: CategoryEnum.Breakfast,
    },
    { labelEN: 'Lunch', labelVI: 'Bữa trưa', value: CategoryEnum.Lunch },
    { labelEN: 'Dinner', labelVI: 'Bữa tối', value: CategoryEnum.Dinner },
    { labelEN: 'Dessert', labelVI: 'Tráng miệng', value: CategoryEnum.Dessert },
    {
      labelEN: 'Quick Bite',
      labelVI: 'Ăn nhanh',
      value: CategoryEnum.QuickBite,
    },
  ];

  vegetarianOptions = [
    { labelEN: 'Yes', labelVI: 'Có', value: VeganEnum.Yes },
    { labelEN: 'No', labelVI: 'Không', value: VeganEnum.No },
  ];

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
