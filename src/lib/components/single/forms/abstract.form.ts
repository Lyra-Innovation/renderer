import { EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { BaseComponent } from '../../base.component';

export abstract class AbstractForm extends BaseComponent implements OnInit {
  /** Optional */
  @Input()
  initialValue: any = '';

  @Input()
  controlName: string;

  /** Outputs */
  @Output()
  valueChanges = new EventEmitter<any>();

  // The form control reference for this component
  formControl: FormControl;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.formControl = new FormControl(this.initialValue, this.getValidators());
  }

  protected getValidators(): ValidatorFn[] {
    return [];
  }

  public getComponentForm() {
    return this.formControl;
  }

  public getCssClasses() {
    return super.getCssClasses() + ' renderer-form-widget';
  }
}
