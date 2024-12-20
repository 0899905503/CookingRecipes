import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss'],
})
export class RecipeDialogComponent {
  @Input() selectedTip: any; // This will receive the selected tip data from RecipeTips
  showDialog: boolean = false;

  openDialog(tip: any): void {
    this.selectedTip = tip;
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }
}
