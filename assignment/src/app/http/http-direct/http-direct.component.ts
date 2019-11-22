import { Component, OnInit } from '@angular/core';
import { PostsDirectService } from 'src/app/shared/services/post-direct.service';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-http-direct',
  templateUrl: './http-direct.component.html',
  styleUrls: ['./http-direct.component.css']
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
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (postsArray) => {
        this.isFetching = false;
        this.loadedPosts = postsArray;
      },
      (err) => {
        this.error = err.message;
      }
    );

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
