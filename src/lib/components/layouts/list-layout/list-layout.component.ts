import { Component, ChangeDetectorRef, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ListLayoutComponent)
    }
  ]
})
export class ListLayoutComponent extends LayoutComponent<any> {
  /** Optional */

  @Input()
  align: string = 'center center';

  @Input()
  scrollable: boolean = false;

  @Input()
  direction: 'row' | 'column' = 'column';

  @Input()
  gap: string = this.XL_GAP;

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }
}
