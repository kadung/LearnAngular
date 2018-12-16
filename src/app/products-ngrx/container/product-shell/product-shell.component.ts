import { Component, OnInit } from '@angular/core';

import { Product } from '../../../types/product';
import { ProductService } from '../../product.service';
import { Subscription, Observable, from } from 'rxjs';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../state/product.reducer'
import * as productActions from '../../state/product.action'

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  // Container data
  products$: Observable<Product[]>;
  showProductCode$: Observable<boolean>;
  currentProduct$: Observable<Product>;
  errorMessage$: Observable<string>;


  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    // Get data from backend and save to store when the component is initialize
    this.store.dispatch(new productActions.Load);

    // Get the required data from store using selector
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.showProductCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
    this.currentProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.TongleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct);
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
