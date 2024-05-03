import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule) },
        { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
        { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
