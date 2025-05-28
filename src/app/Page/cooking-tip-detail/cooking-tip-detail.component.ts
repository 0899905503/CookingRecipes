import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { CookingTipService } from '../../Service/CookingTip/cooking-tip.service';
import { ActivatedRoute } from '@angular/router';
import { DateUtils } from '../../Util/date-format-util';
import { CookingTipComponent } from '../../Shared/Component/cooking-tip/cooking-tip.component';
import { NotFoundPageComponent } from '../../Shared/not-found-page/not-found-page.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../Service/Auth/Login/login.service';

@Component({
  selector: 'app-cooking-tip-detail',
  standalone: true,
  imports: [
    CookingTipComponent,
    NotFoundPageComponent,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './cooking-tip-detail.component.html',
  styleUrl: './cooking-tip-detail.component.scss',
})
export class CookingTipDetailComponent {
  @Output() cookingTipSelected = new EventEmitter<number>();

  cookingTipsId!: number;
  cookingTip: any = {};
  notFound: boolean = false;
  currentLang: string = 'en';

  //status button check
  statusButton: string = '';

  //check role
  isAdmin: boolean = false;
  role: any;

  constructor(
    private cookingTipService: CookingTipService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private authService: AuthService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

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

    this.role = this.authService.getRole();
    if (this.role) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    console.log('ROLE: ' + this.role);
  }
  onGetId(id: number): void {
    this.cookingTipService.getCookingTip(id).subscribe(
      (data) => {
        this.cookingTip = data;
        if (this.cookingTip) {
          this.cookingTip.dateCreated =
            this.currentLang === 'vi'
              ? DateUtils.formatDateVI(this.cookingTip.dateCreated)
              : DateUtils.formatDate(this.cookingTip.dateCreated);
        }
      },
      (error) => {
        console.error('Error fetching cooking tip:', error);
      }
    );
  }

  checkCookingTip(cookingTipId: number, cookingTip: any, checkStatus: boolean) {
    if (checkStatus) {
      this.statusButton = 'Approved';
    } else {
      this.statusButton = 'Rejected';
    }
    const updateCookingTip = {
      title: cookingTip.title,
      titleVI: cookingTip.titleVI,
      description: cookingTip.description,
      descriptionVI: cookingTip.descriptionVI,
      Time: cookingTip.time,
      imagePath: cookingTip.imagePath,
      status: this.statusButton,
      categoryId: cookingTip.categoryId,
    };

    this.cookingTipService
      .updateCookingTip(cookingTipId, updateCookingTip)
      .subscribe({
        next: (response) => {
          console.log('Recipe' + this.statusButton + ' successfully', response);
        },
        error: (error) => {
          console.error('Error updating recipe', error);
        },
      });
  }

  removeCookingTip(cookingTipId: number) {
    this.cookingTipService.deleteCookingTip(cookingTipId).subscribe(() => {});
    console.log('Cookingtip remove successfully');
  }
}
