import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
    { path: 'deliveries', loadChildren: () => import('../orders/deliveries/deliveries.module').then(m => m.DeliveriesModule) },
    
])],
exports: [RouterModule]
})
export class OrderRoutingModule { }
