import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Input() DescriptionName: string = '';
  @Input() DescriptionNameTitle: string = '';
  @Input() descriptionText: string = ''; // <-- thêm dòng này

  @Output() descriptionChange = new EventEmitter<string>();

  constructor(private createRecipeDataService: CreateRecipeDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['descriptionText'] &&
      changes['descriptionText'].currentValue !== undefined
    ) {
      this.description = this.descriptionText;
    }
  }

  onDescriptionChange(title: string) {
    this.DescriptionName = title;
    this.descriptionChange.emit(this.description);
    if (this.description.length > this.maxDescriptionLength) {
      this.description = this.description.substring(
        0,
        this.maxDescriptionLength
      );
    }

    // Cập nhật dữ liệu mô tả vào service theo key DescriptionName
    this.createRecipeDataService.updateRecipeData(
      this.DescriptionName,
      this.description
    );
  }
}
