import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesComponent } from './themes.component';

@NgModule({
  declarations: [ThemesComponent],
  imports: [
    CommonModule,
    ThemesRoutingModule,
  ]
})
export class ThemesModule { }
