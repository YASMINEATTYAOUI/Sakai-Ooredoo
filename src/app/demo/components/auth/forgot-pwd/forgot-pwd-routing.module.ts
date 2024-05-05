import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotPwdComponent } from './forgot-pwd.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path : '', component : ForgotPwdComponent
    }
  ])],
  exports: [RouterModule]
})
export class ForgotPwdRoutingModule { }
