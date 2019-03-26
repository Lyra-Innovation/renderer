import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef
} from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ErrorComponent)
    }
  ]
})
export class ErrorComponent extends BaseComponent {
  @Input()
  error: string | { message: string } = 'CORE.components.error.default-message';

  constructor() {
    super();
  }
}
