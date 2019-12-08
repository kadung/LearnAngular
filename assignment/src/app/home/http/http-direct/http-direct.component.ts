import { Component, OnInit } from '@angular/core';
import { PostsDirectService } from 'src/app/shared/services/post-direct.service';
import { Post } from 'src/app/shared/interfaces/post.model';
import { ErrorHandlers } from 'src/app/shared/common/error-handler';

@Component({
  selector: 'app-http-direct',
  templateUrl: './http-direct.component.html',
})
export class HttpDirectComponent implements OnInit{
  loadedPosts: Post[] = [];
  error = null;
  isFetching = false;

  constructor(private postService: PostsDirectService) { }

  ngOnInit() {
    this.fetchPosts();
  }

  onAddPost(formData: Post) {
    this.postService.createPost(formData).subscribe(
      () => {
        this.fetchPosts();
      },
      (errRes) => {
        this.error = ErrorHandlers.httpErrorHandler(errRes);
      }
    );
  }

  fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (postsArray) => {
        this.isFetching = false;
        this.loadedPosts = postsArray;
      },
      (errRes) => {
        this.error = ErrorHandlers.httpErrorHandler(errRes);
      }
    );
  }

  clearPosts() {
    this.postService.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      },
      (errRes) => {
        this.error = ErrorHandlers.httpErrorHandler(errRes);
      }
    )
  }

  onError() {
    this.error = null;
  }

}
