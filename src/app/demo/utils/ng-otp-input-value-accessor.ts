import { Directive, forwardRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';

@Directive({
  selector: 'ng-otp-input[formControlName], ng-otp-input[formControl], ng-otp-input[ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgOtpInputValueAccessor),
      multi: true,
    },
  ],
})
export class NgOtpInputValueAccessor implements ControlValueAccessor {
  private onChange: (value: any) => void;
  private onTouched: () => void;
  private isDisabled: boolean;

  constructor(private host: NgOtpInputComponent) {}

  writeValue(value: any): void {
    this.host.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.host.onInputChange.subscribe((value: any) => this.onChange(value));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('blur')
  handleBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.host['disabled'] = this.isDisabled;
  }
}
