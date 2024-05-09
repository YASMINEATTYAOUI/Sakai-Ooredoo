import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrivilegesComponent } from './privileges.component';

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: PrivilegesComponent }
	])],
	exports: [RouterModule]
})
export class PrivilegesRouterModule { }
