import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ForgetPasswordService } from 'src/app/demo/service/services/forget-password.service';
import { SharedDataService } from 'src/app/demo/utils/shared-data.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  providers: [MessageService]
})
export class OtpComponent implements OnInit {

  otpForm: FormGroup;

  expression: boolean = false;
  email: string;
  otp: number;


  constructor(
    public layoutService: LayoutService,
    private forgetPasswordService: ForgetPasswordService,
    private formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.email = this.sharedDataService.email;
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.otpForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter OTP.' });
      return;
    }

    const otp = this.otpForm.value.otp;

    this.email = this.sharedDataService.email;
    console.log(this.email)
    this.forgetPasswordService.verifyOtp(otp, this.email).subscribe(
      response => {
        if (response.status == 200) {
          this.expression = true
          this.messageService.add({ severity: 'success', summary: 'OTP Verified', detail: 'OTP verified successfully.' });
        
        }
      },
      error => {
        if (error.status == 200) {
          this.expression = true;
          this.messageService.add({ severity: 'success', summary: 'OTP Verified', detail: 'OTP verified successfully.' });

        } else {
          console.error('Error verifying OTP:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to verify OTP. Please try again.' });
        }
      }
    );
  }
}