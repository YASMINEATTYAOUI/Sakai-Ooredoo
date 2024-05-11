import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductsComponent },
		{ path: ":id", component: ProductDetailsComponent}
	])],
	exports: [RouterModule]
})
export class ProductsRoutingModule  { }
