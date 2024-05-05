import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: AuthComponent,
            children: [
                { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
                { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
                { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
                { path: 'forgot-pwd', loadChildren: () => import('./forgot-pwd/forgot-pwd.module').then(m => m.ForgotPwdModule) },
                { path: '**', redirectTo: '/notfound' }

            ]}])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
