import { Injectable } from "@angular/core";
import { Product } from "../types/product";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductServive{
    private productURL:string = 'api/products';

    constructor(private http: HttpClient) {}

    getProduct(): Observable<Product[]>{
        return this.http.get<Product[]>(this.productURL).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)       
        )
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            errorMessage = "An error occurred: ${err.error.message}";
        }
        else{
            errorMessage = "Server return code ${err.status}, error message is ${err.message}";
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}