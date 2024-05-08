import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: OrdersComponent}
  ])],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
