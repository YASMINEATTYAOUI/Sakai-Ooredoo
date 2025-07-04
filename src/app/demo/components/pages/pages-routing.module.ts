import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'account-management', loadChildren: () => import('./account-management/account-management.module').then(m => m.AccountManagementModule) },
        { path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
        { path: 'order', loadChildren: () => import('./orders/order.module').then(m=> m.OrderModule)},
        { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m=> m.ClientsModule)},
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
