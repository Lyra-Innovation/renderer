import { Component, ChangeDetectorRef, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { ComponentRendererService } from '../../../services/component-renderer.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => LoginComponent)
    }
  ]
})
export class LoginComponent extends LayoutComponent<any> {

  /** Optional */
  @Input()
  idType: 'username' | 'email' = 'username';

  @Input()
  color: 'primary' | 'accent' | 'warn' = 'primary';

  /** Output */
  @Output()
  login = new EventEmitter<any>();

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }

  submitLogin($event) {
    this.login.emit($event);
  }
}
