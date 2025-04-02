import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';

@Component({
  selector: 'app-create-uploadimage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-uploadimage.component.html',
  styleUrls: ['./create-uploadimage.component.scss'],
})
export class CreateUploadimageComponent {
  constructor(private createRecipeDataService: CreateRecipeDataService) {}
  // Array to store images with `image` of type `string | null`
  descriptions: { image: string | null }[] = [{ image: null }];

  // Trigger the file input for image upload
  triggerFileInput(index: number) {
    const fileInput =
      document.querySelectorAll<HTMLInputElement>('input[type="file"]')[index];
    if (fileInput) {
      fileInput.click();
    }
  }

  uploadImage(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      // Sử dụng URL.createObjectURL để tạo một URL tạm thời cho tệp
      const imageUrl = URL.createObjectURL(file);

      // Cập nhật ảnh trong descriptions
      this.descriptions[index].image = imageUrl;

      // Cập nhật File vào service nếu cần
      this.createRecipeDataService.updateRecipeData('ImagePath', file);
    }
  }
}
