import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../Shared/Component/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { RecipeTitleComponent } from '../../Shared/Component/recipe-title/recipe-title.component';
import { TipService } from '../../Service/Tip/tip-service.service';
import { DateUtils } from '../../Util/date-format-util';
import { RecipeTipsComponent } from '../../Shared/Component/recipe-tips/recipe-tips.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [
    RecipeCardComponent,
    CommonModule,
    RecipeTitleComponent,
    RecipeTipsComponent,
    TranslateModule,
  ],
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent {
  Tip: any[] = [];
  NewRecipe: any[] = [];
  currentLang: string = 'en';
  selectedMenu: string = 'ALL';

  constructor(
    private tipService: TipService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void {
    this.onGetAllRecipe();
    this.onGetNewRecipe();
  }

  onGetAllRecipe(): void {
    this.tipService.getAllTips().subscribe(
      (data) => {
        this.Tip = data;
        if (this.Tip.length > 0) {
          this.Tip.map((item: any) => {
            item.dateCreated =
              this.currentLang === 'vi'
                ? DateUtils.formatDateVI(item.dateCreated)
                : DateUtils.formatDate(item.dateCreated);
          });
        }
      },
      (error) => {
        console.error('Error fetching tip:', error);
      }
    );
  }

  onGetNewRecipe(): void {
    this.tipService.getNewRecipes().subscribe(
      (data) => {
        this.NewRecipe = data.filter(
          (item: any) => item.status !== 'Pending' && item.status !== 'Rejected'
        );
      },
      (error) => {
        console.error('Error fetching recipes new:', error);
      }
    );
  }
  getTranslatedPrepTime(prepTime: string): string {
    switch (prepTime) {
      case 'EASY PREP':
        return 'HOMEPAGE.EASY_PREP';
      case 'MEDIUM PREP':
        return 'HOMEPAGE.MEDIUM_PREP';
      case 'HARD PREP':
        return 'HOMEPAGE.HARD_PREP';
      default:
        return prepTime; // fallback nếu không khớp
    }
  }
  filteredRecipes(): any[] {
    if (!this.Tip) return [];

    if (this.selectedMenu === 'ALL') {
      return this.Tip;
    }

    // Sửa điều kiện ở đây: dùng categoryName thay vì item.vegan
    return this.Tip.filter(
      (item) => item.category?.categoryName === this.selectedMenu
    );
  }
}
