import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CalendarComponent }
])],
exports: [RouterModule]
})
export class CalendarRoutingModule { }
