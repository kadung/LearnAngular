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
    isLoaded = new Subject<boolean>();

    constructor(private http: HttpClient) { }

    createPost(postData: Post) {
        this.http
            .post<{ name: string }>(
                'https://learnangular-d5ce1.firebaseio.com/posts.json',
                postData
            )
            .subscribe(
                () => {
                    this.fetchPosts();
                },
                (err) => {
                    this.error.next(err.message);
                }
            );;
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
                    return postsArray;
                })
            )
            .subscribe(
                (postsArray) => {
                    this.posts.next(postsArray);
                    this.isLoaded.next(false);
                },
                (err) => {
                    this.error.next(err.message);
                    this.isLoaded.next(false);
                }
            );
    }

    deletePosts() {
        this.http
            .delete('https://learnangular-d5ce1.firebaseio.com/posts.json')
            .subscribe(
                () => {
                    this.posts.next([]);
                },
                (err) => {
                    this.error.next(err.message);
                }
            );
    }
}
