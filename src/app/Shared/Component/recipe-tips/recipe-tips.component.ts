import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-tips',
  standalone: true,
  imports: [],
  templateUrl: './recipe-tips.component.html',
  styleUrl: './recipe-tips.component.scss',
})
export class RecipeTipsComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() time!: string;
  @Input() unit!: string;
  @Input() date!: string;
  @Input() imageUrl!: string;
}
