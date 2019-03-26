import { Component, Input, forwardRef } from '@angular/core';
import { FormComponent } from '../form.component';
import { BaseComponent } from '../../../base.component';

interface Option {
  name: string;
  id: number | string;
  color?: string;
  checked?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'ren-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => RadioGroupComponent)
    }
  ]
})
export class RadioGroupComponent extends FormComponent {
  /** Required */
  @Input()
  options: Option[];

  /** Optional */
  @Input()
  color: 'primary' | 'accent' | 'warn' = 'primary';

  @Input()
  labelPosition: 'before' | 'after' = 'after';

  @Input()
  required: boolean = false;

  @Input()
  direction: 'column' | 'row' = 'column';

  constructor() {
    super();
  }
}
