import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

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
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((response) => {
        console.log(response.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(id: string) {
    this.http
      .delete('http://localhost:3000/api/posts' + id)
      .subscribe((response) => {
        console.log('Deleted!!');
      });
  }
}
