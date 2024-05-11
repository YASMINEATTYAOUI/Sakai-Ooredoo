import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandsComponent } from './brands.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: BrandsComponent },
		{ path: ":id", component: BrandDetailsComponent}
	])],
	exports: [RouterModule]
})
export class BrandsRoutingModule { }
