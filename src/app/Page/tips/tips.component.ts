import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../Shared/Component/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { RecipeTitleComponent } from '../../Shared/Component/recipe-title/recipe-title.component';
import { TipService } from '../../Service/Tip/tip-service.service';
import { DateUtils } from '../../Util/date-format-util';
import { RecipeTipsComponent } from '../../Shared/Component/recipe-tips/recipe-tips.component';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [
    RecipeCardComponent,
    CommonModule,
    RecipeTitleComponent,
    RecipeTipsComponent,
  ],
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent {
  Tip: any[] = [];
  NewRecipe: any[] = [];

  constructor(private tipService: TipService) {}

  ngOnInit(): void {
    this.onGetAllRecipe();
    this.onGetNewRecipe();
  }

  onGetAllRecipe(): void {
    this.tipService.getAllTips().subscribe(
      (data) => {
        this.Tip = data;
        this.Tip.forEach((tip) => {
          tip.dateCreated = DateUtils.formatDate(tip.dateCreated);
        });
      },
      (error) => {
        console.error('Error fetching tip:', error);
      }
    );
  }

  onGetNewRecipe(): void {
    this.tipService.getNewRecipes().subscribe(
      (data) => {
        this.NewRecipe = data;
      },
      (error) => {
        console.error('Error fetching recipes new:', error);
      }
    );
  }
}
