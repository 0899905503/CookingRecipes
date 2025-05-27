import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Input() recipeTitle: string = '';

  @Output() titleChange = new EventEmitter<string>();

  title: string = '';
  header: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['recipeTitle'] &&
      changes['recipeTitle'].currentValue !== undefined
    ) {
      this.title = this.recipeTitle;
    }
  }

  ngOnInit(): void {}

  onTitleChange(newTitle: string) {
    this.title = newTitle;
    this.titleChange.emit(this.title);

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
