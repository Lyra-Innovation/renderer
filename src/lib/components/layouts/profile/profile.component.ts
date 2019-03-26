import { Component, OnInit, ChangeDetectorRef, Input, forwardRef } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => ProfileComponent)
    }
  ]
})
export class ProfileComponent extends LayoutComponent<'content'> {

  /** Required */
  @Input()
  name: string;

  @Input()
  surname: string;

  @Input()
  imageSrc: string;

  /** Optional */
  @Input()
  description: string;

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }
}
