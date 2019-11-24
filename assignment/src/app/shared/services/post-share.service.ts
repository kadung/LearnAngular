import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError, Subscription } from 'rxjs';

import { Post } from '../models/post.model';
import { post } from 'selenium-webdriver/http';

@Injectable({ providedIn: 'root' })
export class PostsShareService {
    posts = new Subject<Post[]>();
    error = new Subject<string>();
    isLoaded = new Subscription<boolean>();

    constructor(private http: HttpClient) { }

    createPost(postData: Post) {
        return this.http
            .post<{ name: string }>(
                'https://learnangular-d5ce1.firebaseio.com/posts.json',
                postData
            );
    }

    fetchPosts() {
        this.isLoaded.next(true);
        this.http
            .get<{ [key: string]: Post }>('https://learnangular-d5ce1.firebaseio.com/posts.json')
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    this.posts.next(postsArray);
                    this.isLoaded.next(false);
                }),
                catchError(error => {
                    this.error.next(error);
                    this.isLoaded.next(false);
                })
            );
    }

    deletePosts() {
        return this.http.delete(
            'https://learnangular-d5ce1.firebaseio.com/posts.json'
        );
    }
}
