import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-instruction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-instruction.component.html',
  styleUrl: './recipe-instruction.component.scss',
})
export class RecipeInstructionComponent {
  @Input() title!: string;
  @Input() steps!: string[];
}
