import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Post } from '../interfaces/post.model';
import { ErrorHandlers } from '../common/error-handler';

@Injectable({ providedIn: 'root' })
export class PostsShareService {
    posts = new BehaviorSubject<Post[]>([]);
    error = new BehaviorSubject<string>("");
    isLoaded = new BehaviorSubject<boolean>(false);

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
                (errRes) => {
                    this.error.next(ErrorHandlers.httpErrorHandler(errRes));
                }
            );;
    }

    fetchPosts() {
        this.isLoaded.next(true);
        this.http
            .get<{ [key: string]: Post }>('https://learnangular-d5ce1.firebaseio.com/posts.json')
            .pipe(
                retry(2),       // retry a failed request up to 2 times
                map(
                    (responseData) => {
                        const postsArray: Post[] = [];
                        for (const key in responseData) {
                            if (responseData.hasOwnProperty(key)) {
                                postsArray.push({ ...responseData[key], id: key });
                            }
                        }
                        return postsArray;
                    }
                ),
            )
            .subscribe(
                (postsArray) => {
                    this.posts.next(postsArray);
                    this.isLoaded.next(false);
                    this.error.next("");
                },
                (errRes) => {
                    this.error.next(ErrorHandlers.httpErrorHandler(errRes));
                    this.isLoaded.next(false);
                }
            );
    }

    deletePosts() {
        this.http
            .delete('https://learnangular-d5ce1.firebaseio.com/posts.json')
            .subscribe(
                () => {
                    this.error.next("");
                    this.posts.next([]);
                },
                (errRes) => {
                    this.error.next(ErrorHandlers.httpErrorHandler(errRes));
                }
            );
    }
}
