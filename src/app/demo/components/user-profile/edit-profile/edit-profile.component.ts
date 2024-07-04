import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/demo/models/user';
import { UserService } from 'src/app/demo/service/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  currentUser: User;
  selectedFile: File | null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullName: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(50), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(15), Validators.required]],
      file: [null] // For avatar file upload
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Assuming you have a method to fetch current user details
    this.userService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
        this.profileForm.patchValue({
          username: this.currentUser.username,
          fullName: this.currentUser.fullName,
          email: this.currentUser.email,
          phoneNumber: this.currentUser.phoneNumber,
        });
        this.selectedFile = null;
      },
      error => console.error('Error fetching user data', error)
    );
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      const formData = new FormData();
      
      // Append user information fields
      formData.append('username', this.profileForm.get('username')?.value);
      formData.append('fullName', this.profileForm.get('fullName')?.value);
      formData.append('email', this.profileForm.get('email')?.value); // Ensure email is appended if necessary
      formData.append('phoneNumber', this.profileForm.get('phoneNumber')?.value);
  
      // Append file if selected
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
  
      // Call updateUser method in UserService
      this.userService.updateUser(this.currentUser.id, formData).subscribe({
        next: () => {
          console.log('User profile updated successfully');
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Profile Updated', life: 2000 });
          this.loadUserProfile();
        },
        error: (error) => {
          console.error('Update failed', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update Failed' });
        }
      });
    } else {
      console.error('Form validation failed');
      // Optionally, add a message to inform the user about form validation errors
    }
  }
}
