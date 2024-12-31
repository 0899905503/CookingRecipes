import { Component } from '@angular/core';
import {
  FormField,
  CreateRecipeComponent,
} from '../../Shared/Component/create-recipe/create-recipe.component';

@Component({
  selector: 'app-create-recipes',
  standalone: true,
  imports: [CreateRecipeComponent],
  templateUrl: './create-recipes.component.html',
  styleUrl: './create-recipes.component.scss',
})
export class CreateRecipesComponent {
  formIngredient: FormField[] = [
    {
      label: 'Ingredient',
      type: 'text',
      placeholder: 'Ingredient name',
      value: '',
    },
    {
      label: 'Quantity',
      type: 'number',
      placeholder: '',
      value: '',
    },
    {
      label: 'Unit',
      type: 'text',
      placeholder: '',
      value: '',
    },
    {
      label: 'Type',
      type: 'text',
      placeholder: '',
      value: '',
    },
  ];

  formCookingTool: FormField[] = [
    {
      label: '',
      type: 'text',
      placeholder: 'Cooking tool',
      value: '',
    },
  ];

  formNutrient: FormField[] = [
    {
      label: 'Nutrient',
      type: 'text',
      placeholder: 'Nutrient name',
      value: '',
    },
    {
      label: 'Quantity',
      type: 'number',
      placeholder: '',
      value: '',
    },
    {
      label: 'Unit',
      type: 'text',
      placeholder: '',
      value: '',
    },
  ];

  formDetails: FormField[] = [
    { label: 'Servings', type: 'text', placeholder: 'Serves', value: '' },
    {
      label: 'Cooking Time',
      type: 'text',
      placeholder: 'Cooking Time',
      value: '',
    },
    { label: 'Prep Time', type: 'text', placeholder: 'Prep Time', value: '' },
    {
      label: 'Category',
      type: 'select',
      options: ['Vegan', 'Non-Vegan'],
      value: 'Vegan',
    },
    {
      label: 'Is this a vegetarian recipe?',
      type: 'select',
      options: ['Yes', 'No'],
      value: 'Yes',
    },
  ];

  formInstruction: FormField[] = [
    {
      label: 'Title',
      type: 'text',
      placeholder: 'Instruction name',
      value: '',
    },
    {
      label: 'Step',
      type: 'number',
      placeholder: 'Step Number',
      value: '',
    },
    {
      label: 'Instruction text',
      type: 'text',
      placeholder: 'Instruction detail',
      value: '',
    },
    {
      label: 'Cooking Tool',
      type: 'select',
      options: ['1', '2', '3'],
      value: '1',
    },
  ];

  formCookingTip: FormField[] = [
    {
      label: 'Title',
      type: 'text',
      placeholder: 'Tip name',
      value: '',
    },
    {
      label: 'Action Text',
      type: 'text',
      placeholder: 'Action text',
      value: '',
    },
    {
      label: 'Action Type',
      type: 'select',
      options: ['Do', 'Don`t'],
      value: 'Do',
    },
  ];
}
