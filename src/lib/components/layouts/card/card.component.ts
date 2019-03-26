import { Component, ChangeDetectorRef, forwardRef, ViewEncapsulation } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => CardComponent)
    }
  ]
})
export class CardComponent extends LayoutComponent<any> {
  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }

  protected getCssClasses() {
    return '';
  }
}
