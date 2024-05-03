import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile.component';
import { ClientProfileRouterModule } from './client-profile-router.module';

@NgModule({
  declarations: [ClientProfileComponent],
  imports: [
    CommonModule,
    ClientProfileRouterModule
  ]
})
export class ClientProfileModule { }
