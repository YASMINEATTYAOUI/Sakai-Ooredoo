import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientProfileComponent } from './client-profile.component';



@NgModule({
  imports: [RouterModule.forChild([
    {path : '' , component: ClientProfileComponent}
  ])],
  exports:[RouterModule]
})
export class ClientProfileRouterModule { }
