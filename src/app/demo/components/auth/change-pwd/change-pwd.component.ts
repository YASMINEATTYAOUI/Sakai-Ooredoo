import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChangePassword } from 'src/app/demo/models/change-password';
import { ForgetPasswordService } from 'src/app/demo/service/services/forget-password.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  providers: [MessageService]
})
export class ChangePwdComponent implements OnInit{
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
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  resetPassword() {
    if (this.changePassword.password !== this.changePassword.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.forgetPasswordService.resetPassword(this.email, this.changePassword).subscribe(
      response => {
        console.log(response);
        alert('Password has been changed!');
      },
      error => {
        console.error(error);
        alert('Failed to change password');
      }
    );
  }
}