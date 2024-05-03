import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: RolesComponent }
	])],
	exports: [RouterModule]
})
export class RolesRoutingModule { }
