import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DiscountComponent } from './discount.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: DiscountComponent}
  ])],
  exports: [RouterModule]
})
export class DiscountRouterModule { }
