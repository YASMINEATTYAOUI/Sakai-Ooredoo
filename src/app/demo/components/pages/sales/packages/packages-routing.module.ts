import { NgModule } from '@angular/core';
import { PackagesComponent } from './packages.component';
import { RouterModule } from '@angular/router';
import { PackageDetailsComponent } from './package-details/package-details.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: PackagesComponent},
    { path: ":id", component: PackageDetailsComponent}
  ])],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
