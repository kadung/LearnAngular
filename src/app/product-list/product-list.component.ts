import { Component, OnInit } from '@angular/core';
import { Product } from '../data-types/product';
import { ProductServive } from '../products/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  constructor(private productService: ProductServive,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log("Initalize action !!!");
    this.showImage = !!this.route.snapshot.queryParamMap.get('showImage');
    console.log("Show image: " + this.showImage);
    this.productService.getProduct().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = error
    );
    
  }

  pageTitle: String = "Product list";

  showImage:boolean;
  imageWidth:number = 50;
  imageMargin:number = 2;

  filteredProducts: Product[];
  products: Product[] = []
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
  }

  performFilter(filteredBy: string): Product[] {
    filteredBy = filteredBy.toLowerCase();
    return this.products.filter((product: Product) => product.productName.toLowerCase()
            .indexOf(filteredBy)!== -1);
  }  

  tongleImage(): void {
    this.showImage = !this.showImage;
  }

  starNotify(value: string): void{
    console.log(value);
  }
}
