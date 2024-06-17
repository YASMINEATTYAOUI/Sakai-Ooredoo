import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OtpComponent } from './otp.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path : '', component : OtpComponent
    }
  ])],
  exports: [RouterModule]
})
export class OtpRoutingModule { }
