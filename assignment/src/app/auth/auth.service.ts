import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthResponse } from '../shared/models/auth-response.model';

@Injectable({
    providedIn: "root",
})
export class AuthService {
    API_Key = "AIzaSyCgBQDs7SL56Z4FacObjITa5tc4oSMgKUM";
    firebaseURI = "https://identitytoolkit.googleapis.com/v1/]"

    token: Subject<string>;

    constructor(private http: HttpClient) {}

    signup(email: string, password: string){
        return this.http.post<AuthResponse>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.API_Key,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        )
    }

    login(){
        this.http.post(
            "url",
            "body"
        )
    }
}