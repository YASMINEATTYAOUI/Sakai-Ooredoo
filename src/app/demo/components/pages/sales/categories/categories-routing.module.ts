import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: CategoriesComponent}
  ])],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
