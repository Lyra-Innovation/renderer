import { Component, ChangeDetectorRef, forwardRef } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => FeedbackPageComponent)
    }
  ]
})
export class FeedbackPageComponent extends LayoutComponent<any> {
  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }
}
