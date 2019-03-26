import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ImageComponent)
    }
  ]
})
export class ImageComponent extends BaseComponent {
  /** Required */
  @Input()
  src: string;

  /** Optional */
  @Input()
  objectFit: string = 'contain';

  @Input()
  type: 'avatar' | 'main-screen' | 'page-title' | 'page-subtitle' | 'icon' | void = null;

  @Input()
  legend: string;

  constructor() {
    super();
  }
}
