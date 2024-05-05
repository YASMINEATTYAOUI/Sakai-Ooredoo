import { NgModule } from '@angular/core';
import { UnauthorizedComponent } from './unauthorized.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UnauthorizedComponent }
])],
exports: [RouterModule]
})
export class UnauthorizedRoutingModule { }
