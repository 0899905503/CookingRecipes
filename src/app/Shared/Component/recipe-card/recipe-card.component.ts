import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../Service/Auth/Login/login.service';
import { RecipeService } from '../../../Service/Recipe/recipe-service.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() imageUrl!: string;
  @Input() description!: string;
  @Input() prepTime!: string;
  @Input() cookTime!: string;
  @Input() serves!: string;
  @Input() title!: string;
  @Input() totalView!: string;
  @Input() unit1!: string;
  @Input() unit2!: string;
  @Input() isVegan: boolean = false;
  @Input() recipeId!: number;
  @Output() recipeSelected = new EventEmitter<number>();
  @Input() averageRating: number = 0;

  @Input() createdByUserId!: number;
  @Input() currentUserId!: number;

  fullStars: number[] = [];
  hasHalfStar: boolean = false;
  emptyStars: number[] = [];

  isOnAboutUsPage: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.setupStars(this.averageRating);
    this.isOnAboutUsPage = this.router.url.includes('about');
  }

  onSelectRecipe(): void {
    if (this.recipeId) {
      this.recipeSelected.emit(this.recipeId);
      console.log(`Recipe ID emitted: ${this.recipeId}`);
      this.router.navigate(['/recipes', this.recipeId]);
    } else {
      console.warn('Recipe ID not available for navigation.');
    }
  }
  setupStars(rating: number): void {
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    this.fullStars = Array(full).fill(0);
    this.hasHalfStar = hasHalf;
    this.emptyStars = Array(empty).fill(0);
  }

  onEditRecipe(event: Event): void {
    const token = this.authService.getToken();
    event.stopPropagation(); // để không bị gọi cả hàm `onSelectRecipe`
    if (this.recipeId && token) {
      this.router.navigate(['/updateRecipe', this.recipeId]);
    }
  }
}
