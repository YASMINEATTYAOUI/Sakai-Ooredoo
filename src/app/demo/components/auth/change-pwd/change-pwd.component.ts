import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChangePassword } from 'src/app/demo/models/change-password';
import { ForgetPasswordService } from 'src/app/demo/service/services/forget-password.service';
import { SharedDataService } from 'src/app/demo/utils/shared-data.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  providers: [MessageService]
})
export class ChangePwdComponent implements OnInit {
  changePasswordForm: FormGroup;

  expression: boolean = false;

  email: string;
  otp: number;
  changePassword: ChangePassword = { password: '', confirmPassword: '' };

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  constructor(
    public layoutService: LayoutService,
    private forgetPasswordService: ForgetPasswordService,
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
  }

  resetPassword() {
    
    console.log(this.sharedDataService.email)
    if (this.changePasswordForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter passwords.' });
      return;
    }
    if (this.changePasswordForm.get('password').value !== this.changePasswordForm.get('confirmPassword').value) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Passwords do not match!' });
      return;
    }

    this.email = this.sharedDataService.email;

    this.forgetPasswordService.resetPassword(this.email, this.changePassword).subscribe(
      response => {
        if (response.status == 200) {
          this.expression = true
          this.messageService.add({ severity: 'success', summary: 'OTP Verified', detail: 'OTP verified successfully.' });
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password has been changed!' });
      },
      error => {
        if (error.status == 200) {
          this.expression = true
          this.messageService.add({ severity: 'success', summary: 'OTP Verified', detail: 'OTP verified successfully.' });
          this.router.navigate(['/auth/login']);
        }
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to change password' });
      }
    );

  }
}