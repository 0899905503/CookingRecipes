import { filter } from 'rxjs/operators';
import { CookingTipService } from './../../Service/CookingTip/cooking-tip.service';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AdminManagermentComponent } from './../../Shared/Component/admin-managerment/admin-managerment.component';
import { MenuAdminComponent } from '../../Shared/Component/menu-admin/menu-admin.component';
import { HomepageService } from '../../Service/Homepage/homepage.service';
import { AdminService } from '../../Service/Admin/admin.service';
import { ImagePaths } from '../../Shared/Value/Constant/imageConstants';
import { DateUtils } from '../../Util/date-format-util';
import { AuthService } from '../../Service/Auth/Login/login.service';
import { RecipeCardComponent } from '../../Shared/Component/recipe-card/recipe-card.component';
import { Chart, registerables } from 'chart.js';
import { VisitServiceService } from '../../Service/Visit/visit-service.service';
// other imports
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    MenuAdminComponent,
    AdminManagermentComponent,
    RecipeCardComponent,
    TranslateModule,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  logo = ImagePaths.logo;
  IcSearch = ImagePaths.icSearch;

  @Output() toggle = new EventEmitter<void>();
  @Output() recipeSelected = new EventEmitter<number>();
  @ViewChild('userChart') userChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('recipeChart') recipeChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('commentChart') commentChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cookingTipChart')
  cookingTipChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('visitChart') visitChartRef!: ElementRef<HTMLCanvasElement>;

  isExpanded = true;
  activeItem = 'Dashboard';

  Recipe: any[] = [];
  Comment: any[] = [];
  CookingTip: any[] = []; // Chưa sử dụng, nhưng có thể dùng sau này

  paginatedComment: any[] = [];

  paginatedTip: any[] = [];
  isFilteringTip = false;

  allRecipes: any[] = [];
  filteredRecipes: any[] = [];
  paginatedRecipe: any[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  pages: number[] = [];

  selectedStatusFilter: string = '';
  selectedStatusTipFilter: string = '';
  selectedStatusCommentFilter: string = '';

  //REPORT
  report: any = {};

  //COMMENT
  isPopupOpen = false;
  selectedComment: any;
  commentStatus: string = '';

  //CHART
  userChart?: Chart;
  recipeChart?: Chart;
  commentChart?: Chart;
  cookingTipChart?: Chart; // Biểu đồ cho CookingTip, nếu cần
  visitChart?: Chart;
  selectedYear: number = new Date().getFullYear(); // mặc định là năm hiện tại
  //availableYears: number[] = []; // danh sách năm để hiển thị
  availableYears = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ];

  //VISIT
  totalToday: number = 0;
  totalThisWeek: number = 0;
  totalThisMonth: number = 0;
  totalThisYear: number = 0;
  visitByMonth: number[] = [];

  menuItems = [
    {
      icon: 'fas fa-tachometer-alt',
      label: 'Dashboard',
      labelKey: 'ADMIN_PAGE.MENU.DASHBOARD',
    },
    {
      icon: 'fas fa-utensils',
      label: 'Recipe',
      labelKey: 'ADMIN_PAGE.MENU.RECIPE',
    },
    {
      icon: 'fas fa-comment',
      label: 'Comment',
      labelKey: 'ADMIN_PAGE.MENU.COMMENT',
    },
    {
      icon: 'fas fa-bell',
      label: 'CookingTip',
      labelKey: 'ADMIN_PAGE.MENU.COOKINGTIP',
    },
    {
      icon: 'fas fa-file-alt',
      label: 'Report',
      labelKey: 'ADMIN_PAGE.MENU.REPORT',
    },

    {
      icon: 'fas fa-cog',
      label: 'Setting',
      labelKey: 'ADMIN_PAGE.MENU.SETTING',
    },
    {
      icon: 'fas fa-question-circle',
      label: 'Support',
      labelKey: 'ADMIN_PAGE.MENU.SUPPORT',
    },
  ];
  email = '';
  avatar = '';

  //DASHBOARD
  totalRecipes = 0;
  totalViews = 0;
  totalUsers = 0;
  averageRating = 0;
  latestRecipes: any[] = [];

  //translate
  currentLang: string = 'en';

  //icon
  iconMap: { [key: number]: string } = {
    1: 'fa-ice-cream',
    2: 'assets/images/breakfasticon.png',
    3: 'assets/images/lunchicon.png',
    4: 'assets/images/dinnericon.png',
    5: 'assets/images/desserticon.png',
    6: 'assets/images/quickbiteicon.png',
  };
  filteredCookingTip: any[] = [];
  filteredComment: any[] = [];

  constructor(
    private homepageService: HomepageService,
    private adminService: AdminService,
    private authService: AuthService,
    private translate: TranslateService,
    private visitService: VisitServiceService,
    private cookingTipService: CookingTipService,
    private router: Router
  ) {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.onGetReport(this.selectedYear);
    this.onGetAllRecipe();
    this.onGetComment();
    this.onGetCookingTip();
    this.email = localStorage.getItem('email') || '';
    this.avatar = localStorage.getItem('avt') || 'assets/default-avatar.png'; // fallback avatar
    this.onGet();
    this.updateAllCharts();
    this.loadAvailableYears();

    //visit
    this.logCurrentVisit();
  }
  getLocalizedField(item: any, field: string): string {
    if (this.currentLang === 'vi') {
      return item[field + 'VI'] || item[field] || '';
    }
    return item[field] || '';
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  setActive(label: string) {
    this.activeItem = label;
    this.currentPage = 1;

    if (label === 'Recipe') {
      this.filterRecipesByStatus();
    } else if (label === 'CookingTip') {
      this.filterCookingTipsByStatus(); // 👈 Gọi lọc cho CookingTip
    } else {
      this.updatePagination();
    }
  }

  // recipe-list.component.ts
  language: '' | undefined; // hoặc 'en' nếu mặc định là tiếng Anh

  getLocalizedText(): string {
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    return this.currentLang;
  }

  onGetAllRecipe(): void {
    this.homepageService.getAllRecipe().subscribe(
      (data) => {
        this.Recipe = data.map((recipe: any) => ({
          ...recipe,
          dateCreated:
            this.currentLang === 'vi'
              ? DateUtils.formatDateVI(recipe.dateCreated)
              : DateUtils.formatDate(recipe.dateCreated),
        }));

        this.filteredRecipes = [...this.Recipe];
        if (this.activeItem === 'Recipe') {
          this.filterRecipesByStatus();
        }
      },
      (error) => console.error('Error fetching recipes:', error)
    );
  }

  onGetComment(): void {
    this.adminService.getAllComment().subscribe(
      (data) => {
        this.Comment = data.map((comment: any) => ({
          ...comment,
          datePosted:
            this.currentLang === 'vi'
              ? DateUtils.formatDateVI(comment.datePosted)
              : DateUtils.formatDate(comment.datePosted),
        }));
        if (this.activeItem === 'Comment') {
          this.updatePagination();
        }
      },
      (error) => console.error('Error fetching comments:', error)
    );
  }

  onGetCookingTip(): void {
    this.cookingTipService.getAllCookingTips().subscribe(
      (data) => {
        this.CookingTip = data.map((tip: any) => ({
          ...tip,
          dateCreated:
            this.currentLang === 'vi'
              ? DateUtils.formatDateVI(tip.dateCreated)
              : DateUtils.formatDate(tip.dateCreated),
        }));
        if (this.activeItem === 'CookingTip') {
          this.updatePagination();
        }
      },
      (error) => console.error('Error fetching cooking tips:', error)
    );
  }

  updatePagination(): void {
    let dataSource: any[] = [];

    if (this.activeItem === 'Recipe') {
      dataSource = this.filteredRecipes.length
        ? this.filteredRecipes
        : this.Recipe;
    } else if (this.activeItem === 'Comment') {
      dataSource = this.filteredComment.length
        ? this.filteredComment
        : this.Comment;
    } else if (this.activeItem === 'CookingTip') {
      dataSource = this.filteredCookingTip.length
        ? this.filteredCookingTip
        : this.CookingTip;
    }

    const totalPages = Math.ceil(dataSource.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    if (this.activeItem === 'Recipe') {
      this.paginatedRecipe = dataSource.slice(start, end);
    } else if (this.activeItem === 'Comment') {
      this.paginatedComment = dataSource.slice(start, end);
    } else if (this.activeItem === 'CookingTip') {
      this.paginatedTip = dataSource.slice(start, end);
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  filterRecipesByStatus(): void {
    if (this.selectedStatusFilter) {
      this.filteredRecipes = this.Recipe.filter(
        (recipe) => recipe.status === this.selectedStatusFilter
      );
    } else {
      this.filteredRecipes = [...this.Recipe];
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  filterCookingTipsByStatus(): void {
    this.isFilteringTip = !!this.selectedStatusTipFilter;
    if (this.selectedStatusTipFilter) {
      this.filteredCookingTip = this.CookingTip.filter(
        (tip) => tip.status === this.selectedStatusTipFilter
      );
    } else {
      this.filteredCookingTip = [...this.CookingTip];
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  filterCommentsByStatus(): void {
    if (this.selectedStatusCommentFilter) {
      this.filteredComment = this.Comment.filter(
        (tip) => tip.status === this.selectedStatusCommentFilter
      );
    } else {
      this.filteredComment = [...this.Comment];
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  getStatusText(status: string): string {
    if (this.currentLang === 'vi') {
      switch (status) {
        case 'Approved':
          return 'Đã duyệt';
        case 'Pending':
          return 'Chờ duyệt';
        case 'Rejected':
          return 'Từ chối';
        default:
          return status; // giữ nguyên nếu không khớp
      }
    } else {
      // Nếu là tiếng Anh hoặc ngôn ngữ khác thì giữ nguyên status trả về từ API
      return status;
    }
  }

  //DASHBOARD

  onGetReport(year: number): void {
    this.adminService.getReport(year).subscribe(
      (data) => {
        // Gán lại report
        this.report = data;

        // Format cho mostCommentedRecipe
        if (Array.isArray(this.report.mostCommentedRecipe)) {
          this.report.mostCommentedRecipe = this.report.mostCommentedRecipe.map(
            (item: any) => ({
              ...item,
              dateCreated:
                this.currentLang === 'vi'
                  ? DateUtils.formatDateVI(item.dateCreated)
                  : DateUtils.formatDate(item.dateCreated),
            })
          );
        }

        // Format cho recipesThisWeekList
        if (Array.isArray(this.report.recipeTimeStats?.recipesThisWeekList)) {
          this.report.recipeTimeStats.recipesThisWeekList.map((item: any) => {
            item.dateCreated =
              this.currentLang === 'vi'
                ? DateUtils.formatDateVI(item.dateCreated)
                : DateUtils.formatDate(item.dateCreated);
          });
        }

        // Format cho recipesThisMonthList
        if (this.report.recipeTimeStats?.recipesThisMonthList) {
          this.report.recipeTimeStats.recipesThisMonthList.map((item: any) => {
            item.dateCreated =
              this.currentLang === 'vi'
                ? DateUtils.formatDateVI(item.dateCreated)
                : DateUtils.formatDate(item.dateCreated);
          });
        }

        // Format cho recipesThisYearList
        if (this.report.recipeTimeStats?.recipesThisYearList) {
          this.report.recipeTimeStats.recipesThisYearList.map((item: any) => {
            item.dateCreated =
              this.currentLang === 'vi'
                ? DateUtils.formatDateVI(item.dateCreated)
                : DateUtils.formatDate(item.dateCreated);
          });
        }

        // Gọi cập nhật biểu đồ (nếu cần)
        this.updateAllCharts();
      },
      (error) => console.error('Error fetching comments:', error)
    );
  }

  onRecipeSelected(recipeId: number): void {
    this.recipeSelected.emit(recipeId); // Phát ra recipeId
  }
  updateAllCharts() {
    if (this.userChart) this.userChart.destroy();
    if (this.recipeChart) this.recipeChart.destroy();
    if (this.commentChart) this.commentChart.destroy();
    if (this.cookingTipChart) this.cookingTipChart.destroy();
    if (this.visitChart) this.visitChart.destroy();

    this.translate
      .get([
        'ADMIN_PAGE.REPORT.USER',
        'ADMIN_PAGE.REPORT.RECIPE',
        'ADMIN_PAGE.REPORT.COMMENT',
        'ADMIN_PAGE.REPORT.COOKING_TIP',
        'ADMIN_PAGE.REPORT.VISIT',
      ])
      .subscribe((translations) => {
        this.userChart = this.createChart(
          this.userChartRef,
          translations['ADMIN_PAGE.REPORT.USER'],
          this.report.userCreated,
          '#4BC0C0'
        );

        this.recipeChart = this.createChart(
          this.recipeChartRef,
          translations['ADMIN_PAGE.REPORT.RECIPE'],
          this.report.recipesCreated,
          '#EE6352'
        );

        this.commentChart = this.createChart(
          this.commentChartRef,
          translations['ADMIN_PAGE.REPORT.COMMENT'],
          this.report.commentCreated,
          '#AE00FF'
        );

        this.cookingTipChart = this.createChart(
          this.cookingTipChartRef,
          translations['ADMIN_PAGE.REPORT.COOKING_TIP'],
          this.report.cookingTipCreated,
          '#EE6352'
        );

        this.visitChart = this.createChart(
          this.visitChartRef,
          translations['ADMIN_PAGE.REPORT.VISIT'],
          this.visitByMonth,
          '#00FF1E'
        );
      });
  }

  // updateLineChart() {
  //   if (this.chart) {
  //     this.chart.destroy();
  //     this.chart = undefined;
  //   }
  //   if (this.lineChartRef) {
  //     const ctx = this.lineChartRef.nativeElement.getContext('2d');
  //     if (ctx) {
  //       this.chart = new Chart(ctx, {
  //         type: 'line',
  //         data: {
  //           labels: [
  //             'Tháng 1',
  //             'Tháng 2',
  //             'Tháng 3',
  //             'Tháng 4',
  //             'Tháng 5',
  //             'Tháng 6',
  //             'Tháng 7',
  //             'Tháng 8',
  //             'Tháng 9',
  //             'Tháng 10',
  //             'Tháng 11',
  //             'Tháng 12',
  //           ],
  //           datasets: [
  //             {
  //               label: 'Users Created',
  //               data: this.report.userCreated, // đảm bảo report.userCreated là mảng 12 số
  //               backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //               borderColor: 'rgba(75, 192, 192, 1)',
  //               borderWidth: 2,
  //               fill: true,
  //               tension: 0.3,
  //             },
  //             {
  //               label: 'Recipes Created',
  //               data: this.report.recipesCreated, // đảm bảo report.userCreated là mảng 12 số
  //               backgroundColor: 'rgba(233, 131, 67, 0.2)',
  //               borderColor: '#EE6352',
  //               borderWidth: 2,
  //               fill: true,
  //               tension: 0.3,
  //             },
  //             {
  //               label: 'Comment Created',
  //               data: this.report.commentCreated, // đảm bảo report.userCreated là mảng 12 số
  //               backgroundColor: 'rgba(199, 144, 205, 0.31)',
  //               borderColor: 'rgb(174, 0, 255)',
  //               borderWidth: 2,
  //               fill: true,
  //               tension: 0.3,
  //             },
  //             {
  //               label: 'Visit',
  //               data: this.visitByMonth, // đảm bảo report.userCreated là mảng 12 số
  //               backgroundColor: 'rgba(144, 205, 174, 0.31)',
  //               borderColor: 'rgb(0, 255, 30)',
  //               borderWidth: 2,
  //               fill: true,
  //               tension: 0.3,
  //             },
  //           ],
  //         },
  //         options: {
  //           responsive: true,
  //           plugins: {
  //             legend: { display: true },
  //           },
  //           scales: {
  //             y: { beginAtZero: true },
  //           },
  //         },
  //       });
  //     }
  //   }
  // }
  // Nếu muốn reset chart khi chuyển tab:
  // ngOnChanges() {
  //   if (this.chart && this.activeItem !== 'Report') {
  //     this.chart.destroy();
  //     this.chart = undefined;
  //   }
  // }
  createChart(
    ref: ElementRef<HTMLCanvasElement>,
    label: string,
    data: number[],
    color: string
  ): Chart {
    const ctx = ref.nativeElement.getContext('2d')!;

    const currentLang = this.translate.currentLang;

    const monthLabelsVi = [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ];

    const monthLabelsEn = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const labels = currentLang === 'vi' ? monthLabelsVi : monthLabelsEn;

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: color + '33', // opacity
            borderColor: color,
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  //Get year
  loadAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 2020; // tùy bạn, năm bắt đầu thống kê
    this.availableYears = [];

    for (let year = startYear; year <= currentYear; year++) {
      this.availableYears.push(year);
    }
  }

  // Ví dụ trong component hoặc service
  //VISIT
  logCurrentVisit() {
    const currentRoute = 'admin'; // Hoặc dùng this.router.url nếu bạn inject Router
    // Bạn có thể lấy ipAddress, userAgent từ nơi nào đó nếu cần (thường userAgent từ navigator.userAgent)
    const ipAddress = 'unknow';
    const userAgent = navigator.userAgent;
    // Nếu bạn có ipAddress từ server hoặc dịch vụ, có thể truyền vào, hoặc để undefined
    this.visitService.logVisit(currentRoute, ipAddress, userAgent).subscribe();
  }
  onGet(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1;
    const dd = today.toISOString().slice(0, 10); // yyyy-MM-dd

    // 🔹 Tổng theo ngày
    this.visitService.getTotalByDate(dd).subscribe((total) => {
      this.totalToday = total;
    });

    // 🔹 Tổng theo tuần
    const weekNumber = this.getWeekNumber(today);
    this.visitService.getTotalByWeek(yyyy, weekNumber).subscribe((total) => {
      this.totalThisWeek = total;
    });

    // 🔹 Tổng theo tháng
    this.visitService.getTotalByMonth(yyyy).subscribe((total) => {
      this.totalThisMonth = total;
      this.visitByMonth = total;
    });

    // 🔹 Tổng theo năm
    this.visitService.getTotalByYear(yyyy).subscribe((total) => {
      this.totalThisYear = total;
    });
  }

  // ✅ Hàm tính số tuần trong năm (ISO Week)
  getWeekNumber(date: Date): number {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  goToCookingTipDetail(cookingTipId: number) {
    this.router.navigate(['/cookingTip', cookingTipId], {
      state: { fromAdmin: true },
    });
  }

  //COMMENT
  openPopup(comment: any) {
    this.selectedComment = comment;
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  checkComment(commentId: number, comment: any, checkStatus: boolean) {
    if (checkStatus) {
      this.commentStatus = 'Approved';
    } else {
      this.commentStatus = 'Rejected';
    }
    const updateComment = {
      commentText: comment.commentText,
      userId: comment.userId,
      recipeId: comment.recipeId,
      rating: comment.rating,
      datePosted: comment.datePosted,
      status: this.commentStatus,
    };

    this.adminService.updateComment(commentId, updateComment).subscribe({
      next: (response) => {
        if (this.commentStatus === 'Approved') {
          alert('Bình luận đã được chấp nhận');
        } else if (this.commentStatus === 'Rejected') {
          alert('Bình luận đã bị từ chối');
        } else {
          alert('Đã xóa bình luận');
        }
        this.router.navigate(['home']);
      },
      error: (error) => {
        alert('Chưa cập nhật được');
      },
    });
  }

  removeComment(commentId: number) {
    this.adminService.deleteComment(commentId).subscribe({
      next: (response) => {
        alert('Đã xóa bình luận');
        this.router.navigate(['home']);
      },
    });
    console.log('Recipe rejected successfully');
  }
}
