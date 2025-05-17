import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngredientService } from '../../../../Service/Ingredient/ingredient.service';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-ingredient',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.scss'],
})
export class CreateIngredientComponent implements OnInit {
  ingredients = [
    {
      ingredientName: '',
      quantity: 1,
      unit: '',
      type: '',
      ingredientId: null,
      ingredientNameVI: '',
      unitVI: '',
      typeVI: '',
    },
  ];
  Ingredient: any[] = [];
  //translate
  currentLang: string = 'en';

  constructor(
    private ingredientService: IngredientService,
    private createRecipeDataService: CreateRecipeDataService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void {
    this.onGetAllIngredient();
  }

  addIngredient() {
    this.ingredients.push({
      ingredientName: '',
      quantity: 1,
      unit: '',
      type: '',
      ingredientId: null,
      ingredientNameVI: '',
      unitVI: '',
      typeVI: '',
    });
    this.updateRecipeIngredients();
  }

  onGetAllIngredient(): void {
    this.ingredientService.getAllIngredients().subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.Ingredient = data;
        } else {
          console.error('API did not return an array:', data);
          this.Ingredient = [];
        }
      },
      (error) => {
        console.error('Error fetching ingredients:', error);
      }
    );
  }

  onIngredientChange(ingredient: any): void {
    const selectedIngredient = this.Ingredient.find(
      (item) => item.ingredientName === ingredient.ingredientName
    );
    if (selectedIngredient) {
      ingredient.ingredientId = selectedIngredient.ingredientId;
      if (this.currentLang === 'vi') {
        ingredient.unit = selectedIngredient.unitVI;
        ingredient.type = selectedIngredient.typeVI;
      } else {
        ingredient.unit = selectedIngredient.unit;
        ingredient.type = selectedIngredient.type;
      }
    } else {
      ingredient.ingredientId = '';
      ingredient.unit = '';
      ingredient.type = '';
    }

    // Log dữ liệu sau khi thay đổi
    console.log('Ingredient updated:', ingredient);
    this.logIngredients();
  }

  updateQuantity(index: number): void {
    console.log(
      `Ingredient ${index + 1} quantity updated:`,
      this.ingredients[index].quantity
    );
    this.logIngredients();
  }

  logIngredients(): void {
    console.log('Current ingredients:', this.ingredients);
  }

  updateRecipeIngredients(): void {
    if (Array.isArray(this.ingredients)) {
      console.log('Ingredients before update:', this.ingredients);

      const ingredientDatas = this.ingredients.map((ingredient) => ({
        ingredientId: ingredient.ingredientId || null,
        quantity: ingredient.quantity || null,
      }));

      console.log('Mapped ingredients for update:', ingredientDatas);

      this.createRecipeDataService.updateRecipeIngredient(ingredientDatas);

      console.log('Recipe ingredients have been updated in the service.');
    } else {
      console.error('Ingredients is not an array:', this.ingredients);
    }
  }
}
