import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Input
} from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => DividerComponent)
    }
  ]
})
export class DividerComponent extends BaseComponent {
  /** Optional */
  @Input()
  color: 'primary' | 'accent' | 'warn' = 'accent';

  @Input()
  vertical: boolean = false;

  @Input()
  inset: boolean = false;
}
