import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './components/posts/post-list/post-list.componnet';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
