import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ForgetPasswordService } from 'src/app/demo/service/services/forget-password.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ChangePassword } from 'src/app/demo/models/change-password'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  providers: [MessageService]
})
export class ForgotPwdComponent implements OnInit {
  forgetPasswordForm: FormGroup;

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
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  sendOtp() {
    if (this.forgetPasswordForm.valid) {
      this.email = this.forgetPasswordForm.get('email').value;
      this.forgetPasswordService.verifyEmail(this.email).subscribe(
        response => {
          if (response.status == 200) {
            this.expression = true
          }
          console.log('Response from server:', response);
          if (response && response.message) {
            alert(response.message);
          } else {
            alert('Unexpected response format from server.');
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status == 200) {
            this.expression = true;
            return;
          }
          console.error('Error:', error);
          alert('Failed to send email. Server returned ' + error.status + ' error.');
        }
      );
    } else {
      alert('Please enter a valid email');
    }
  }
}