import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  // Các input nhận từ component cha
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

  constructor(private router: Router) {}

  onSelectRecipe(): void {
    if (this.recipeId) {
      this.recipeSelected.emit(this.recipeId);
      console.log(`Recipe ID emitted: ${this.recipeId}`);
      this.router.navigate(['/recipes', this.recipeId]);
    } else {
      console.warn('Recipe ID not available for navigation.');
    }
  }
}
