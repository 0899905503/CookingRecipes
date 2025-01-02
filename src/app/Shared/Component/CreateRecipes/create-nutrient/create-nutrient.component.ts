import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-nutrient',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-nutrient.component.html',
  styleUrl: './create-nutrient.component.scss',
})
export class CreateNutrientComponent {
  nutrients = [{ name: '', quantity: '', unit: '', type: '' }];

  addIngredient() {
    this.nutrients.push({ name: '', quantity: '', unit: '', type: '' });
  }
}
