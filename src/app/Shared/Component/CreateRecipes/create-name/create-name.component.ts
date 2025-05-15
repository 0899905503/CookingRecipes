import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-name',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-name.component.html',
  styleUrl: './create-name.component.scss',
})
export class CreateNameComponent {
  names = [{ name: '' }];
  constructor(
    private location: Location,
    private createRecipeDataService: CreateRecipeDataService
  ) {}

  title: string = '';

  onTitleChange() {
    this.createRecipeDataService.updateRecipeData('Title', this.title);
  }

  goBack(): void {
    this.location.back();
  }
}
