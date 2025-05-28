import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookingTipService } from '../../Service/CookingTip/cooking-tip.service';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { CategoryEnum } from '../../Shared/Value/Enums/category.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-cooking-tip',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './create-cooking-tip.component.html',
  styleUrls: ['./create-cooking-tip.component.scss'],
})
export class CreateCookingTipComponent {
  constructor(
    private cookingtipService: CookingTipService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  currentLang: string = 'en';
  title: string = '';
  titleVI: string = '';
  description: string = '';
  descriptionVI: string = '';
  selectedCategory: number = 0;
  imageUrl: string = '';
  time: number = 0;
  maxDescriptionLength = 500;

  currentUserId: number = 0;
  CategoryId: number = 0;

  successMessage = '';
  errorMessage = '';

  categoriesList = [
    {
      labelEN: 'Meat Tips',
      labelVI: 'Mẹo chế biến thịt',
      value: CategoryEnum.Meat_Tips,
    },
    {
      labelEN: 'Vegetable Tips',
      labelVI: 'Mẹo chế biến rau củ',
      value: CategoryEnum.Vegetable_Tips,
    },
    {
      labelEN: 'Sauce Tips',
      labelVI: 'Mẹo làm nước sốt',
      value: CategoryEnum.Sauce_Tips,
    },
    {
      labelEN: 'Pasta Tips',
      labelVI: 'Mẹo nấu mì',
      value: CategoryEnum.Pasta_Tips,
    },
    {
      labelEN: 'Dessert Tips',
      labelVI: 'Mẹo làm món tráng miệng',
      value: CategoryEnum.Dessert_Tips,
    },
    {
      labelEN: 'Time Saving Tips',
      labelVI: 'Mẹo tiết kiệm thời gian',
      value: CategoryEnum.Time_Saving_Tips,
    },
    {
      labelEN: 'Spice Tips',
      labelVI: 'Mẹo dùng gia vị',
      value: CategoryEnum.Spice_Tips,
    },
    {
      labelEN: 'Vegetarian Tips',
      labelVI: 'Mẹo nấu món chay',
      value: CategoryEnum.Vegetarian_Tips,
    },
    {
      labelEN: 'Beverage Tips',
      labelVI: 'Mẹo pha chế đồ uống',
      value: CategoryEnum.Beverage_Tips,
    },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('AuthService UserId:', userId); // kiểm tra giá trị
    if (!userId) {
      alert('No valid user is logged in!');
    }
    this.currentUserId = userId || 0;
  }

  onTitleChange(value: string) {
    this.title = value;
  }

  onTitleVIChange(value: string) {
    this.titleVI = value;
  }

  onDescriptionChange(lang: string) {
    // Optional: Add validation if needed
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  createCookingTip() {
    if (!this.currentUserId || this.currentUserId === 0) {
      alert('Invalid user. Please log in again.');
      return;
    }

    // Kiểm tra có file ảnh được chọn chưa
    const fileInput = this.fileInput.nativeElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Please select an image file.');
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('imagePath', file); // 'imagePath' là tên field server mong đợi
    formData.append('title', this.title);
    formData.append('titleVI', this.titleVI);
    formData.append('description', this.description);
    formData.append('descriptionVI', this.descriptionVI);
    formData.append('categoryId', this.CategoryId.toString());
    formData.append('time', this.time.toString());
    formData.append('userId', this.currentUserId.toString());

    this.cookingtipService.createCookingTip(formData).subscribe(
      (response) => {
        this.successMessage = 'Created successfully!';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Failed to create Cooking Tip.';
        this.successMessage = '';
      }
    );
  }

  goBack() {
    window.history.back(); // Điều hướng về trang trước
  }
}
