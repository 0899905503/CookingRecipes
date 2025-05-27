import { NotFoundPageComponent } from './../../Shared/not-found-page/not-found-page.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { AuthService } from '../../Service/Auth/Login/login.service';
import e from 'express';
import { stat } from 'node:fs';
import { DateUtils } from '../../Util/date-format-util';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import html2canvas from 'html2canvas';

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
    TranslateModule,
  ],
})
export class RecipesComponent {
  @ViewChild('recipeContent', { static: false }) recipeContent!: ElementRef;

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
  userId: number = 0; // Thay bằng ID người dùng thực tế
  //comment
  newCommentText: string = '';
  rating: number = 0;
  hoverRating: number = 0;
  stars = Array(5).fill(0);
  averageRating: number = 0;

  fullStars: number[] = [];
  emptyStars: number[] = [];
  hasHalfStar: boolean = false;

  //check role
  isAdmin: boolean = false;
  role: any;

  //status button check
  statusButton: string = '';

  //translate
  currentLang: string = 'en';

  //guest
  roleGuest: string = '';
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void {
    this.roleGuest = localStorage.getItem('role') || 'guest';
    console.log('Role:', this.roleGuest);
    const userIdst = this.authService.getUserId();
    console.log('User ID:', userIdst);
    if (userIdst !== null) {
      this.userId = userIdst;
    }

    this.route.paramMap.subscribe((params) => {
      this.recipeIds = Number(params.get('recipeId'));
      console.log('Recipe ID received from URL:', this.recipeIds);
    });
    this.role = this.authService.getRole();
    if (this.role) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    if (this.recipeIds) {
      this.onGetId(this.recipeIds);
      this.onGetSimilar(this.recipeIds);
      this.onGetComment(this.recipeIds);
      //this.recipeService.checkFavorite(this.recipeIds, this.userId).subscribe({
      if (userIdst !== null) {
        this.recipeService.checkFavorite(this.recipeIds, userIdst).subscribe({
          next: (isFavorite) => {
            this.isFavorite = isFavorite?.data;
            console.log('Trạng thái yêu thích:', isFavorite);
          },
          error: (error) => {
            console.error('Lỗi khi kiểm tra trạng thái yêu thích:', error);
          },
        });
      }
    } else {
      this.notFound = true;
      console.log('recipeId null');
    }
  }

  onRecipeSelected(id: number): void {
    this.recipeIds = id;
    this.onGetId(this.recipeIds);
    this.onGetSimilar(this.recipeIds);
  }

