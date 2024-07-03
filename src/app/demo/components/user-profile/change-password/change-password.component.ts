import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChangePassword } from 'src/app/demo/models/change-password';
import { User } from 'src/app/demo/models/user';
import { AuthenticationService } from 'src/app/demo/service/services/authentication.service';
import { UserService } from 'src/app/demo/service/services/user.service';
import { SharedDataService } from 'src/app/demo/utils/shared-data.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {

  currentUser: User;

  changePasswordForm: FormGroup;

  expression: boolean = false;

  email: string;
  changePassword: ChangePassword = { password: '', confirmPassword: '' };

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  constructor(
    public layoutService: LayoutService,
    private userService: UserService,
    private authService: AuthenticationService,
    private sharedDataService: SharedDataService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
        this.email = this.currentUser.email;
      },
      error => console.error('Error fetching user data', error)
    );
  }

  ChangePassword() {
    if (this.changePasswordForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter passwords.' });
      return;
    }
    if (this.changePasswordForm.get('password').value !== this.changePasswordForm.get('confirmPassword').value) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Passwords do not match!' });
      return;
    }

    if (!this.currentUser) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not found' });
      return;
    }

    const changePassword = {
      password: this.changePasswordForm.value.password,
      confirmPassword: this.changePasswordForm.value.confirmPassword
    };

    this.userService.changePassword(changePassword, this.email).subscribe(
      response => {
        if (response.status == 200) {
          this.expression = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password has been changed!' });
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password has been changed!' });
      },
      error => {
        if (error.status == 200) {
          this.expression = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password has been changed!' });
          this.router.navigate(['dashboard/user-profile']);
        }
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to change password' });
      }
    );
  }
}