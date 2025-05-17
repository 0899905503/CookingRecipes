import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CookingTipService } from '../../../Service/CookingTip/cooking-tip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe-tips',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './recipe-tips.component.html',
  styleUrl: './recipe-tips.component.scss',
})
export class RecipeTipsComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() time!: string;
  @Input() unit!: string;
  @Input() date!: string;
  @Input() imageUrl!: string;

  @Input() cookingTipId!: number;

  @Output() cookingTipSelected = new EventEmitter<number>();

  constructor(
    private cookingTipService: CookingTipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSelectCookingTip(): void {
    if (this.cookingTipId) {
      this.cookingTipSelected.emit(this.cookingTipId);
      console.log(`Cooking tip ID emitted: ${this.cookingTipId}`);
      this.router.navigate(['/cookingTip', this.cookingTipId]);
    } else {
      console.warn('Cooking tip ID not available for navigation.');
    }
  }
}
