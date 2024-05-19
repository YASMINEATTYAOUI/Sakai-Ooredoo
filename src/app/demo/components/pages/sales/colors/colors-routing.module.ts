import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ColorsComponent } from './colors.component';

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ColorsComponent },
	])],
	exports: [RouterModule]
})
export class ColorsRoutingModule { }
