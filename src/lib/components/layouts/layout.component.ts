import {
  QueryList,
  ViewChildren,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  EventEmitter,
  Output,
  TemplateRef,
  Input,
  ComponentRef,
  ContentChildren,
  AfterContentInit
} from '@angular/core';
import { ChildHostDirective } from '../../directives/child-host.directive';
import { ComponentRendererService } from '../../services/component-renderer.service';
import {
  LayoutData,
  EventBinding,
  Dictionary,
  ComponentData
} from '../../renderer.model';
import { BaseComponent } from '../base.component';
import { FormGroup } from '@angular/forms';
import { CustomChildTemplateComponent } from '../custom/custom-child-template/custom-child-template.component';
import { Subscription } from 'rxjs';

export abstract class LayoutComponent<CHILDREN extends string>
  extends BaseComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  @Input()
  childrenData: { [child in CHILDREN]: LayoutData | ComponentData };

  @Input()
  orderChildrenBy:
    | {
        property: string;
        ascending?: boolean;
      }
    | {
        compare: string;
      };

  @Input()
  filterChildrenBy: {
    filter: string;
  };

  @Output()
  valueChanges = new EventEmitter<any>();

  // Holds all the hosts that this layout will contain
  @ViewChildren(ChildHostDirective)
  childrenHosts: QueryList<ChildHostDirective>;

  // Holds all the reference to the custom children templates
  // All children contained this way will not be renderer as usual,
  // it's up to the actual layout component to call getCustomChildrenTemplate()
  // and render the custom TemplateRef
  @ViewChildren(CustomChildTemplateComponent)
  customChildrenTemplate: QueryList<CustomChildTemplateComponent>;
  customChildrenTemplateRefs: Dictionary<TemplateRef<any>> = {};

  @ContentChildren(CustomChildTemplateComponent)
  projectedChildrenTemplates: QueryList<CustomChildTemplateComponent>;

  // Holds the bindings for the children components
  childrenEvents: EventBinding[];

  // The keys for all the children of this layout, as fetched from the server
  childrenKeys: CHILDREN[] = [];
  childrenRefs: Dictionary<Array<BaseComponent>> = {};

  childrenSubs: Dictionary<Dictionary<Subscription>> = {};

  formGroup = new FormGroup({});

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.childrenKeys = this.childrenData
      ? <CHILDREN[]>Object.keys(this.childrenData)
      : [];

    this.sortChildrenKeys();
    this.filterChildrenKeys();
  }

  sortChildrenKeys() {
    if (this.orderChildrenBy) {
      if ('property' in this.orderChildrenBy) {
        const property = this.orderChildrenBy.property;
        const ascending = this.orderChildrenBy.ascending
          ? this.orderChildrenBy.ascending
          : false;
        this.childrenKeys.sort((key1: string, key2: string) => {
          let property1 = this.childrenData[key1][property];
          let property2 = this.childrenData[key2][property];

          if (typeof property1 === 'string') {
            property1 = parseInt(property1, 10);
          }
          if (typeof property2 === 'string') {
            property2 = parseInt(property2, 10);
          }

          if (ascending) {
            return property1 - property2;
          } else {
            return property2 - property1;
          }
        });
      } else {
        // tslint:disable-next-line:no-eval
        this.childrenKeys.sort(eval(this.orderChildrenBy.compare));
      }
    }
  }

  filterChildrenKeys() {
    const values = this._data ? this._data.values : null;
    if (this.filterChildrenBy) {
      this.childrenKeys = this.childrenKeys.filter(
        // tslint:disable-next-line:no-eval
        eval(this.filterChildrenBy.filter)
      );
    }
  }

  ngAfterContentInit() {
    if (!this.childrenData) {
      this.childrenKeys = <CHILDREN[]>(
        this.projectedChildrenTemplates.map(template => template.childKey)
      );
    }
  }

  ngAfterViewInit() {
    this.renderChildren();
    this.childrenHosts.changes.subscribe(() => this.renderChildren());
  }

  renderChildren() {
    // Render the appropiate template for each child host
    this.childrenHosts.forEach(host => this.renderChild(host));
    this.changeDetectorRef.detectChanges();

    // Transform CustomChildTemplate directive in dictionary form to optimize access time
    this.customChildrenTemplate.forEach(
      customChildTemplate =>
        (this.customChildrenTemplateRefs[customChildTemplate.childKey] =
          customChildTemplate.templateRef)
    );

    // Subscribe to the value changes of the group and emit the event
    const subscription = this.formGroup.valueChanges.subscribe(value =>
      this.valueChanges.emit(value)
    );
    this.subscriptions.push(subscription);

    if (!this.childrenKeys) {
      this.childrenKeys = [];
    }

    this.childrenKeys.forEach(key => {
      if (this.childrenRefs[key]) {
        this.childrenRefs[key].forEach(ref => this.onChildRendered(key, ref));
      }
    });
    this.onChildrenRendered(this.childrenKeys);

    this.changeDetectorRef.detectChanges();
  }

  /**
   * Renders the appropiate child component for the given directive
   * @param childHost the container in which the component will render
   */
  protected renderChild(childHost: ChildHostDirective) {
    const childKey = childHost.renChildHost;

    let componentRefs = [];
    // Check if component is being rendered from the configuration json and has the requested child
    if (this.childrenData && this.childrenData[childKey]) {
      // If the children doesn't exist on the received data, do not render it
      componentRefs.push(
        this.componentResolver.renderLayout(
          this.childrenData[childKey],
          childHost
        )
      );
    } else {
      // Component is being renderer from another component, the Angular normal way
      // If child was included in customChildrenTemplate, render it
      const renderChildTemplate = this.projectedChildrenTemplates.find(
        childTemplate => childTemplate.childKey === childKey
      );

      if (renderChildTemplate) {
        childHost.attachTemplatePortal(renderChildTemplate.templatePortal);
        componentRefs = renderChildTemplate.childrenComponents.toArray();
      }
    }

    this.childrenRefs[childKey] = componentRefs;
  }

  /**
   * Function called when all children have been rendered
   */
  protected onChildrenRendered(childrenKeys: string[]) {}

  /**
   * Function called when all children have been rendered
   */
  protected onChildRendered(childKey: string, component: BaseComponent) {
    this.addControlForm(childKey, component);

    const subs = component.bubble.subscribe(value => this.bubble.emit(value));
    this.subscriptions.push(subs);
  }

  protected addControlForm(childKey: string, componentRef: BaseComponent) {
    const form = componentRef.getComponentForm();
    if (form) {
      this.formGroup.addControl(componentRef['controlName'] || childKey, form);
    }
  }

  public getComponentForm(): FormGroup {
    return this.formGroup && Object.keys(this.formGroup.controls).length > 0
      ? this.formGroup
      : null;
  }

  protected getCustomChildTemplate(childKey: string): TemplateRef<any> {
    return this.customChildrenTemplateRefs[childKey];
  }

  protected getChildRefs(childKey: string): Array<BaseComponent> {
    return this.childrenRefs[childKey];
  }

  public findChildRef(
    predicate: (component: BaseComponent) => boolean
  ): BaseComponent {
    for (const childKey of Object.keys(this.childrenRefs)) {
      for (const ref of this.childrenRefs[childKey]) {
        if (predicate(ref)) {
          return ref;
        }
      }
    }
    return null;
  }
  public findDescendantRef(
    predicate: (component: BaseComponent) => boolean
  ): BaseComponent {
    for (const childKey of Object.keys(this.childrenRefs)) {
      for (const ref of this.childrenRefs[childKey]) {
        if (predicate(ref)) {
          return ref;
        } else if (ref instanceof LayoutComponent) {
          const childRef = ref.findDescendantRef(predicate);
          if (childRef) {
            return childRef;
          }
        }
      }
    }
    return null;
  }

  protected onChildEvent(
    childKey: string,
    eventKey: string,
    handler: ($event: any) => void,
    unsubscribePrevious: boolean = true
  ) {
    if (this.childrenRefs[childKey]) {
      for (const ref of this.childrenRefs[childKey]) {
        if (ref[eventKey]) {
          if (!this.childrenSubs[childKey]) {
            this.childrenSubs[childKey] = {};
          }
          if (this.childrenSubs[childKey][eventKey] && unsubscribePrevious) {
            this.childrenSubs[childKey][eventKey].unsubscribe();
          }

          const subs = (<EventEmitter<any>>ref[eventKey]).subscribe(event =>
            handler(event)
          );

          this.childrenSubs[childKey][eventKey] = subs;
          this.subscriptions.push(subs);
        }
      }
    }
  }

  /**
   * @returns the list of css classes to apply to this component
   */
  protected getCssClasses(): string {
    return super.getCssClasses() + ' renderer-layout';
  }
}
