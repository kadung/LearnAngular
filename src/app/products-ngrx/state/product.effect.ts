import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productAction from './product.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/data-types/product';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {}

    @Effect() loadProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productAction.ProductActionType.Load),
        mergeMap(
            action => this.productService.getProducts().pipe(
                map( (products: Product[]) => (new productAction.LoadSuccess(products))),
                catchError(err => of(new productAction.LoadFail(err)))
            )
        )
    )
}