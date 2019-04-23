import { Component, Output, EventEmitter, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { AbstractForm } from '../forms/abstract.form';
import { CustomForm } from '../forms/custom.form';

@Component({
  selector: 'ren-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => SliderComponent)
    }
  ]
})
export class SliderComponent extends CustomForm {

  /** Required if used as a CustomForm*/
  @Input()
  controlName: string;

  @Input()
  initialValue: number = 0;

  /** Optional */
  @Input()
  max: number = 8;

  @Input()
  min: number = 0;

  @Input()
  step: number = 1;

  @Input()
  label: string; // Hidden if omitted

  @Input()
  description: string; // Hidden if omitted

  @Input()
  autoTicks: boolean = true;

  @Input()
  disabled: boolean = false;

  @Input()
  invert: boolean = false;

  @Input()
  showTicks: boolean = true;

  @Input()
  thumbLabel: boolean = true;

  @Input()
  vertical: boolean = false;

  @Input()
  color: 'primary' | 'accent' | 'warn' = 'accent';

  /** Outputs */
  @Output()
  valueChanges = new EventEmitter<number>();

  constructor(protected changeDetectionRef: ChangeDetectorRef) {
    super(changeDetectionRef);
  }

}
