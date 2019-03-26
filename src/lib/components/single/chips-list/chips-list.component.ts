import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { BaseComponent } from '../../base.component';

interface Chip {
  name: string;
  color?: string;
  selected?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'ren-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ChipsListComponent)
    }
  ]
})
export class ChipsListComponent extends BaseComponent {
  /** Required */
  @Input()
  inputs: Chip[];

  /** Optional */
  @Input()
  stacked: boolean = false;

  @Input()
  chipsColor: 'primary' | 'accent' | 'warn' = 'warn';

  @Input()
  selectable: boolean = false;

  constructor() {
    super();
  }
}
