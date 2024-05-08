import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesComponent } from './deliveries.component';
import { DeliveriesRoutingModule } from './deliveries-routing.module';

@NgModule({
  declarations:  [DeliveriesComponent],
  imports: [
    CommonModule,
    DeliveriesRoutingModule,
  ]
})
export class DeliveriesModule { }
