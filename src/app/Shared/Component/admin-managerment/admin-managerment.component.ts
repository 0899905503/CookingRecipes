import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-managerment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-managerment.component.html',
  styleUrl: './admin-managerment.component.scss',
})
export class AdminManagermentComponent {
  recipes = [
    {
      name: 'Spaghetti Carbonara',
      category: 'Vegan',
      user: 'bavo844@gmail.com',
      date: '2025-02-24',
      status: 'Approved',
    },
    {
      name: 'Lasagna',
      category: 'Vegan',
      user: 'bavo844@gmail.com',
      date: '2025-02-24',
      status: 'Rejected',
    },
    {
      name: 'Pizza Margherita',
      category: 'Vegan',
      user: 'bavo844@gmail.com',
      date: '2025-02-24',
      status: 'Pending',
    },
    // Add more recipes here
  ];

  pages = [1, 2, 3, 4, 5];
  currentPage = 1;

  getStatusClass(status: string): string {
    return status;
  }
}
