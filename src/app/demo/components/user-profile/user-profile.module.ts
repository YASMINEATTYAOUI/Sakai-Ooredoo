import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRouterModule } from './user-profile-router.module';
import { UserProfileComponent } from './user-profile.component';
import { OverlayModule } from 'primeng/overlay';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { PlusIcon } from 'primeng/icons/plus';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRouterModule,
    OverlayModule,
    DropdownModule,
    FileUploadModule,
    ToastModule,
    TranslateModule.forChild(),
  ],
  providers: [MessageService]
})
export class UserProfileModule { }
