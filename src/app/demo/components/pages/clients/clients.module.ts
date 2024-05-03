import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { ClientsRouterModule } from './clients-router.module';



@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    ClientsRouterModule,
  ]
})
export class ClientsModule { }
