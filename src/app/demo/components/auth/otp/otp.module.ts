import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { OtpRoutingModule } from './otp-routing.module';
import { OtpComponent } from './otp.component';
//import { InputOtpModule } from 'primeng/inputotp';
import { NgOtpInputModule } from  'ng-otp-input';
import { NgOtpInputValueAccessor } from 'src/app/demo/utils/ng-otp-input-value-accessor';

@NgModule({
  declarations: [
    OtpComponent,
    NgOtpInputValueAccessor
  ],
  imports: [
    CommonModule,
    OtpRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    PasswordModule,
    HttpClientModule,
    NgOtpInputModule
  ]
})
export class OtpModule { }
