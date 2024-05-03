import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'users', loadChildren: () => import('../account-management/users/users.module').then(m => m.UsersModule) },
    { path: 'roles', loadChildren: () => import('../account-management/roles/roles.module').then(m => m.RolesModule) },
    { path: 'privileges', loadChildren: () => import('../account-management/privileges/privileges.module').then(m => m.PrivilegesModule) },
    { path: '**', redirectTo: '/notfound' }
])],
exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
