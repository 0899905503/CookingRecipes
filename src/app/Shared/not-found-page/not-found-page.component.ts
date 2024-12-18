import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  @Input() Title!: string;
  @Input() Content!: string;

  constructor(private router: Router) {}

  onBackToHomePage() {
    return this.router.navigate(['/home']);
  }
}
