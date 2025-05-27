import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
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
export class CreateIngredientComponent implements OnInit, OnChanges {
  @Input() ingredientsInput: any[] = [];

  @Output() ingredientsChange = new EventEmitter<any[]>();

  ingredients = [
    {
      ingredientId: null,
      quantity: 1,
    },
  ];
  Ingredient: any[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['ingredientsInput'] &&
      changes['ingredientsInput'].currentValue !== undefined
    ) {
      this.ingredients = JSON.parse(
        JSON.stringify(changes['ingredientsInput'].currentValue)
      );
      this.updateRecipeIngredients();
    }
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

  addIngredient() {
    this.ingredients.push({
      ingredientId: null,
      quantity: 1,
    });
    this.updateRecipeIngredients();
  }

  onIngredientChange(ingredient: any): void {
    this.updateRecipeIngredients();
  }

  updateQuantity(index: number): void {
    this.updateRecipeIngredients();
  }

  getUnit(ingredient: any): string {
    const found = this.Ingredient.find(
      (item) => item.ingredientId === ingredient.ingredientId
    );
    if (!found) return '';
    return this.currentLang === 'vi' ? found.unitVI : found.unit;
  }

  getType(ingredient: any): string {
    const found = this.Ingredient.find(
      (item) => item.ingredientId === ingredient.ingredientId
    );
    if (!found) return '';
    return this.currentLang === 'vi' ? found.typeVI : found.type;
  }

  updateRecipeIngredients(): void {
    if (Array.isArray(this.ingredients)) {
      const ingredientDatas = this.ingredients.map((ingredient) => ({
        ingredientId: ingredient.ingredientId || null,
        quantity: ingredient.quantity || null,
      }));
      this.createRecipeDataService.updateRecipeIngredient(ingredientDatas);
    }
  }

  onUserInputChange(updatedIngredients: any[]) {
    this.ingredientsChange.emit(updatedIngredients);
  }
}
