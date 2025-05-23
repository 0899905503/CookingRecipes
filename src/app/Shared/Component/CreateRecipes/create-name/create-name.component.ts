import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() titleName: string = '';
  title: string = '';
  header: string = '';

  onTitleChange(titleCheck: string) {
    this.titleName = titleCheck;
    if (this.titleName === 'Title') {
      this.createRecipeDataService.updateRecipeData('Title', this.title);
    } else if (this.titleName === 'TitleVI') {
      this.createRecipeDataService.updateRecipeData('TitleVI', this.title);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
