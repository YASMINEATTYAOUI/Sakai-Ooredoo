import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeliveriesComponent } from './deliveries.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: DeliveriesComponent}
  ])],
  exports: [RouterModule]
})
export class DeliveriesRoutingModule { }
