import { NotFoundPageComponent } from './../../Shared/not-found-page/not-found-page.component';
import { Component } from '@angular/core';
import { RecipeService } from '../../Service/Recipe/recipe-service.service';
import { RecipeMainComponent } from '../../Shared/Component/recipe-main/recipe-main.component';
import { CommonModule } from '@angular/common';
import { RecipeIngredientComponent } from '../../Shared/Component/recipe-ingredient/recipe-ingredient.component';
import { RecipeTipComponent } from '../../Shared/Component/recipe-tip/recipe-tip.component';
import { RecipeInstructionComponent } from '../../Shared/Component/recipe-instruction/recipe-instruction.component';
import { RecipeCardComponent } from '../../Shared/Component/recipe-card/recipe-card.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommentComponent } from '../../Shared/Component/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { stat } from 'fs';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  imports: [
    RecipeMainComponent,
    CommonModule,

    RecipeIngredientComponent,
    RecipeTipComponent,
    RecipeInstructionComponent,
    RecipeCardComponent,
    NotFoundPageComponent,
    CommentComponent,
    FormsModule,
  ],
})
export class RecipesComponent {
  RecipesById: any = {};
  doTips: string[] = [];
  dontTips: string[] = [];
  stepTitle: string[] = [];
  steps: string[] = [];
  titleTipDo: string[] = [];
  titleTipDont: string[] = [];
  SimilarRecipes: any[] = [];
  Comment: any[] = [];
  recipeIds!: number;
  notFound: boolean = false;
  isFavorite: boolean = false; // Trạng thái yêu thích
  userId: number = 10; // Thay bằng ID người dùng thực tế
  //comment
  newCommentText: string = '';
  rating: number = 0;
  hoverRating: number = 0;
  stars = Array(5).fill(0);
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recipeIds = Number(params.get('recipeId'));
      console.log('Recipe ID received from URL:', this.recipeIds);
    });
    if (this.recipeIds) {
      this.onGetId(this.recipeIds);
      this.onGetSimilar(this.recipeIds);
      this.onGetComment(this.recipeIds);
      //this.recipeService.checkFavorite(this.recipeIds, this.userId).subscribe({
      this.recipeService.checkFavorite(this.recipeIds, 10).subscribe({
        next: (isFavorite) => {
          this.isFavorite = isFavorite?.data;
          console.log('Trạng thái yêu thích:', isFavorite);
        },
        error: (error) => {
          console.error('Lỗi khi kiểm tra trạng thái yêu thích:', error);
        },
      });
    } else {
      this.notFound = true;
      console.log('recipeId null');
    }
    this.steps = this.getInstructionDetails(this.RecipesById.instructions);
  }

  onRecipeSelected(id: number): void {
    this.recipeIds = id;
    this.onGetId(this.recipeIds);
    this.onGetSimilar(this.recipeIds);
    this.steps = this.getInstructionDetails(this.RecipesById.instructions);
  }

  onGetId(id: number): void {
    this.recipeService.getByIdRecipes(id).subscribe(
      (data) => {
        this.RecipesById = data || {};
        const tips = this.RecipesById.recipeTip || [];

        if (tips.length > 0) {
          this.doTips = tips
            .filter((tip: any) => tip.actionType === 1)
            .map((tip: any) => tip.actionText);
          this.dontTips = tips
            .filter((tip: any) => tip.actionType === 0)
            .map((tip: any) => tip.actionText);
          this.titleTipDo = tips
            .filter((tip: any) => tip.actionType === 1)
            .map((tip: any) => `${tip.title}:`);
          this.titleTipDont = tips
            .filter((tip: any) => tip.actionType === 0)
            .map((tip: any) => `${tip.title}:`);
        } else {
          console.warn('No recipe tips available.');
        }

        const instructions = this.RecipesById.instructions || [];
        if (instructions.length > 0) {
          this.stepTitle = instructions.map(
            (instruction: any) =>
              `Step ${instruction.stepNumber}:  ${instruction.title}`
          );
          this.steps = this.getInstructionDetails(instructions);
        }
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  async onGetSimilar(id: number) {
    try {
      const data = await this.recipeService.getSimilarRecipes(id).toPromise();
      if (data) {
        this.SimilarRecipes = data.map((recipeData: any) => {
          return {
            recipeId: recipeData.recipeId,
            sharedIngredientsCount: recipeData.sharedIngredientsCount,
            recipeDetails: recipeData.recipe[0],
            isVegan: recipeData.recipe[0].vegan,
          };
        });
        console.log('Similar recipes fetched successfully');
      } else {
        console.warn('No similar recipes found');
      }
    } catch (error) {
      console.error('Error fetching similar recipes:', error);
    }
  }

  getIngredientDetails(recipeIngredients: any[]): string[] {
    if (!recipeIngredients || recipeIngredients.length === 0) {
      return ['No ingredients available.'];
    }
    return recipeIngredients.map(
      (ingredient) =>
        `${ingredient.ingredient.ingredientName}: ${ingredient.quantity} (${ingredient.ingredient.unit})`
    );
  }

  getCookingToolDetails(recipeTools: any[]): string[] {
    if (!recipeTools || recipeTools.length === 0) {
      return ['No cooking tools available.'];
    }
    return recipeTools.map((tool) => tool.cookingTool.cookingToolName);
  }

  getNutrientDetails(recipeNutrient: any[]): string[] {
    if (!recipeNutrient || recipeNutrient.length === 0) {
      return ['No nutrient information available.'];
    }
    return recipeNutrient.map(
      (nutrientType) =>
        `${nutrientType.nutrientType.nutrientTypeName}: ~ ${nutrientType.quantity} (${nutrientType.nutrientType.unit})`
    );
  }

  getInstructionDetails(instructions: any[]): string[] {
    if (!instructions || instructions.length === 0) {
      return ['No instructions available.'];
    }
    return instructions.map((instruction) => instruction.instructionText);
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(recipeId: number, userId: number): void {
    console.log('toggleFavorite called with:', { recipeId, userId }); // Log kiểm tra
    if (this.isFavorite) {
      const confirmRemove = confirm(
        'Bạn có chắc chắn muốn hủy mục yêu thích này?'
      );
      if (confirmRemove) {
        this.isFavorite = false;
        console.log('Đã hủy mục yêu thích.');
        this.recipeService.deleteFavorite(recipeId, userId).subscribe({
          next: (response) => {
            console.log('Hủy mục yêu thích thành công:', response);
          },
          error: (error) => {
            console.error('Lỗi khi hủy mục yêu thích:', error);
          },
        });
      }
    } else {
      const confirmAdd = confirm(
        'Bạn có chắc chắn muốn thêm vào mục yêu thích?'
      );
      if (confirmAdd) {
        this.isFavorite = true;
        console.log('Đã thêm vào mục yêu thích.');
        this.recipeService.createFavorite(recipeId, userId).subscribe({
          next: (response) => {
            console.log('Thêm vào mục yêu thích thành công:', response);
          },
          error: (error) => {
            console.error('Lỗi khi thêm vào mục yêu thích:', error);
          },
        });
      }
    }
  }

  async onGetComment(id: number) {
    try {
      const data = await this.recipeService
        .getCommentByRecipeId(id)
        .toPromise();
      if (data) {
        this.Comment = data;
        console.log('Similar recipes fetched successfully');
      } else {
        console.warn('No similar recipes found');
      }
    } catch (error) {
      console.error('Error fetching similar recipes:', error);
    }
  }

  //comment
  submitComment(userId: number, recipeId: number) {
    const commentData = {
      recipeId: recipeId,
      userId: userId,
      commentText: this.newCommentText,
      rating: this.rating,
      datePosted: new Date().toISOString(),
      status: 'pending',
    };

    console.log('Comment data:', commentData);

    this.recipeService.createComment(commentData).subscribe({
      next: (res) => {
        this.newCommentText = res.commentText;
        this.rating = res.rating;
        console.log('Comment submitted successfully:', res);
      },
      error: (err) => {
        console.error('Error submitting comment:', err);
      },
    });
  }

  setRating(star: number) {
    this.rating = star;
  }
}
