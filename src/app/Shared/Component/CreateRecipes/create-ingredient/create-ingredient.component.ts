import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngredientService } from '../../../../Service/Ingredient/ingredient.service';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';

@Component({
  selector: 'app-create-ingredient',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.scss'],
})
export class CreateIngredientComponent implements OnInit {
  ingredients = [
    { name: '', Quantity: '', unit: '', type: '', IngredientId: '' },
  ];
  Ingredient: any[] = [];
  IngredientId: string = '';
  Quantity: string = '';

  constructor(
    private ingredientService: IngredientService,
    private createRecipeDataService: CreateRecipeDataService
  ) {}

  ngOnInit(): void {
    this.onGetAllIngredient();
  }

  addIngredient() {
    this.ingredients.push({
      name: '',
      Quantity: '',
      unit: '',
      type: '',
      IngredientId: '',
    });
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
      (item) => item.ingredientName === ingredient.name
    );
    if (selectedIngredient) {
      ingredient.IngredientId = selectedIngredient.ingredientId;
      ingredient.Quantity = selectedIngredient.Quantity;
      ingredient.unit = selectedIngredient.unit;
      ingredient.type = selectedIngredient.type;
    } else {
      ingredient.IngredientId = '';
      ingredient.Quantity = '';
      ingredient.unit = '';
      ingredient.type = '';
    }
    this.logIngredients();
  }

  updateQuantity(index: number): void {
    console.log(
      `Ingredient ${index + 1} quantity updated:`,
      this.ingredients[index].Quantity
    );
    this.logIngredients();
  }

  logIngredients(): void {
    console.log('Current ingredients:', this.ingredients);
  }

  updateRecipeIngredients() {
    if (Array.isArray(this.ingredients)) {
      const ingredientDatas = this.ingredients.map((ingredient) => ({
        IngredientId: ingredient.IngredientId,
        Quantity: ingredient.Quantity,
      }));

      console.log('Updating recipe ingredients:', ingredientDatas);

      this.createRecipeDataService.updateRecipeIngredient(
        'recipeIngredient',
        ingredientDatas
      );

      console.log('Recipe ingredients have been updated in the service.');
    } else {
      console.error('Ingredients is not an array:', this.ingredients);
    }
  }
}
