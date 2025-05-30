import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-save',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './create-save.component.html',
  styleUrl: './create-save.component.scss',
})
export class CreateSaveComponent {
  constructor(private router: Router) {}
  @Input() isUpdateMode: boolean = false;

  @Output() saveClicked = new EventEmitter<void>();
  onSave() {
    this.saveClicked.emit(); // Phát sự kiện "saveClicked"
    this.router.navigate(['home']);
    alert('Thao tác thành công');
  }
}
