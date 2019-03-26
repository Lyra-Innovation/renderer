import { Component, ChangeDetectorRef, Input, forwardRef } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-menu-launcher',
  templateUrl: './menu-launcher.component.html',
  styleUrls: ['./menu-launcher.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => MenuLauncherComponent)
    }
  ]
})
export class MenuLauncherComponent extends LayoutComponent<'launcher' | any> {
  /**
   * If no launcher is given, the default will be an icon button with the given icon, default 'more_vert'
   *
   * Accepts buttons as children with numeric key, e.g:
   *
   * "type": "menu-launcher",
   *   "values": {},
   *   "children": {
   *     "0": {
   *       "type": "button",
   *       "values": {
   *         "type": "menu",
   *         "text": "ohla"
   *       }
   *     },
   *     "1": {
   *       "type": "button",
   *       "values": {
   *         "type": "menu",
   *         "text": "ohla2"
   *       }
   *     }
   *   }
   *
   * Buttons inside the 'content' should have type: 'menu'
   */

  /** Optional */
  @Input()
  icon: string = 'more_vert';

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }
}
