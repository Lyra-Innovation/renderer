import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Input,
  forwardRef
} from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => GridListComponent)
    }
  ]
})
export class GridListComponent extends LayoutComponent<any> {
  /** Reference: https://material.angular.io/components/grid-list/overview#setting-the-row-height */

  /** Optional */
  @Input()
  cols: number = 3;

  @Input()
  rowHeight: string = 'fit';

  @Input()
  clickable: boolean = false;

  /** Output */
  @Output()
  itemClick = new EventEmitter<string>();

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
