import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthenticationService } from '../../service/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {

  currentUser: any;

  constructor( 
    private layoutService: LayoutService,
    private messageService: MessageService,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.getCurrentUser();
  }


    onUpload(event: UploadEvent) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    getCurrentUser(): void {
      this.authService.getCurrentUser().subscribe(
          data => this.currentUser = data,
          error => console.error('Error fetching user data', error));
  }
}
