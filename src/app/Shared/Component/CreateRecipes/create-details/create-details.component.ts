import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { CategoryEnum } from '../../../Value/Enums/category.enum';
import { VeganEnum } from '../../../Value/Enums/vegan.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-details',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-details.component.html',
  styleUrls: ['./create-details.component.scss'],
})
export class CreateDetailsComponent implements OnInit {
  @Input() detailsData: any;

  @Output() detailsChange = new EventEmitter<any>();

  currentLang: string = 'en';
  Servings: number = 0;
  CookTime: number = 0;
  PrepTime: string = '';
  CategoryId: number = 0;
  Vegan: boolean = false;

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

  preptimes = [
    { en: 'EASY PREP', vi: 'DỄ' },
    { en: 'MEDIUM PREP', vi: 'TRUNG BÌNH' },
    { en: 'HARD PREP', vi: 'KHÓ' },
  ];

  vegetarianOptions = [
    { labelEN: 'Yes', labelVI: 'Có', value: VeganEnum.Yes },
    { labelEN: 'No', labelVI: 'Không', value: VeganEnum.No },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detailsData'] && this.detailsData) {
      this.Servings = this.detailsData.servings ?? 0;
      this.CookTime = this.detailsData.cookTime ?? 0;
      this.PrepTime = this.detailsData.prepTime || '';
      this.CategoryId = this.detailsData.categoryId ?? 0;
      this.Vegan = this.detailsData.vegan ?? false;
    }
  }

  constructor(
    private createRecipeDataService: CreateRecipeDataService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void {
    // Lấy dữ liệu hiện tại từ service và gán cho biến local
    const recipeDetails = this.createRecipeDataService.getRecipeData();
    if (recipeDetails) {
      this.Servings = recipeDetails.Servings ?? 0;
      this.CookTime = recipeDetails.CookTime ?? 0;
      this.PrepTime = recipeDetails.PrepTime || '';
      this.CategoryId = recipeDetails.CategoryId ?? 0;
      this.Vegan = recipeDetails.Vegan ?? false;
    }
  }

  updateDetails() {
    // Gọi service update nội bộ
    this.createRecipeDataService.updateRecipeData('Servings', this.Servings);
    this.createRecipeDataService.updateRecipeData('CookTime', this.CookTime);
    this.createRecipeDataService.updateRecipeData('PrepTime', this.PrepTime);
    this.createRecipeDataService.updateRecipeData(
      'CategoryId',
      this.CategoryId
    );
    this.createRecipeDataService.updateRecipeData('Vegan', this.Vegan);

    // Phát sự kiện ra component cha
    this.detailsChange.emit({
      servings: this.Servings,
      cookTime: this.CookTime,
      prepTime: this.PrepTime,
      categoryId: this.CategoryId,
      vegan: VeganEnum.No,
    });
  }
}
