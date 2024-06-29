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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    UserProfileComponent,
    ChangePasswordComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRouterModule,
    OverlayModule,
    DropdownModule,
    FileUploadModule,
    ToastModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    PasswordModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ],
  providers: [MessageService]
})
export class UserProfileModule { }
