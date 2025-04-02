import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NutrientService } from '../../../../Service/Nutrient/nutrient.service';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';

@Component({
  selector: 'app-create-nutrient',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-nutrient.component.html',
  styleUrl: './create-nutrient.component.scss',
})
export class CreateNutrientComponent {
  Nutrient: any[] = [];
  nutrients = [{ name: '', quantity: '', unit: '', nutrientTypeId: '' }];

  addIngredient() {
    this.nutrients.push({
      name: '',
      quantity: '',
      unit: '',
      nutrientTypeId: '',
    });
  }
  constructor(
    private nutrientService: NutrientService,
    private createRecipeDataService: CreateRecipeDataService
  ) {}

  ngOnInit(): void {
    this.onGetAllNutrient();
  }

  onGetAllNutrient(): void {
    this.nutrientService.getAllNuntrients().subscribe(
      (data) => {
        this.Nutrient = data;
      },
      (error) => {
        console.error('Error fetching ingredients:', error);
      }
    );
  }

  onNutrientChange(nutrient: any): void {
    const selectedNutrient = this.Nutrient.find(
      (item) => item.nutrientTypeName === nutrient.name
    );
    if (selectedNutrient) {
      nutrient.nutrientTypeId = selectedNutrient.nutrientTypeId;
      nutrient.unit = selectedNutrient.unit;
    } else {
      nutrient.nutrientTypeId = '';
      nutrient.unit = '';
    }
    this.logNutrients();
  }

  logNutrients(): void {
    console.log('Current nutrients:', this.nutrients);
  }

  updateRecipeNutrients() {
    const nutrientData = this.nutrients.map((nutrient) => ({
      name: nutrient.name,
      quantity: nutrient.quantity,
    }));

    console.log('Updating recipe nutrients:', nutrientData);

    // Update via service
    this.createRecipeDataService.updateRecipeNutrient(
      'Nutrients',
      nutrientData
    );
  }
}
