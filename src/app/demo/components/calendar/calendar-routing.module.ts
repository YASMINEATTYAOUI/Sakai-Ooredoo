import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CalendarComponent }
])],
exports: [RouterModule]
})
export class CalendarRoutingModule { }
