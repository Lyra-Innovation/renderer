import { Component, ChangeDetectorRef, Input, forwardRef } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => TabsComponent)
    }
  ]
})
export class TabsComponent extends LayoutComponent<any> {
  /** Required */
  @Input()
  set labels(labels: string[]) {
    if (typeof labels === 'string') {
      this._labels = (<string>labels).split(',');
    } else {
      this._labels = labels;
    }
  }

  /** Optional */
  @Input()
  color: 'primary' | 'accent' | 'warn' = 'primary';

  @Input()
  backgroundColor: 'primary' | 'accent' | 'warn';

  @Input()
  headerPosition: 'below' | 'above' = 'above';
  // Warning: not working yet
  @Input()
  stretch: boolean = true;

  _labels: string[];

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }

  protected getCssClasses() {
    return super.getCssClasses() + ' renderer-fill';
  }
}
