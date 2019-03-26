import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { FormFieldComponent } from '../form-field.component';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'ren-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: BaseComponent, useExisting: forwardRef(() => TextareaComponent) }
  ]
})
export class TextareaComponent extends FormFieldComponent {
  /** Inherit properties from FormComponent
   * Required: label
   * Optional: validators, initialValue, errorMessage, hint, suffixIcon, prefixIcon placeholder, floatLabel
   * Outputs: valueChanges */

  /** Optional */
  @Input()
  color: 'primary' | 'accent' | 'warn' = 'accent';

  @Input()
  rows: number = 4;

  @Input()
  autosize: boolean = false;

  @Input()
  autosizeMinRows: number;

  @Input()
  autosizeMaxRows: number;

  constructor() {
    super();
  }
}
