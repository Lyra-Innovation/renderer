import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'ren-mobile-shell',
  templateUrl: './mobile-shell.component.html',
  styleUrls: ['./mobile-shell.component.css']
})
export class MobileShellComponent extends LayoutComponent<any> {
  @Input()
  backgroundSrc: string;

  @Input()
  shellWidth: string = '56vh';

  @Input()
  mobileBreakpoint: string = '599px';

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected breakpointObserver: BreakpointObserver
  ) {
    super(componentResolver, changeDetectorRef);
  }

  getCssClasses() {
    return '';
  }

  getMaxWidth() {
    const isSmallScreen = this.breakpointObserver.isMatched(
      '(max-width: ' + this.mobileBreakpoint + ')'
    );

    return isSmallScreen ? 'none' : this.shellWidth;
  }
}
