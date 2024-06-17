import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChangePassword } from 'src/app/demo/models/change-password';
import { ForgetPasswordService } from 'src/app/demo/service/services/forget-password.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  providers: [MessageService]
})
export class OtpComponent implements OnInit{

  otpForm: FormGroup;

  expression: boolean = false;

  otp: number;

  constructor(
    public layoutService: LayoutService,
    private forgetPasswordService: ForgetPasswordService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      otp: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.otpForm.value);
    // handle form submission
  }

}