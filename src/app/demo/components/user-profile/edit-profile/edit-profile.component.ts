import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { User } from 'src/app/demo/models/user';
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';
import { UserService } from 'src/app/demo/service/services/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent {

  profileForm: FormGroup;
  currentUser: User;
  submitted: boolean = false;
  messages: Message[];

  constructor(
    private layoutService: LayoutService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {
    this.profileForm = this.formBuilder.group({
      id: [''],
      username: [''], // Ensure this matches the template fields
      fullName: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(50), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(15), Validators.required]],
      file: [null]
    });
  }

  onUpload(event: any) {
    const file = event.files[0];
    if (file) {
      this.profileForm.patchValue({ avatar: file });
    }
  }

  ngOnDestroy() { }

  loadUserProfile(): void {
    this.authService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
        this.userService.getUserById(this.currentUser.id).subscribe(
          userData => {
            this.profileForm.patchValue({
              username: userData.username,
              fullName: userData.fullName,
              email: userData.email,
              phoneNumber: userData.phoneNumber,
            });
          },
          error => console.error('Error fetching user data', error)
        );
      },
      error => console.error('Error fetching user data', error)
    );
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  save(): void {
    this.submitted = true;
    if (this.profileForm.valid) {
      const data = this.profileForm.value;
      this.userService.updateUser(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Profile Updated', life: 2000 });
          this.loadUserProfile(); // Refresh profile data
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' }),
        complete: () => { this.submitted = false; }
      });
    }
  }
}
