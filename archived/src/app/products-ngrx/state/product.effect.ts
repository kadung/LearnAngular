import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/types/product';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {}

    @Effect() loadProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionType.Load),
        mergeMap(
            action => this.productService.getProducts().pipe(
                map((products: Product[]) => (new productActions.LoadSuccess(products))),
                catchError(err => of(new productActions.LoadFail(err)))
            )
        )
    );

    @Effect() updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionType.UpdateProduct),
        map(
            (action: productActions.UpdateProduct) => action.payload
        ),
        mergeMap(
            (product: Product) => this.productService.updateProduct(product).pipe(
                map((updatedProduct: Product) => (new productActions.UpdateProductSuccess(updatedProduct))),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    );

    @Effect() deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionType.DeleteProduct),
        map(
            (action: productActions.DeleteProduct) => action.payload
        ),
        mergeMap(
            (productId: number) => this.productService.deleteProduct(productId).pipe(
                map((updatedProduct: Product[]) => (new productActions.DeleteProductSuccess(updatedProduct))),
                catchError(err => of(new productActions.DeleteProductFail(err)))
            )
        )
    )

}