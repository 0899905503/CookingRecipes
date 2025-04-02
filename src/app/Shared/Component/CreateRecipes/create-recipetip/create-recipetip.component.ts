import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateRecipeService } from '../../../../Service/CreateRecipe/create-recipe.service';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';

@Component({
  selector: 'app-create-recipetip',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-recipetip.component.html',
  styleUrl: './create-recipetip.component.scss',
})
export class CreateRecipetipComponent {
  constructor(
    private createRecipeService: CreateRecipeService,
    private createRecipeDataService: CreateRecipeDataService
  ) {}
  recipetips = [{ title: '', actiontext: '', actiontype: '' }];
  loading = false;

  CreateRecipeTips(): void {
    if (
      this.recipetips.some(
        (inst) => !inst.title || !inst.actiontext || !inst.actiontype
      )
    ) {
      alert('Please fill in all fields for each recipe tip.');
      return;
    }

    this.loading = true;

    this.createRecipeService.addRecipeTip(this.recipetips).subscribe({
      next: (response) => {
        console.log('Recipe tips created successfully:', response);
        alert('Recipe tips created successfully!');
      },
      error: (error) => {
        console.error('Error creating recipe tips:', error);
        alert('Failed to create recipe tips. Please try again.');
        this.loading = false;
      },
    });
  }

  addRecipeTip() {
    this.recipetips.push({ title: '', actiontext: '', actiontype: '' });
  }

  updateRecipeTip() {
    const recipeTipData = this.recipetips.map((recipetip) => ({
      name: recipetip.title,
      text: recipetip.actiontext,
      type: recipetip.actiontype,
    }));

    console.log('Updating recipe tip:', recipeTipData);

    // Update via service
    this.createRecipeDataService.updateRecipeTips('RecipeTip', recipeTipData);
  }
  logRecipeTips() {
    console.log('Current recipe tips:', this.recipetips);
  }
}
