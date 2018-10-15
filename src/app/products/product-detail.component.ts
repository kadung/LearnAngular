import { Component, OnInit } from '@angular/core';
import { ProductServive } from '../service/product.service';
import { IProduct } from '../service/product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product:IProduct;
  pageTitle: string = 'Product Detail';

  constructor(private productService: ProductServive) { }

  ngOnInit() {
    //this.product = this.product
  }

}
