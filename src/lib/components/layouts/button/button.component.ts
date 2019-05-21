import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { LayoutComponent } from '../layout.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ren-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ButtonComponent)
    }
  ]
})
export class ButtonComponent extends LayoutComponent<any> {
  /** Required if appearance != 'fab'*/
  @Input()
  text: string;

  /** Optional */
  @Input()
  icon: string;

  // When button is click, navigate to this url
  @Input()
  href: string;

  @Input()
  type: 'button' | 'submit' | 'reset' | 'menu' = 'button';

  @Input()
  appearance:
    | 'normal'
    | 'raised'
    | 'stroked'
    | 'flat'
    | 'fab'
    | 'icon'
    | 'bottom-bar' = 'normal';

  @Input()
  color: 'primary' | 'accent' | 'warn' = 'primary';

  @Input()
  disabled: boolean = false;

  @Input()
  tooltip: string;

  /** Outputs */
  @Output()
  click = new EventEmitter<any>();

  invalid: boolean = false;
  lastClick: number = 0;
  // Min time in ms between each click to be considered a click and emit an event
  MIN_CLICK_OFFSET = 200;

  subscription: Subscription;
  @Input()
  set submittingForm(submittingForm: FormGroup) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = submittingForm.valueChanges.subscribe(() => {
      this.invalid = submittingForm.invalid;
      this.changeDetectorRef.detectChanges();
    });
    this.subscriptions.push(this.subscription);

    this.invalid = submittingForm.invalid;
    this.changeDetectorRef.detectChanges();
  }

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(componentResolver, changeDetectorRef);
  }

  onClick($event) {
    if (Date.now() - this.lastClick > this.MIN_CLICK_OFFSET) {
      this.lastClick = Date.now();
      this.click.emit($event);

      if (this.href) {
        if (this.href.startsWith('..')) {
          this.router.navigate([this.href], {
            relativeTo: this.activatedRoute
          });
        } else if (this.href.startsWith('http')) {
          location.replace(this.href);
        } else {
          this.router.navigateByUrl(this.href);
        }
      }
    }
  }

  getCssClasses() {
    return this.appearance === 'bottom-bar' ? ' ren-button-bottom-bar' : '';
  }
}
