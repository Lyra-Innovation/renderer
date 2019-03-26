import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef
} from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ProgressComponent)
    }
  ]
})
export class ProgressComponent extends BaseComponent {

  /** Optional */
  @Input()
  type: 'bar' | 'spinner' = 'spinner';

  @Input()
  mode: 'determinate' | 'indeterminate' = 'indeterminate';

  @Input()
  progress: number;

  @Input()
  color: 'accent';

  constructor() {
    super();
  }
}
