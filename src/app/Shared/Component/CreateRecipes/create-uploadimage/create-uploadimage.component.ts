import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-uploadimage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-uploadimage.component.html',
  styleUrls: ['./create-uploadimage.component.scss'],
})
export class CreateUploadimageComponent {
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

  // Handle image upload
  uploadImage(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Update the image property with the uploaded image
        this.descriptions[index].image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
