import { NgModule } from '@angular/core';
import { PackagesComponent } from './packages.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: PackagesComponent}
  ])],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
