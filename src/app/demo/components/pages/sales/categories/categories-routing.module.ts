import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { CategoryDetailsComponent } from './category-details/category-details.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: CategoriesComponent},
    { path: ":id", component: CategoryDetailsComponent}
  ])],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
