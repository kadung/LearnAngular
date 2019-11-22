import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    constructor(private http: HttpClient) { }

    getEmails() {
        return this.http.get('assets/users.json').pipe(
            delay(1000),
            map((users: User[]) => {
                let emails = [];

                users.forEach(user => {
                    if (user) {
                        emails.push(user.email)
                    }
                });
                return emails;
            })
        );
    }
}