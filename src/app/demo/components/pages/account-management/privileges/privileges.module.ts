import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivilegesComponent } from './privileges.component';
import { PrivilegesRouterModule } from './privileges-router.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [PrivilegesComponent],
  imports: [
    CommonModule,
    PrivilegesRouterModule,
    CheckboxModule, 
    FormsModule,
		TreeModule,
		TreeTableModule,
    ToolbarModule,
    TableModule,
    FileUploadModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ReactiveFormsModule,
    PaginatorModule,
    TagModule,
    FieldsetModule,
    MessagesModule,
    InputSwitchModule,
    ConfirmDialogModule,
    TooltipModule,
    DividerModule,
    ChipsModule,
    AvatarModule,
    AvatarGroupModule,
    SelectButtonModule
  ]
})
export class PrivilegesModule { }