  onGetId(id: number): void {
    this.recipeService.getByIdRecipes(id).subscribe(
      (data) => {
        this.RecipesById = data || {};
        const tips = this.RecipesById.recipeTip || [];
        this.averageRating = this.RecipesById.averageRating;
        console.log('Average rating:', this.averageRating);

        if (tips.length > 0) {
          this.doTips = tips
            .filter((tip: any) => tip.actionType === 1)
            .map((tip: any) =>
              this.currentLang === 'vi'
                ? tip.actionTextVI || tip.actionText
                : tip.actionText
            );

          this.dontTips = tips
            .filter((tip: any) => tip.actionType === 0)
            .map((tip: any) =>
              this.currentLang === 'vi'
                ? tip.actionTextVI || tip.actionText
                : tip.actionText
            );

          this.titleTipDo = tips
            .filter((tip: any) => tip.actionType === 1)
            .map((tip: any) =>
              this.currentLang === 'vi'
                ? `${tip.titleVI || tip.title}:`
                : `${tip.title}:`
            );

          this.titleTipDont = tips
            .filter((tip: any) => tip.actionType === 0)
            .map((tip: any) =>
              this.currentLang === 'vi'
                ? `${tip.titleVI || tip.title}:`
                : `${tip.title}:`
            );
        } else {
          console.warn('No recipe tips available.');
        }

        const instructions = this.RecipesById.instructions || [];
        if (instructions.length > 0) {
          this.stepTitle = instructions.map((instruction: any) => {
            const stepDetails =
              this.currentLang === 'vi'
                ? instruction.titleVI || instruction.title
                : instruction.title;
            const stepLabel = this.currentLang === 'vi' ? 'Bước' : 'Step';
            return `${stepLabel} ${instruction.stepNumber}: ${stepDetails}`;
          });

          this.steps = instructions.map((instruction: any) => {
            const steps =
              this.currentLang === 'vi'
                ? instruction.instructionTextVI || instruction.instructionText
                : instruction.instructionText;
            return steps;
          });
        }

        if (this.averageRating == 0) {
          this.setupStars(5);
        } else {
          this.setupStars(this.averageRating);
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
        // Lọc trước, rồi map để tránh ghi đè dữ liệu
        this.SimilarRecipes = data
          .filter(
            (item: any) =>
              item.status !== 'Pending' && item.status !== 'Rejected'
          )
          .map((recipeData: any) => ({
            recipeId: recipeData.recipeId,
            sharedIngredientsCount: recipeData.sharedIngredientsCount,
            recipeDetails: recipeData.recipe[0],
            isVegan: recipeData.recipe[0]?.vegan ?? false,
          }));

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
      return [this.translate.instant('RECIPE_DETAILS.NO_INGREDIENT')];
    }

    return recipeIngredients.map((ingredient) => {
      const ingredientName =
        this.currentLang === 'vi'
          ? ingredient.ingredient.ingredientNameVI ||
            ingredient.ingredient.ingredientName
          : ingredient.ingredient.ingredientName;
      const unitVi =
        this.currentLang === 'vi'
          ? ingredient.ingredient.unitVI || ingredient.ingredient.unit
          : ingredient.ingredient.unit;

      return `${ingredientName}: ${ingredient.quantity} ${unitVi}`;
    });
  }

  getCookingToolDetails(recipeTools: any[]): string[] {
    if (!recipeTools || recipeTools.length === 0) {
      return ['No cooking tools available.'];
    }
    return recipeTools.map((tool) => {
      const toolName =
        this.currentLang === 'vi'
          ? tool.cookingTool.cookingToolNameVI ||
            tool.cookingTool.cookingToolName
          : tool.cookingTool.cookingToolName;
      return toolName;
    });
  }

  getNutrientDetails(recipeNutrient: any[]): string[] {
    if (!recipeNutrient || recipeNutrient.length === 0) {
      return ['No nutrient information available.'];
    }
    return recipeNutrient.map((nutrientType) => {
      const nutrientName =
        this.currentLang === 'vi'
          ? nutrientType.nutrientType.nutrientTypeNameVI ||
            nutrientType.nutrientType.nutrientTypeName
          : nutrientType.nutrientType.nutrientTypeName;
      return `${nutrientName}: ~ ${nutrientType.quantity} (${nutrientType.nutrientType.unit})`;
    });
  }

  getInstructionDetails(instructions: any[]): string[] {
    if (!instructions || instructions.length === 0) {
      return ['No instructions available.'];
    }
    return instructions.map((instruction) => {
      const intruction_details =
        this.currentLang === 'vi'
          ? instruction.instructionTextVI || instruction.instructionText
          : instruction.instructionTextVI;
      return intruction_details;
    });
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
        this.Comment = data.map((comment: any) => ({
          ...comment,
          datePosted: DateUtils.formatDate(comment.datePosted),
        }));
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
  setupStars(rating: number) {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    this.fullStars = Array(full).fill(0);
    this.hasHalfStar = hasHalf;
    this.emptyStars = Array(empty).fill(0);

    console.log('Rating passed to setupStars:', rating);
  }

  checkRecipe(recipeId: number, recipe: any, checkStatus: boolean) {
    if (checkStatus) {
      this.statusButton = 'Approved';
    } else {
      this.statusButton = 'Rejected';
    }
    const updatedRecipe = {
      title: recipe.title,
      titleVI: recipe.titleVI,
      description: recipe.description,
      descriptionVI: recipe.descriptionVI,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      imageUrl: recipe.imageUrl,
      vegan: !!recipe.vegan, // đảm bảo là boolean chứ không phải chuỗi
      status: this.statusButton,
      categoryId: recipe.categoryId,
    };

    this.recipeService.updateRecipeById(recipeId, updatedRecipe).subscribe({
      next: (response) => {
        console.log('Recipe updated successfully', response);
        // Có thể update UI hoặc báo thành công tại đây
      },
      error: (error) => {
        console.error('Error updating recipe', error);
        // Báo lỗi tại đây nếu cần
      },
    });
  }

  removeRecipe(recipeId: number) {
    this.recipeService.deleteRecipes(recipeId).subscribe(() => {});
    console.log('Recipe rejected successfully');
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

  capture() {
    const element = document.querySelector('.Recipe-info') as HTMLElement;
    const img = element?.querySelector('img');

    if (!element || !this.RecipesById) {
      console.error('Không tìm thấy phần tử hoặc dữ liệu công thức');
      return;
    }

    let fileName =
      this.currentLang === 'vi'
        ? this.RecipesById.titleVI || this.RecipesById.title
        : this.RecipesById.title;

    fileName = fileName.replace(/[\\/:*?"<>|]/g, '');

    const doCapture = () => {
      html2canvas(element, {
        useCORS: true, // hỗ trợ ảnh từ nguồn khác
        allowTaint: false,
      })
        .then((canvas) => {
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = `${fileName}.png`;
          link.click();
        })
        .catch((error) => {
          console.error('Lỗi khi chụp ảnh:', error);
        });
    };

    if (img && !img.complete) {
      img.onload = doCapture;
      img.onerror = () => console.error('Không tải được ảnh');
    } else {
      doCapture();
    }
  }
}
// Removed the stub for html2canvas since we are now importing the actual library.
