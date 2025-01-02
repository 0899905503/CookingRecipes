import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-cookingtip',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-cookingtip.component.html',
  styleUrl: './create-cookingtip.component.scss',
})
export class CreateCookingtipComponent {
  instructions = [{ title: '', actiontext: '', actiontype: '' }];

  addInstruction() {
    this.instructions.push({ title: '', actiontext: '', actiontype: '' });
  }
}
