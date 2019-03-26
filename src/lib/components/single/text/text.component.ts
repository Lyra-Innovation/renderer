import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => TextComponent)
    }
  ]
})
export class TextComponent extends BaseComponent {
  /** Required */
  @Input()
  text: string;

  /** Optional */
  @Input()
  href: string;

  @Input()
  title: string;

  @Input()
  align: string = 'center';

  @Input()
  type:
    | 'page-title'
    | 'page-subtitle'
    | 'content-title'
    | 'content-subtitle'
    | 'paragraph'
    | 'label'
    | 'sublabel' = 'paragraph';

  constructor() {
    super();
  }
}
