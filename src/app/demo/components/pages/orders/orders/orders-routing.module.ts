import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: OrdersComponent},
    { path: ":id", component: OrderDetailsComponent}
  ])],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
