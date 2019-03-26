import { OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractForm } from './abstract.form';

export abstract class CustomForm extends AbstractForm implements OnInit {
  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    const subs = this.valueChanges.subscribe(value =>
      this.formControl.patchValue(value)
    );
    this.subscriptions.push(subs);
  }

  public patchValue(value: any) {
    this.initialValue = value;
    this.valueChanges.emit(value);
    this.changeDetectorRef.detectChanges();
  }
}
