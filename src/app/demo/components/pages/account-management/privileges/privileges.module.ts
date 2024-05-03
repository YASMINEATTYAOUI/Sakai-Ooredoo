import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivilegesComponent } from './privileges.component';
import { PrivilegesRouterModule } from './privileges-router.module';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [PrivilegesComponent],
  imports: [
    CommonModule,
    PrivilegesRouterModule,
    CheckboxModule, 
  ]
})
export class PrivilegesModule { }
