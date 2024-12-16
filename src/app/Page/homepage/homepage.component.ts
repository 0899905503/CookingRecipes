import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HomepageService } from '../../Service/Homepage/homepage.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
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
  constructor(private homepageService: HomepageService) {}
  RecipesTopView: any[] = [];
  Recipe: any[] = [];
  DessertRecipes: any[] = [];
  ngOnInit(): void {
    this.onGetAllRecipe();
    this.onGetTopView();
  }
  onGetAllRecipe(): void {
    this.homepageService.getAllrecipe().subscribe(
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

    if (this.selectedMenu === 'ALL') return this.Recipe;

    if (this.selectedMenu === 'Vegan') {
      return this.Recipe.filter((item) => item.vegan === true);
    }

    return this.Recipe.filter(
      (item) =>
        item.category.categoryName === this.selectedMenu ||
        (item.vegan === true &&
          item.category.categoryName !== this.selectedMenu)
    );
  }

  onGetTopView(): void {
    this.homepageService.getTopView().subscribe(
      (data) => {
        this.RecipesTopView = data;
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
