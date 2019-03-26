import {
  Injectable,
  ComponentFactoryResolver,
  Inject,
  QueryList,
  Type,
  ComponentRef,
  EventEmitter,
  OnDestroy,
  ComponentFactory
} from '@angular/core';
import {
  COMPONENT_RELATION,
  ComponentRelation,
  ComponentData,
  LayoutData,
  EventData,
  CUSTOM_COMPONENT_RELATION
} from '../renderer.model';
import { ChildHostDirective } from '../directives/child-host.directive';
import { BaseComponent } from '../components/base.component';
import { CustomTemplateComponent } from '../components/custom/custom-template/custom-template.component';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { LayoutComponent } from '../components/layouts/layout.component';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ComponentRendererService implements OnDestroy {
  localComponentRelation: ComponentRelation;

  protected subscriptions: Subscription[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_RELATION)
    private globalComponentRelation: ComponentRelation,
    @Inject(CUSTOM_COMPONENT_RELATION)
    private customComponentRelation: ComponentRelation
  ) {}

  /**
   * Initializes this service for the core-view and its descendants
   *
   * This method should only be called from the core-view, and provides
   * the overridden components for the core-view descendant tree
   * @param forKeys all the templates to be overridden for the given keys
   * @param forTypes all the templates to be overridden for the given types
   */
  public initLocalRelation(
    customTemplates: QueryList<CustomTemplateComponent>
  ): void {
    const keys = customTemplates.reduce((templates, template) => {
      templates[template.forKey] = template;
      return templates;
    }, {});
    const types = customTemplates.reduce((templates, template) => {
      templates[template.forType] = { type: template };
      return templates;
    }, {});

    const componentRelation = _.merge(
      this.globalComponentRelation,
      this.customComponentRelation
    );

    this.localComponentRelation = {
      keys: {
        ...componentRelation.keys,
        ...keys
      },
      types: {
        ...componentRelation.types,
        ...types
      }
    };
  }

  /**
   * Returns the appropiate component to render given its type and key
   * Priority: key in the type > key > type
   * @param type type of the component
   * @param key key of the component inside the layout
   * @returns the object to render for the given type and key
   */
  private getRenderable(
    type: string,
    key?: string
  ): Type<any> | CustomTemplateComponent {
    let renderable: Type<any> | TemplatePortal;

    if (!(type in this.localComponentRelation.types)) {
      console.error(
        `[RENDERER ERROR] Type ${type} does not exist on the component relation: ${JSON.stringify(
          this.localComponentRelation
        )}`
      );
      return null;
    }

    if (this.localComponentRelation.types[type]) {
      if (
        key &&
        this.localComponentRelation.types[type].keys &&
        key in this.localComponentRelation.types[type]
      ) {
        renderable = this.localComponentRelation.types[type].keys[key];
      } else if (key && key in this.localComponentRelation.keys) {
        renderable = this.localComponentRelation.keys[key];
      } else {
        renderable = this.localComponentRelation.types[type].type;
      }
    } else {
      const factories = Array.from(
        this.componentFactoryResolver['_factories'].keys()
      );
      renderable = <Type<any>>factories.find((x: any) => x.name === type);
    }

    return renderable;
  }

  /**
   * Renders the component for the given config, event bindings and host
   * @param childData the data of the component to render
   * @param bindings the event bindings for the component to render
   * @param childHost the host in which the component will render
   */
  public renderLayout(
    childData: ComponentData,
    childHost: ChildHostDirective
  ): ComponentRef<any> {
    const childKey = childHost.renChildHost;
    const renderable = this.getRenderable(childData.type, childKey);

    // Clear previous component
    childHost.detach();
    childHost.viewContainerRef.clear();

    let componentInstance;
    let factory;

    if (renderable instanceof CustomTemplateComponent) {
      componentInstance = renderable;
      childHost.attachTemplatePortal(renderable.customTemplate.first);
    } else {
      factory = this.componentFactoryResolver.resolveComponentFactory(
        renderable
      );
      componentInstance = childHost.viewContainerRef.createComponent(factory)
        .instance;

      componentInstance.data = childData;

      // Bind the component values and events
      this.bindComponentValues(componentInstance, childData);
      this.bindComponentEvents(componentInstance, childData);

      if (componentInstance instanceof LayoutComponent) {
        this.bindComponentChildren(componentInstance, <LayoutData>childData);
      }
    }

    return componentInstance;
  }

  /**
   * Bind the inputs of the rendering component to the given configuration values
   */
  private bindComponentValues(
    componentRef: ComponentRef<any>,
    componentData: ComponentData
  ) {
    for (const valueKey of Object.keys(componentData.values)) {
      componentRef[valueKey] = componentData.values[valueKey];
    }
  }

  /**
   * Bind the outputs of the rendering component to the given configuration events
   */
  private bindComponentEvents(
    componentRef: BaseComponent,
    componentData: ComponentData
  ) {
    if (componentData.events) {
      for (const eventKey of Object.keys(componentData.events)) {
        if (eventKey in componentRef) {
          const subscription = (<EventEmitter<any>>(
            componentRef[eventKey]
          )).subscribe(event =>
            componentData.events[eventKey].forEach((eventData: EventData) =>
              eventData.handler(componentRef, event)
            )
          );
          this.subscriptions.push(subscription);
        } else {
          console.error(
            `[RENDERER ERROR] Value ${eventKey} not found in component ${
              componentData.type
            }`
          );
        }
      }
    }
  }

  /**
   * Bind the children data of the given component
   */
  private bindComponentChildren(
    componentRef: LayoutComponent<any>,
    componentData: LayoutData
  ) {
    componentRef.childrenData = componentData.children;
  }

  ngOnDestroy() {
    // Unsubscribe for all subscription for memory efficiency
    this.subscriptions.forEach(subs => subs.unsubscribe);
  }
}
