import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';
  @Input() products: Product[];
  @Input() errorMessage: string;
  @Input() showProductCode: boolean;
  @Output() checked = new EventEmitter<boolean>();
  @Output() initalizeNewProduct = new EventEmitter();
  @Output() selected = new EventEmitter<Product>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newProduct(): void {
    this.initalizeNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.selected.emit(product);
  }

}
