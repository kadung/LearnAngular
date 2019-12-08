import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { AuthResponse } from '../shared/interfaces/auth-response.model';
import { catchError } from 'rxjs/operators';
import { ErrorHandlers } from '../shared/common/error-handler';
import { User } from '../shared/models/user.model';
import { FireBaseConstants } from '../shared/constants/firebase.constant';

@Injectable({
    providedIn: "root",
})
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signup(email: string, password: string){
        this.http.post<AuthResponse>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + FireBaseConstants.API_Key,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        )
        .subscribe(
            // Continue
        )
    }

    login(email: string, password: string){
        return this.http.post<AuthResponse>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + FireBaseConstants.API_Key,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).pipe(
            catchError(ErrorHandlers.firebaseErrorHanler)
        )
    }
}