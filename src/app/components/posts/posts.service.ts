import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((response) => {
          return response.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((response) => {
        this.posts = response;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostupdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((response) => {
        const postId = response.postId;
        post.id = postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + id)
      .subscribe((response) => {
        const updatedPosts = this.posts.filter((post) => post.id !== id);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .put<any>('http://localhost:3000/api/posts/' + id, post)
      .subscribe((respose) => {
        const updatedPost = [...this.posts];
        const oldPostIndex = updatedPost.findIndex((p) => p.id === post.id);
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
}
