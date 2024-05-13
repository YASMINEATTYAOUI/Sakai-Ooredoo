import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemesComponent } from './themes.component';



@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: ThemesComponent},
  ])],
  exports: [RouterModule]
})
export class ThemesRoutingModule { }
