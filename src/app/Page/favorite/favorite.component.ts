import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { FavoriteService } from '../../Service/Favorite/favorite.service';
import { RecipeCardComponent } from '../../Shared/Component/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [RecipeCardComponent, CommonModule, TranslateModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
})
export class FavoriteComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() prepTime!: string;
  @Input() cookTime!: string;
  @Input() serves!: string;
  @Input() imageUrl!: string;
  @Input() totalView!: string;
  @Output() recipeSelected = new EventEmitter<number>();
  selectedMenu: string = 'ALL';
  currentLang: string = 'en';
  userRole: string = '';
  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
  FavoritesRecipe: any[] = [];

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || 'guest';
    const userId = this.authService.getUserId();
    console.log('User ID:', userId);

    if (userId !== null) {
      this.onGetAllFavoriteRecipe(userId);
    } else {
      console.error('Không tìm thấy userId. Có thể chưa đăng nhập.');
    }
  }
  onGetAllFavoriteRecipe(userId: number): void {
    this.favoriteService.getFavoriteRecipeByUserId(userId).subscribe(
      (response) => {
        this.FavoritesRecipe = response; // <-- Lấy đúng data
        console.log('Favorite recipes:', this.FavoritesRecipe); // <-- Kiểm tra data
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  filteredRecipes(): any[] {
    if (!this.FavoritesRecipe) return [];

    if (this.selectedMenu === 'ALL') {
      return this.FavoritesRecipe;
    }

    // Sửa điều kiện ở đây: dùng categoryName thay vì item.vegan
    return this.FavoritesRecipe.filter(
      (item) => item.category?.categoryName === this.selectedMenu
    );
  }

  onRecipeSelected(recipeId: number): void {
    this.recipeSelected.emit(recipeId); // Phát ra recipeId
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
  checkAccessAndNavigate(event: Event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>

    if (this.userRole === 'guest') {
      this.translate.get('ALERT').subscribe((res: string) => {
        alert(res);
      });
      return;
    }
  }
}
