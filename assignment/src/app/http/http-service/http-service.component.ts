import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/models/post.model';
import { PostsDirectService } from 'src/app/shared/services/post-direct.service';
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
    this.loadedPostsSub.subscribe();
    this.isFetchingSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  // Component methods
  onAddPost(formData: Post) {
    this.postService.createPost(formData).subscribe(
      (res) => {
        console.log(res);
        this.fetchPosts();
      },
      (err) => {
        console.log(err)
      }
    );
  }

  fetchPosts() {
    this.postService.fetchPosts();
  }

  clearPosts() {
    this.postService.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onError() {
    this.error = null;
  }
}
