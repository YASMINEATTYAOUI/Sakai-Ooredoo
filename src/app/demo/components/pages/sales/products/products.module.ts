import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { OverlayModule } from 'primeng/overlay';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,

        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
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
    ],
    declarations: [
        ProductsComponent,
        ProductDetailsComponent
    ]
})
export class ProductsModule { }
