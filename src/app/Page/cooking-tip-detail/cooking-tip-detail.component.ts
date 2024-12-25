import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { CookingTipService } from '../../Service/CookingTip/cooking-tip.service';
import { ActivatedRoute } from '@angular/router';
import { DateUtils } from '../../Util/date-format-util';
import { CookingTipComponent } from '../../Shared/Component/cooking-tip/cooking-tip.component';
import { NotFoundPageComponent } from '../../Shared/not-found-page/not-found-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cooking-tip-detail',
  standalone: true,
  imports: [CookingTipComponent, NotFoundPageComponent, CommonModule],
  templateUrl: './cooking-tip-detail.component.html',
  styleUrl: './cooking-tip-detail.component.scss',
})
export class CookingTipDetailComponent {
  @Output() cookingTipSelected = new EventEmitter<number>();

  cookingTipsId!: number;
  cookingTip: any = {};
  notFound: boolean = false;

  constructor(
    private cookingTipService: CookingTipService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.cookingTipsId = Number(params.get('cookingTipId'));
      console.log('Cooking tip ID received from URL:', this.cookingTipsId);
    });
    if (this.cookingTipsId) {
      this.onGetId(this.cookingTipsId);
    } else {
      this.notFound = true;
      console.log('Cooking tip id is null');
    }
  }
  onGetId(id: number): void {
    this.cookingTipService.getCookingTip(id).subscribe(
      (data) => {
        this.cookingTip = data;

        this.cookingTip.dateCreated = DateUtils.formatDate(
          this.cookingTip.dateCreated
        );
      },
      (error) => {
        console.error('Error fetching cooking tip:', error);
      }
    );
  }
}
