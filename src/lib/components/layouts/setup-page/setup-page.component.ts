import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ren-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => SetupPageComponent)
    }
  ]
})
export class SetupPageComponent extends LayoutComponent<any> {
  /** Required, omitted if null */
  @Input()
  imageSrc: string;

  @Input()
  title: string;

  @Input()
  subtitle: string;

  @Input()
  description: string;

  /** Optional */
  @Input()
  imageType: string = 'page-subtitle';

  /** Output */
  @Output()
  formSubmitted = new EventEmitter<any>();

  formComponent: BaseComponent;

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }

  protected onChildRendered(childKey: string, component: BaseComponent) {
    super.onChildRendered(childKey, component);
    this.formComponent = component;
    this.formGroup = <FormGroup>component.getComponentForm();
    this.onChildEvent(childKey, 'formSubmitted', $event =>
      this.formSubmitted.emit($event)
    );
  }

  protected getCssClasses() {
    return ' renderer-fill';
  }

  public patchValue(values: any) {
    this.formComponent.patchValue(values);
  }
}
