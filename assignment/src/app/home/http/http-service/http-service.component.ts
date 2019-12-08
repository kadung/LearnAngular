import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post.model';
import { PostsShareService } from 'src/app/shared/services/post-share.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-http-service',
  templateUrl: './http-service.component.html',
})
export class HttpServiceComponent implements OnInit {
  // Component variables
  private loadedPosts$: Observable<Post[]>;
  private error$: Observable<string>;
  private isFetching$: Observable<boolean>;

  constructor(private postService: PostsShareService) { }

  ngOnInit() {
    this.fetchPosts();
    this.loadedPosts$ = this.postService.posts;
    this.error$ = this.postService.error;
    this.isFetching$ = this.postService.isLoaded;
  }

  // Component methods
  onAddPost(formData: Post) {
    this.postService.createPost(formData);
  }

  fetchPosts() {
    this.postService.fetchPosts();
  }

  clearPosts() {
    this.postService.deletePosts();
  }

  onError() {
    this.error$ = new Observable<string>();
  }
}
