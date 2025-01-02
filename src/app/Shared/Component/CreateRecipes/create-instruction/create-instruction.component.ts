import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-instruction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-instruction.component.html',
  styleUrl: './create-instruction.component.scss',
})
export class CreateInstructionComponent {
  instructions = [{ title: '', step: '', text: '', tool: '' }];

  addInstruction() {
    this.instructions.push({ title: '', step: '', text: '', tool: '' });
  }
}
