import { Post } from './../post.model';
import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  onEditPost() {}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        form.value.id,
        form.value.title,
        form.value.content
      );
    }
    form.reset();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((post) => {
          this.isLoading = false;
          console.log(post);
          this.post = {
            id: post._id,
            title: post.title,
            content: post.content,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
