import { AdminManagermentComponent } from './../../Shared/Component/admin-managerment/admin-managerment.component';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  NgModule,
} from '@angular/core';
import { MenuAdminComponent } from '../../Shared/Component/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { ImagePaths } from '../../Shared/Value/Constant/imageConstants';
import { HomepageService } from '../../Service/Homepage/homepage.service';
import { AdminService } from '../../Service/Admin/admin.service';
import { DateUtils } from '../../Util/date-format-util';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    MenuAdminComponent,
    AdminManagermentComponent,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  logo = ImagePaths.logo;
  @Output() toggle = new EventEmitter<void>();
  isExpanded = true;

  IcSearch = ImagePaths.icSearch;

  // Raw data
  Recipe: any[] = [];
  Comment: any[] = [];

  // Paginated data
  paginatedComment: any[] = [];
  allRecipes: any[] = []; // dữ liệu gốc từ server
  filteredRecipes: any[] = []; // kết quả sau khi lọc
  paginatedRecipe: any[] = []; // dữ liệu cho trang hiện tại

  // Pagination control
  currentPage = 1;
  itemsPerPage = 10;
  pages: number[] = [];
  selectedStatusFilter: string = '';

  activeItem = 'Dashboard';

  constructor(
    private homepageService: HomepageService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.onGetAllRecipe();
    this.onGetComment();
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  setActive(label: string) {
    this.activeItem = label;
    this.currentPage = 1;

    if (label === 'Recipe') {
      this.filterRecipesByStatus(); // Áp dụng lại lọc khi chuyển tab
    } else {
      this.updatePagination();
    }
  }

  menuItems = [
    { icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { icon: 'fas fa-utensils', label: 'Recipe' },
    { icon: 'fas fa-comment', label: 'Comment' },
    { icon: 'fas fa-file-alt', label: 'Reports' },
    { icon: 'fas fa-bell', label: 'Notifications' },
    { icon: 'fas fa-cog', label: 'Settings' },
    { icon: 'fas fa-question-circle', label: 'Support' },
  ];

  onGetAllRecipe(): void {
    this.homepageService.getAllRecipe().subscribe(
      (data) => {
        this.Recipe = data.map((recipe: any) => ({
          ...recipe,
          dateCreated: DateUtils.formatDate(recipe.dateCreated),
        }));

        this.filteredRecipes = [...this.Recipe]; // ban đầu hiển thị tất cả
        if (this.activeItem === 'Recipe') {
          this.filterRecipesByStatus(); // Lọc theo trạng thái nếu có
        }
      },
      (error) => console.error('Error fetching recipes:', error)
    );
  }

  onGetComment(): void {
    this.adminService.getAllComment().subscribe(
      (data) => {
        this.Comment = data;
        this.Comment = data.map((recipe: any) => ({
          ...recipe,
          datePosted: DateUtils.formatDate(recipe.datePosted),
        }));
        if (this.activeItem === 'Comment') {
          this.updatePagination();
        }
      },
      (error) => console.error('Error fetching comments:', error)
    );
  }

  updatePagination(): void {
    let dataSource: any[] = [];

    if (this.activeItem === 'Recipe') {
      dataSource = this.filteredRecipes.length
        ? this.filteredRecipes
        : this.Recipe;
    } else if (this.activeItem === 'Comment') {
      dataSource = this.Comment;
    }

    const totalPages = Math.ceil(dataSource.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    if (this.activeItem === 'Recipe') {
      this.paginatedRecipe = dataSource.slice(start, end);
    } else if (this.activeItem === 'Comment') {
      this.paginatedComment = dataSource.slice(start, end);
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  getStatusClass(status: string): string {
    return 'status status-' + status.toLowerCase();
  }

  filterRecipesByStatus(): void {
    if (this.selectedStatusFilter) {
      this.filteredRecipes = this.Recipe.filter(
        (recipe) => recipe.status === this.selectedStatusFilter
      );
    } else {
      this.filteredRecipes = [...this.Recipe]; // Nếu chọn "All", hiển thị tất cả
    }

    this.currentPage = 1; // Reset về trang đầu sau khi lọc
    this.updatePagination(); // Cập nhật lại phân trang
  }
}
