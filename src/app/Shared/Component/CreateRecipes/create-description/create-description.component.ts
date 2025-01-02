import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-description',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-description.component.html',
  styleUrls: ['./create-description.component.scss'],
})
export class CreateDescriptionComponent {
  descriptions = [{ description: '' }];
  maxDescriptionLength = 2000;

  onInputChange(index: number) {
    const desc = this.descriptions[index].description;
    if (desc.length > this.maxDescriptionLength) {
      this.descriptions[index].description = desc.substring(
        0,
        this.maxDescriptionLength
      );
    }
  }
}
