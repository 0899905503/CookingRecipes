import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-details.component.html',
  styleUrl: './create-details.component.scss',
})
export class CreateDetailsComponent {
  details = {
    servings: '',
    cookingTime: '',
    prepTime: 'PrepTime',
    category: 'Vegan',
    isVegetarian: 'Yes',
  };

  categories = [
    'Vegan',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'QuickBite',
  ];
  preptimes = ['EASY PREP', 'MEDIUM PREP', 'HARD PREP'];
  vegetarianOptions = ['Yes', 'No'];
}
