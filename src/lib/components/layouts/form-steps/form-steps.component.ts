import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  EventEmitter,
  Output,
  forwardRef
} from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'ren-form-steps',
  templateUrl: './form-steps.component.html',
  styleUrls: ['./form-steps.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => FormStepsComponent)
    }
  ]
})
export class FormStepsComponent extends LayoutComponent<any> implements OnInit {
  /**
   * This component can be used with our without children forms
   * If there is children forms, it will collect the children submitted form values and emit the formSubmitted event
   */

  /** Optional */
  @Input()
  activeStep: number = 0;

  /** Outputs */
  @Output()
  formSubmitted = new EventEmitter<any>();

  formValues: Dictionary<any> = {};

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }

  protected getCssClasses() {
    return super.getCssClasses() + ' renderer-fill';
  }

  protected onChildrenRendered() {
    const activeStep = this.activeStep;
    this.activeStep = null;
    this.goToPage(activeStep);
  }

  private submitPage(value: any) {
    const childKey = this.childrenKeys[this.activeStep];
    this.formValues[childKey] = value;

    if (this.activeStep + 1 >= this.childrenKeys.length) {
      this.formSubmitted.emit(this.formValues);
    } else {
      this.goToPage(this.activeStep + 1);
    }
  }

  private goToPage(index: number) {
    if (this.activeStep !== index) {
      this.activeStep = index;
      const nextChildKey = this.childrenKeys[index];

      this.changeDetectorRef.detectChanges();

      setTimeout(() => {
        this.onChildEvent(nextChildKey, 'formSubmitted', $event =>
          this.submitPage($event)
        );
        if (this.formValues[nextChildKey]) {
          this.getChildRefs(nextChildKey)[0].patchValue(
            this.formValues[nextChildKey]
          );
        }
      });
    }
  }

  protected onBubbleEvent(name: string, params: any, event: any) {
    switch (name) {
      case 'submitPage':
        this.submitPage(params);
        break;
      case 'previousPage':
        this.goToPage(this.activeStep - 1);
        break;
      case 'goToPage':
        this.goToPage(params.pageIndex);
        break;

      default:
        break;
    }
  }
}
