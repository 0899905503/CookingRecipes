import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-save',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './create-save.component.html',
  styleUrl: './create-save.component.scss',
})
export class CreateSaveComponent {
  @Output() saveClicked = new EventEmitter<void>();
  onSave() {
    this.saveClicked.emit(); // Phát sự kiện "saveClicked"
  }
}
