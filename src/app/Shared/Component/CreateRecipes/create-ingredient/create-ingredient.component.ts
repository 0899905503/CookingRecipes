import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-ingredient',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-ingredient.component.html',
  styleUrl: './create-ingredient.component.scss',
})
export class CreateIngredientComponent {
  ingredients = [{ name: '', quantity: '', unit: '', type: '' }];

  addIngredient() {
    this.ingredients.push({ name: '', quantity: '', unit: '', type: '' });
  }
}
