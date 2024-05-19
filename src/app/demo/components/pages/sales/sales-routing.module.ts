import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: 'brands', loadChildren: () => import('../sales/brands/brands.module').then(m => m.BrandsModule) },
    { path: 'categories', loadChildren: () => import('../sales/categories/categories.module').then(m => m.CategoriesModule) },
    { path: 'themes', loadChildren: () => import('../sales/themes/themes.module').then(m => m.ThemesModule) },
    { path: 'colors', loadChildren: () => import('../sales/colors/colors.module').then(m => m.ColorsModule) },
    { path: 'products', loadChildren: () => import('../sales/products/products.module').then(m => m.ProductsModule) },
    { path: 'packages', loadChildren: () => import('../sales/packages/packages.module').then(m => m.PackagesModule) },
    { path: 'empty', loadChildren: () => import('../empty/emptydemo.module').then(m => m.EmptyDemoModule) },
    { path: 'timeline', loadChildren: () => import('../timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
    { path: '**', redirectTo: '/notfound' }
])],
exports: [RouterModule]
})
export class SalesRoutingModule { }
