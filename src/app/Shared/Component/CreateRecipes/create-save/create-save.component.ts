import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-save',
  standalone: true,
  imports: [],
  templateUrl: './create-save.component.html',
  styleUrl: './create-save.component.scss',
})
export class CreateSaveComponent {
  @Output() saveClicked = new EventEmitter<void>();
  onSave() {
    this.saveClicked.emit(); // Phát sự kiện "saveClicked"
  }
}
