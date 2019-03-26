import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';

@Component({
  selector: 'ren-route-container',
  templateUrl: './route-container.component.html',
  styleUrls: ['./route-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RouteContainerComponent extends LayoutComponent<any> {

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
