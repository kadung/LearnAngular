import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Post } from '../models/post.model';
import { ErrorHandler } from '../common/error-handler';

@Injectable({ providedIn: 'root' })
export class PostsDirectService {
    constructor(private http: HttpClient) { }

    createPost(postData: Post) {
        return this.http
            .post<{ name: string }>(
                'https://learnangular-d5ce1.firebaseio.com/posts.json',
                postData
            );
    }

    fetchPosts() {
        return this.http
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
                }),
            );
    }

    deletePosts() {
        return this.http.delete(
            'https://learnangular-d5ce1.firebaseio.com/posts.json'
        );
    }
}
