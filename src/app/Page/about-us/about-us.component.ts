import { Component } from '@angular/core';
import { NotFoundPageComponent } from '../../Shared/not-found-page/not-found-page.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NotFoundPageComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {}
