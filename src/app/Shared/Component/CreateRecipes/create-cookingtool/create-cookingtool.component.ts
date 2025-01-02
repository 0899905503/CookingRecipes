import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-cookingtool',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-cookingtool.component.html',
  styleUrl: './create-cookingtool.component.scss',
})
export class CreateCookingtoolComponent {
  cookingtools = [{ CookingTool: '' }];

  addCookingTool() {
    this.cookingtools.push({ CookingTool: '' });
  }
}
