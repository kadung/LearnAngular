import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable, from } from 'rxjs';

import { Product } from '../../data-types/product';
import { ProductService } from '../product.service';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer'
import * as productActions from '../state/product.action'

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  products$: Observable<Product[]>;
  showProductCode$: Observable<boolean>;
  currentProduct$: Observable<Product>;
  errorMessage$: Observable<string>;


  constructor(private store: Store<any>,
              private productService: ProductService) { }

  ngOnInit(): void {
    // Get data from backend and save to store when the component is initialize
    this.store.dispatch(new productActions.Load);

    // Get the required data from store using selector
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.showProductCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
    this.currentProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
  }

  ngOnDestroy(): void {
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.TongleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct);
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product))
  }

}
