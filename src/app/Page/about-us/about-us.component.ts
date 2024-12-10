import { Component } from '@angular/core';
import { RecipeTipsComponent } from '../../Shared/Component/recipe-tips/recipe-tips.component';
import { LoginComponents } from '../../Shared/login/login.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RecipeTipsComponent, LoginComponents],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {}
