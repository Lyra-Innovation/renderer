import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'ren-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent
  extends LayoutComponent<'left-sidenav' | 'right-sidenav' | 'content'>
  implements OnDestroy {
  /**
   * Default behaviour is to show the sidenav opened in desktop and hidden in mobile
   * If 'responsive' is false, the sidenav will opened if 'opened' is true
   */

  /** Optional */
  @Input()
  responsive: boolean = true;

  @Input()
  logoutButton: boolean = false;

  @Input()
  mode: string;

  @Input()
  opened: boolean = false;

  @Input()
  openedRight: boolean = false;

  @Input()
  menuIcon: string = 'menu';

  /** Outputs */
  @Output()
  logout = new EventEmitter<void>();

  /** Private */
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    super(componentResolver, changeDetectorRef);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  protected onBubbleEvent(name: string, params: any, event: any) {
    switch (name) {
      case 'OpenMenu':
        this.opened = true;
        break;
      default:
        break;
    }
  }

}
