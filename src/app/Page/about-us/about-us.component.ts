import { Component, EventEmitter, Output } from '@angular/core';
import { SettingPageComponent } from '../../Shared/Component/setting-page/setting-page.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RecipeCardComponent } from '../../Shared/Component/recipe-card/recipe-card.component';
import { SelectOptionsComponent } from '../../Shared/Component/select-options/select-options.component';
import { RecipeService } from '../../Service/Recipe/recipe-service.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    RecipeCardComponent,
    SelectOptionsComponent,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  constructor(private recipeService: RecipeService) {}

  @Output() recipeSelected = new EventEmitter<number>();

  selectedMenu: string = 'ALL';
  currentLang: string = 'en';
  Recipe: any[] = [];

  RecipeByUserId: any = {};

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.onGetRecipeByUserId(Number(userId)); // Lấy tất cả công thức nấu ăn
    }
  }

  filteredRecipes(): any[] {
    if (!this.Recipe) return [];

    const visibleRecipes = this.Recipe.filter(
      (item) => item.status !== 'Pending' && item.status !== 'Rejected'
    );

    if (this.selectedMenu === 'ALL') return visibleRecipes;

    if (this.selectedMenu === 'Vegan') {
      return visibleRecipes.filter((item) => item.vegan == 1);
    }

    // Các danh mục còn lại
    return visibleRecipes.filter(
      (item) => item.category?.categoryName === this.selectedMenu
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

  onRecipeSelected(recipeId: number): void {
    this.recipeSelected.emit(recipeId); // Phát ra recipeId
  }

  onGetRecipeByUserId(recipeId: number): void {
    this.recipeService.getRecipeByUserId(recipeId).subscribe(
      (response) => {
        this.RecipeByUserId = response;
        this.Recipe = this.RecipeByUserId.data;
        console.log('Recipe details:', response);
        // Handle the response as needed
      },
      (error) => {
        console.error('Error fetching recipe:', error);
      }
    );
  }
}
