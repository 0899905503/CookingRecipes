import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../Service/Recipe/recipe-service.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent {
  selectedPeriod = 'week';
  top3: any[] = [];
  others: any[] = [];

  // Dữ liệu gốc từ API, giữ lại để chuyển đổi theo period
  rankingData: { weekly: any[]; monthly: any[]; yearly: any[] } = {
    weekly: [],
    monthly: [],
    yearly: [],
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRankingData();
  }

  loadRankingData(): void {
    this.recipeService.getRanks().subscribe({
      next: (res: any) => {
        // Lấy phần data từ response
        if (res && res.data) {
          this.rankingData.weekly = res.data.weekly || [];
          this.rankingData.monthly = res.data.monthly || [];
          this.rankingData.yearly = res.data.yearly || [];
          // Sau khi lấy xong dữ liệu, cập nhật lại UI theo period hiện tại
          this.onRankingData();
        }
      },
      error: (err) => {
        console.error('Error loading ranking data', err);
      },
    });
  }

  onRankingData(): void {
    // Lấy dữ liệu theo period đã chọn
    let arr: any[] = [];
    switch (this.selectedPeriod) {
      case 'week':
        arr = this.rankingData.weekly;
        break;
      case 'month':
        arr = this.rankingData.monthly;
        break;
      case 'year':
        arr = this.rankingData.yearly;
        break;
    }

    // Cắt lấy top 3 và phần còn lại
    this.top3 = arr.slice(0, 3);
    this.others = arr.slice(3);
  }
}
