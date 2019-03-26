import { Input, OnInit } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';
import { AbstractForm } from './abstract.form';

export abstract class FormComponent extends AbstractForm implements OnInit {
  /** Optional */
  @Input()
  validators: string = null;

  required = false;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.subscriptions.push(
      this.formControl.valueChanges.subscribe(value =>
        this.valueChanges.emit(value)
      )
    );
  }

  protected getValidators() {
    return this.validators
      ? this.buildFormControlValidators(this.validators)
      : [];
  }

  /**
   * Parse validators inputs from JSON (e.g, 'Validators.required,Validators.minLength(4)'
   * into real Angular validators
   */
  buildFormControlValidators(validatorsString: string): ValidatorFn[] {
    const validators = [];
    const validatorsStringList = validatorsString.split(',');

    if (validatorsString.includes('required')) {
      this.required = true;
    }

    for (const validatorString of validatorsStringList) {
      const validatorProps = validatorString.split('.');

      // For now only accept 'Validators'
      if (validatorProps[0].includes('Validators')) {
        let validator: ValidatorFn;
        if (validatorProps[1].includes('(')) {
          const fnProps = validatorProps[1].split('(');
          const fnName = fnProps[0];
          const fnArgs = fnProps[1].slice(0, fnProps[1].length - 1).split(','); // Eliminate the ending ')'

          validator = Validators[fnName](...fnArgs);
        } else {
          validator = Validators[validatorProps[1]];
        }

        validators.push(validator);
      }
    }

    return validators;
  }

  public getComponentForm() {
    return this.formControl;
  }
}
