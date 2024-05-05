import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized.component';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [UnauthorizedComponent],
  imports: [
    CommonModule,
    UnauthorizedRoutingModule,
    ButtonModule
  ]
})
export class UnauthorizedModule { }
