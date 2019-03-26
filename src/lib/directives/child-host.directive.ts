import {
  Directive,
  Input,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';

@Directive({
  selector: '[renChildHost]'
})
export class ChildHostDirective extends CdkPortalOutlet {
  @Input()
  renChildHost: string;

  constructor(
    _componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
  ) {
    super(_componentFactoryResolver, viewContainerRef);
  }
}
