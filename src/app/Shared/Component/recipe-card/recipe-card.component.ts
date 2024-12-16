// RecipeCardComponent
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
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

  @Input() recipeId!: number; // Lấy giá trị từ parent
  @Output() recipeSelected = new EventEmitter<number>(); // Phát ra sự kiện

  constructor(private router: Router) {}

  navigateToRecipe() {
    if (this.recipeId) {
      this.recipeSelected.emit(this.recipeId); // Phát ra giá trị recipeId khi chọn công thức
      this.router.navigate(['/recipes', this.recipeId]); // Điều hướng tới trang chi tiết công thức
    } else {
      console.warn('Recipe ID not available for navigation.');
    }
  }
}
