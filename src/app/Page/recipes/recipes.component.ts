import { Component } from '@angular/core';
import { RecipeService } from '../../Service/Recipe/recipe-service.service';
import { RecipeMainComponent } from '../../Shared/Component/recipe-main/recipe-main.component';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  //imports: [CommonModule],
  imports: [RecipeMainComponent],
})
export class RecipesComponent {
  Recipes: any[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data) => {
        console.log('API Response:', data);
        this.Recipes = data;
        console.log('##########################');
        console.log('Recipes:', this.Recipes);
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  getImagePath(imagePath: string): string {
    if (imagePath.startsWith('\\')) {
      return 'assets/images' + imagePath.replace('\\', '/');
    } else if (imagePath.includes('src\\assets')) {
      return imagePath.replace(/\\/g, '/').split('src/assets/')[1];
    }
    return imagePath;
  }

  // onGetId():void{
  //   this.recipeService.getAllRecipes().subscribe(
  //     (data) => {
  //       console.log('API Response:', data);
  //       this.Recipes = data;
  //       console.log('##########################');
  //       console.log('Recipes:', this.Recipes);
  //     },
  //     (error) => {
  //       console.error('Error fetching recipes:', error);
  //     }
  //   );
  // }
}
