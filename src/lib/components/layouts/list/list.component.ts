import { Component, ChangeDetectorRef, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ListComponent)
    }
  ]
})
export class ListComponent extends LayoutComponent<any> {

  /** Optional */
  @Input()
  type: 'nav' | 'simple' = 'simple';

  @Input()
  emptyText: string = 'CORE.globals.empty';

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }
}
