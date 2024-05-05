import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  constructor( private layoutService: LayoutService,
    private messageService: MessageService) {}

    onUpload(event: UploadEvent) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

}
