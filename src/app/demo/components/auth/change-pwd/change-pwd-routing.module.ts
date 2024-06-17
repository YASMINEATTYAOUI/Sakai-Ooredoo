import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangePwdComponent } from './change-pwd.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path : '', component : ChangePwdComponent
    }
  ])],
  exports: [RouterModule]
})
export class ChangePwdRoutingModule { }
