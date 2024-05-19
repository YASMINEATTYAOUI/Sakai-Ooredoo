import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount.component';
import { DiscountRouterModule } from './discount-router.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DialogModule } from 'primeng/dialog';
import { RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [DiscountComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    DiscountRouterModule,
    FullCalendarModule,
    DialogModule
  ]
})
export class DiscountModule { }
