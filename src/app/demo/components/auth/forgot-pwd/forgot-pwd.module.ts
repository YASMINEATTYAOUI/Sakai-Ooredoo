import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ForgotPwdComponent } from './forgot-pwd.component';
import { ForgotPwdRoutingModule } from './forgot-pwd-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    ForgotPwdComponent
  ],
  imports: [
    CommonModule,
    ForgotPwdRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    PasswordModule,
  ]
})
export class ForgotPwdModule { }
