import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePaths } from '../../Value/Constant/imageConstants';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.scss',
})
export class MenuAdminComponent {
  logo = ImagePaths.logo;
  isExpanded = false;
  activeItem = 'Dashboard';

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  setActive(label: string) {
    this.activeItem = label;
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
}
