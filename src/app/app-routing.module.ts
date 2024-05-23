import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AccessComponent } from './demo/components/auth/access/access.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'dashboard/pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'dashboard/calendar', loadChildren: () => import('./demo/components/calendar/calendar.module').then(m => m.CalendarModule) },
                    { path: 'dashboard/user-profile', loadChildren: () => import('./demo/components/user-profile/user-profile.module').then(m => m.UserProfileModule) },
                    { path: 'dashboard/notfound', component: NotfoundComponent },
                    { path: 'dashboard/access', component: AccessComponent },
                ]
            },

            { path: 'notfound', component: NotfoundComponent },
            { path: 'access', component: AccessComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
