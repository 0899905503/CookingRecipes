import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookingtoolService } from './../../../../Service/CookingTool/cookingtool.service';
import { CreateRecipeDataService } from '../../../../Service/CreateRecipeData/create-recipe-data.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-cookingtool',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './create-cookingtool.component.html',
  styleUrls: ['./create-cookingtool.component.scss'],
})
export class CreateCookingtoolComponent {
  cookingtools = [{ cookingToolId: '' }];
  Cookingtool: any[] = [];
  //translate
  currentLang: string = 'en';

  constructor(
    private cookingtoolService: CookingtoolService,
    private createRecipeDataService: CreateRecipeDataService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit(): void {
    this.onGetAllCookingTool();
  }

  addCookingTool() {
    this.cookingtools.push({ cookingToolId: '' });
    this.updateTool(); // Cập nhật luôn khi thêm công cụ mới
  }

  onGetAllCookingTool(): void {
    this.cookingtoolService.getAllCookingTools().subscribe(
      (response: any) => {
        this.Cookingtool = response;
      },
      (error) => {
        console.error('Error fetching cooking tools:', error);
      }
    );
  }

  updateTool() {
    console.log('Updating CookingTools:', this.cookingtools);

    // Truyền toàn bộ danh sách công cụ hiện tại sang service
    this.createRecipeDataService.updateRecipeTool(this.cookingtools);
  }
}
