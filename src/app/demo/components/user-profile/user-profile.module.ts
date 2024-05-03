import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRouterModule } from './user-profile-router.module';
import { UserProfileComponent } from './user-profile.component';
import { OverlayModule } from 'primeng/overlay';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRouterModule,
    OverlayModule,
    DropdownModule,
    FileUploadModule,
    
  ]
})
export class UserProfileModule { }
