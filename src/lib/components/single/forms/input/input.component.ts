import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef
} from '@angular/core';
import { FormFieldComponent } from '../form-field.component';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'ren-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: BaseComponent, useExisting: forwardRef(() => InputComponent) }
  ]
})
export class InputComponent extends FormFieldComponent {
  /** Inherit properties from FormComponent
   * Required: label
   * Optional: validators, initialValue, errorMessage, hint, suffixIcon, prefixIcon placeholder, floatLabel
   * Outputs: valueChanges */

  /** Optional */
  @Input()
  type: 'text' | 'number' | 'password' = 'text';

  @Input()
  color: 'primary' | 'accent' | 'warn' = 'accent';

  constructor() {
    super();
  }
}
