import { Component, ChangeDetectorRef, Input, forwardRef, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => StepperComponent)
    }
  ]
})
export class StepperComponent extends LayoutComponent<any> implements OnInit {
  /** Required */
  @Input()
  activeStepIndex: number;

  @Input()
  labels: string[];

  /** Optional */
  @Input()
  labelPosition: string = 'bottom';

  @Input()
  clickable: boolean = false;

  @Input()
  direction: 'vertical' | 'horizontal' = 'horizontal';

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }

  ngOnInit() {
    if (typeof this.labels === 'string') {
      this.labels = (<string>this.labels).split(',');
    }
  }
}
