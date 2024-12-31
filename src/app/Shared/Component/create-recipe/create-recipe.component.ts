import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  @Input() formFields: FormField[] = [];
  @Input() textButton!: string;
  @Input() check!: boolean;
  @Input() placeHolderDetail!: string;
  @Input() layout: string = 'row';
  @Input() totalField!: number;
  addInput() {
    if (!this.totalField || this.totalField <= 0) {
      console.error('Invalid totalField value. It must be greater than 0.');
      return;
    }

    for (let i = 0; i < this.totalField; i++) {
      const newField: FormField = {
        label: '', // Nhãn tự động
        type: 'text', // Mặc định là text
        placeholder: '', // Placeholder mặc định
        value: '', // Giá trị ban đầu
      };
      this.formFields.push(newField);
    }
  }
}
export interface FormField {
  label: string; // Nhãn (ví dụ: "Tên")
  type: string; // Loại (ví dụ: 'text', 'number', 'select', 'checkbox')
  placeholder?: string; // Gợi ý trong ô input
  value?: any; // Giá trị mặc định
  options?: string[]; // Danh sách cho dropdown
}
