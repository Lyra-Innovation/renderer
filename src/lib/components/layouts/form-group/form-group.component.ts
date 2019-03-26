import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewEncapsulation
} from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ren-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => FormGroupComponent)
    }
  ]
})
export class FormGroupComponent extends LayoutComponent<any>
  implements OnInit, AfterContentInit {
  // Put all initial values in this object
  /** Optional */
  @Input()
  initialValues: any;

  /** Output */
  @Output()
  formSubmitted = new EventEmitter<any>();

  @ContentChildren(ButtonComponent, { descendants: true })
  containingButtons: QueryList<ButtonComponent>;
  @ContentChildren(BaseComponent, { descendants: true })
  containingComponents: QueryList<BaseComponent>;

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }

  public patchValue(values: any) {
    for (const controlName of Object.keys(values)) {
      const ref = this.findChildRef(
        comp => 'controlName' in comp && comp['controlName'] == controlName
      );
      if (ref) {
        ref.patchValue(values[controlName]);
      }
    }
  }

  onChildrenRendered() {
    if (this.initialValues) {
      this.formGroup.patchValue(this.initialValues);
    }
    let submitButton = this.containingButtons.find(
      button => button.type === 'submit'
    );

    if (!submitButton && this.childrenKeys) {
      submitButton = <ButtonComponent>(
        this.findDescendantRef(
          ref => ref instanceof ButtonComponent && ref.type === 'submit'
        )
      );
    }

    if (submitButton) {
      submitButton.submittingForm = this.formGroup;
    }
  }

  submitForm() {
    this.formSubmitted.emit(this.formGroup.value);
  }
}
