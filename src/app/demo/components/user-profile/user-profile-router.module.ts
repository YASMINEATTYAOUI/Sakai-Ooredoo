import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UserProfileComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'change-password', component: ChangePasswordComponent },

])],
  exports:[RouterModule]
})
export class UserProfileRouterModule { }
