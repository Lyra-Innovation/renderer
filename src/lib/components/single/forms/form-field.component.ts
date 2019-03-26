import { Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { FormComponent } from './form.component';

export abstract class FormFieldComponent extends FormComponent {
  /** Specification: https://material.angular.io/components/form-field */

  /** Required */
  @Input()
  label: string;

  /** Optional */
  @Input()
  appearance: 'outline' | 'standard' | 'fill' | 'legacy' = 'outline';

  @Input()
  errorMessage: string = 'CORE.globals.default-input-error-message';

  @Input()
  hint: string;

  @Input()
  suffixIcon: string;

  @Input()
  prefixIcon: string;

  @Input()
  placeholder: string;

  @Input()
  floatLabel: string = 'auto';

  constructor() {
    super();
  }

  public getErrorMessage(): string {
    if (this.required && !this.formControl.value) {
      return 'CORE.globals.default-empty-error-message';
    }

    return this.errorMessage;
  }
}
