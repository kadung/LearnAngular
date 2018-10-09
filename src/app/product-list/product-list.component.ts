import { Component, OnInit } from '@angular/core';
import {IProduct} from './product'
import { ProductServive } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  constructor(private productService: ProductServive) {
  }

  ngOnInit() {
    console.log("Initalize action !!!");
    this.products = this.productService.getProduct();
    this.filteredProducts = this.products;
  }

  pageTitle: String = "Product list";

  showImage:boolean = false;
  imageWidth:number = 50;
  imageMargin:number = 2;

  filteredProducts: IProduct[];
  products: IProduct[] = []

  _listFilter: string;
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
  }

  performFilter(filteredBy: string): IProduct[] {
    filteredBy = filteredBy.toLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLowerCase()
            .indexOf(filteredBy)!== -1);
  }  

  tongleImage(): void {
    this.showImage = !this.showImage;
  }

  starNotify(value: string): void{
    console.log(value);
  }
}
