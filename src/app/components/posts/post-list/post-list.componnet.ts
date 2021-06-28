import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  // postList = [
  //   {
  //     title: 'First Post title',
  //     description: 'This is the first post content',
  //   },
  //   {
  //     title: 'Second Post title',
  //     description: 'This is the second post content',
  //   },
  //   {
  //     title: 'Third Post title',
  //     description: 'This is the third post content',
  //   },
  // ];
  @Input() posts: Post[] = [];

  constructor(public postService: PostsService) {}
}
