import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/models/post.model';
import { PostsShareService } from 'src/app/shared/services/post-share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-http-service',
  templateUrl: './http-service.component.html',
})
export class HttpServiceComponent implements OnInit, OnDestroy {
  // Component variables
  loadedPosts: Post[] = [];
  error = null;
  isFetching = false;

  // Subscription
  loadedPostsSub: Subscription;
  errorSub: Subscription;
  isFetchingSub: Subscription;

  constructor(private postService: PostsShareService) { }

  ngOnInit() {
    this.fetchPosts();
    this.loadedPostsSub = this.postService.posts.subscribe(
      (posts) => { this.loadedPosts = posts; }
    );
    this.errorSub = this.postService.error.subscribe(
      (error) => { this.error = error; }
    );
    this.isFetchingSub = this.postService.isLoaded.subscribe(
      (isLoading) => { this.isFetching = isLoading; }
    );
  }

  ngOnDestroy(){
    this.loadedPostsSub.unsubscribe();
    this.isFetchingSub.unsubscribe();
    this.errorSub.unsubscribe();
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
    this.error = null;
  }
}
