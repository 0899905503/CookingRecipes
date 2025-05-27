import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateRecipeService } from '../../../../Service/CreateRecipe/create-recipe.service';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-recipetip',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-recipetip.component.html',
  styleUrl: './create-recipetip.component.scss',
})
export class CreateRecipetipComponent {
  constructor(
    private createRecipeService: CreateRecipeService,
    private createRecipeDataService: CreateRecipeDataService
  ) {}

  @Input() recipetipsInput: any[] = [];

  @Output() recipetipsChange = new EventEmitter<any[]>();

  recipetips = [
    {
      title: '',
      actionText: '',
      actionType: '',
      titleVI: '',
      actionTextVI: '',
    },
  ];
  loading = false;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipetipsInput'] && this.recipetipsInput) {
      this.recipetips = [...this.recipetipsInput]; // Clone để tránh mutation từ bên ngoài
    }
  }

  CreateRecipeTips(): void {
    if (
      this.recipetips.some(
        (inst) => !inst.title || !inst.actionText || !inst.actionType
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
    this.recipetips.push({
      title: '',
      actionText: '',
      actionType: '',
      titleVI: '',
      actionTextVI: '',
    });
    this.updateRecipeTip();
  }

  updateRecipeTip() {
    const recipeTipData = this.recipetips.map((recipetip) => ({
      title: recipetip.title,
      actionText: recipetip.actionText,
      actionType: recipetip.actionType,
      titleVI: recipetip.titleVI,
      actionTextVI: recipetip.actionTextVI,
    }));

    console.log('Updating recipe tip:', recipeTipData);
    // Emit dữ liệu cho component cha
    this.recipetipsChange.emit(recipeTipData);
    // Update via service
    this.createRecipeDataService.updateRecipeTips(recipeTipData);
  }
  logRecipeTips() {
    console.log('Current recipe tips:', this.recipetips);
  }
}
