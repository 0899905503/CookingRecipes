import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-uploadimage',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './create-uploadimage.component.html',
  styleUrls: ['./create-uploadimage.component.scss'],
})
export class CreateUploadimageComponent {
  constructor(private createRecipeDataService: CreateRecipeDataService) {}

  @Input() imageUrl: string | null = null;
  @Output() imageChange = new EventEmitter<File>();

  // Use ViewChild to get the file input
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  triggerFileInput() {
    const fileInput = this.fileInputRef?.nativeElement;
    if (fileInput) {
      fileInput.value = ''; // reset để có thể chọn cùng file nhiều lần
      fileInput.click();
    }
  }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.imageChange.emit(file);
    }
  }
}
