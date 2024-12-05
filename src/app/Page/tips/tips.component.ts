import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../Shared/Component/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { RecipeTitleComponent } from '../../Shared/Component/recipe-title/recipe-title.component';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [RecipeCardComponent, CommonModule, RecipeTitleComponent],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss',
})
export class TipsComponent {}
