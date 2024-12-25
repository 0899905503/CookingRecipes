import { ActivatedRoute, Router } from '@angular/router';
import { CookingTipService } from './../../../Service/CookingTip/cooking-tip.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cooking-tip',
  standalone: true,
  imports: [],
  templateUrl: './cooking-tip.component.html',
  styleUrl: './cooking-tip.component.scss',
})
export class CookingTipComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() dateCreated!: string;
  @Input() time!: string;
  @Input() category!: string;
  @Input() user!: string;
  @Input() cookingTipId!: number;

  @Output() cookingTipSelected = new EventEmitter<number>();

  cookingTipsId!: number;
  cookingTip: any[] = [];

  constructor(
    private cookingTipService: CookingTipService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.cookingTipsId = Number(params.get('cookingTipId'));
      console.log('Cooking tip ID received from URL:', this.cookingTipsId);
    });
    //this.router.navigate(['/cookingtip', this.cookingTipId]);
    if (this.cookingTipsId) {
      this.onGetId(this.cookingTipsId);
    } else {
      console.log('Cooking tip id is null');
    }
  }
  onGetId(id: number): void {
    this.cookingTipService.getCookingTip(id).subscribe(
      (data) => {
        this.cookingTip = data;
      },
      (error) => {
        console.error('Error fetching cooking tip:', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
