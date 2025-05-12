import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() userId!: string;
  @Input() commentText!: string;
  @Input() rating!: string;
  @Input() avatarUrl!: string;
  @Input() username!: string;
  @Input() email!: string;
  @Input() datePosted!: string;
  comments: any[] = [];
  newCommentText = '';

  ngOnInit(): void {
    this.comments = [];
  }

  // loadInitialComments(): void {
  //   this.comments = [];
  // }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
