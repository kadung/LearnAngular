import { NgModule } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacePile } from '../shared/convert-to-space.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id',canActivate: [ProductDetailGuard] , component: ProductDetailComponent }
    ]),
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacePile
  ]
})
export class ProductModule { }
