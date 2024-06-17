import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { ChangePwdComponent } from './change-pwd.component';
import { ChangePwdRoutingModule } from './change-pwd-routing.module';

@NgModule({
  declarations: [
    ChangePwdComponent
  ],
  imports: [
    CommonModule,
    ChangePwdRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    PasswordModule,
    HttpClientModule
  ]
})

export class ChangePwdModule { }
