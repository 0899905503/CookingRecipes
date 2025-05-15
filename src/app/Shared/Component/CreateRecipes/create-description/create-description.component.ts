import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-description',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-description.component.html',
  styleUrls: ['./create-description.component.scss'],
})
export class CreateDescriptionComponent {
  description: string = '';
  maxDescriptionLength = 2000;

  constructor(private createRecipeDataService: CreateRecipeDataService) {}

  onDescriptionChange() {
    if (this.description.length > this.maxDescriptionLength) {
      this.description = this.description.substring(
        0,
        this.maxDescriptionLength
      );
    }
    // Cập nhật `description` vào service
    this.createRecipeDataService.updateRecipeData(
      'Description',
      this.description
    );
  }
}
