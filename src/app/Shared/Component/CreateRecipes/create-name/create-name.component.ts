import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-name',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-name.component.html',
  styleUrl: './create-name.component.scss',
})
export class CreateNameComponent {
  names = [{ name: '' }];
}
