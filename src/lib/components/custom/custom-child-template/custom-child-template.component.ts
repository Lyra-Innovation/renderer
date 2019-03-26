import {
  Component,
  ViewChild,
  TemplateRef,
  Input,
  ContentChildren,
  QueryList,
  forwardRef
} from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'ren-custom-child-template',
  templateUrl: './custom-child-template.component.html',
  styleUrls: ['./custom-child-template.component.css']
})
export class CustomChildTemplateComponent {
  /**
   * Wraps a child component in a templateRef and exposes that
   * To be used only in Layout elements
   *
   * This component is only needed because angular does not catch ViewChildrens inside <ng-template> tags
   * Wrapping the <ng-template> inside this component allows angular to render the child in the layout element
   * and then from layout.component.ts we can retrieve the reference to this templateRef
   */

  @Input()
  childKey: string;

  @ViewChild('content')
  public templateRef: TemplateRef<any>;

  @ViewChild(CdkPortal)
  public templatePortal: CdkPortal;

  @ContentChildren(forwardRef(() => BaseComponent), { descendants: true })
  public childrenComponents: QueryList<BaseComponent>;

  constructor() {}

}
