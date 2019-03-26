import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Location } from '@angular/common';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'ren-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ToolbarComponent)
    }
  ]
})
export class ToolbarComponent extends LayoutComponent<any> {
  /** Optional */
  @Input()
  title: string;

  @Input()
  backButton: boolean = false;

  @Input()
  menu: boolean = false;

  @Input()
  backHref: string;

  @Input()
  color: 'primary' | 'accent' | 'warn' = 'primary';

  @Input()
  align: string = 'space-between';

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private router: Router
  ) {
    super(componentResolver, changeDetectorRef);
  }

  back() {
    if (this.backHref) {
      this.router.navigateByUrl(this.backHref);
    } else if (this.backButton) {
      this.location.back();
    }
  }

  openMenu() {
    this.bubble.emit({
      eventName: 'OpenMenu',
      params: null,
      event: null
    });
  }

  protected getCssClasses() {
    return 'renderer-component';
  }
}
