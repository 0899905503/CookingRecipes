import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HomepageService } from '../../Service/Homepage/homepage.service';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { RecipeCardComponent } from '../../Shared/Component/recipe-card/recipe-card.component';
import { SelectOptionsComponent } from '../../Shared/Component/select-options/select-options.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  imports: [
    RecipeCardComponent,
    SelectOptionsComponent,
    CommonModule,
    TranslateModule,
  ],
})
export class HomepageComponent {
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
  constructor(
    private homepageService: HomepageService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
  RecipesTopView: any[] = [];
  Recipe: any[] = [];
  DessertRecipes: any[] = [];
  ngOnInit(): void {
    this.onGetAllRecipe();
    this.onGetTopView();
    const userId = this.authService.getUserId();
    console.log('User ID:', userId);
  }
  onGetAllRecipe(): void {
    this.homepageService.getAllRecipe().subscribe(
      (data) => {
        this.Recipe = data;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  filteredRecipes(): any[] {
    if (!this.Recipe) return [];

    // Lọc bỏ những công thức có status là 'pending'
    const visibleRecipes = this.Recipe.filter(
      (item) => item.status !== 'Pending' && item.status !== 'Rejected'
    );

    if (this.selectedMenu === 'ALL') return visibleRecipes;

    if (this.selectedMenu === 'Vegan') {
      return visibleRecipes.filter((item) => item.vegan === 1);
    }

    return visibleRecipes.filter(
      (item) =>
        item.category.categoryName === this.selectedMenu ||
        (item.vegan === 1 && item.category.categoryName !== this.selectedMenu)
    );
  }

  onGetTopView(): void {
    this.homepageService.getTopView().subscribe(
      (data) => {
        this.RecipesTopView = data.filter(
          (item: any) => item.status !== 'Pending' && item.status !== 'Rejected'
        );
      },
      (error) => {
        console.error('Error fetching recipes view:', error);
      }
    );
  }

  onRecipeSelected(recipeId: number): void {
    this.recipeSelected.emit(recipeId); // Phát ra recipeId
  }
}
