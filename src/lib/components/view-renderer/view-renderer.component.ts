import {
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ContentChildren,
  Output,
  EventEmitter,
  HostBinding,
  Component
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventBinding, ComponentData, EventData } from '../../renderer.model';
import { ChildHostDirective } from '../../directives/child-host.directive';
import { CustomTemplateComponent } from '../custom/custom-template/custom-template.component';
import { ComponentRendererService } from '../../services/component-renderer.service';

import * as _ from 'lodash';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'ren-view-renderer',
  templateUrl: './view-renderer.component.html',
  styleUrls: ['./view-renderer.component.css'],
  providers: [ComponentRendererService]
})
export class ViewRendererComponent implements OnInit {
  _componentData: ComponentData;
  @Input()
  set componentData(componentData: ComponentData) {
    if (this.responseFromRoute && this._componentData) {
      return;
    }

    if (this._componentData !== componentData) {
      this._componentData = componentData;
      setTimeout(() => this.contentLoaded());
    }
  }

  @Input()
  customEvents: EventBinding[] = [];

  @Output()
  dispatchAction = new EventEmitter<EventData>();

  // Only will contain the child layout for this view
  @ViewChildren(ChildHostDirective)
  childLayout: QueryList<ChildHostDirective>;

  @ContentChildren(CustomTemplateComponent)
  customTemplates: QueryList<CustomTemplateComponent>;

  // Indicates if the view data has come from the route params (and will not be passed in input form)
  responseFromRoute = false;

  constructor(
    private componentResolver: ComponentRendererService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (
      this.route.snapshot.routeConfig &&
      this.route.snapshot.routeConfig.data.response
    ) {
      this.responseFromRoute = true;

      this.componentData = this.route.snapshot.routeConfig.data.response;
    }
  }

  /**
   * When the content of the core-view is loaded, custom templates for keys and types are already populated
   * Initialize the local instance of the ComponentRendererService to be used for all descendants
   */
  private contentLoaded() {
    this.componentResolver.initLocalRelation(this.customTemplates);

    this._componentData = this.setupComponentTreeWithEvents(
      this._componentData,
      this.customEvents
    );

    this.componentResolver.renderLayout(
      this._componentData,
      this.childLayout.first
    );
  }

  /**
   * Combines the configured with the custom event handling
   * @param componentConfig the component configuration
   * @param customEventsBindings the custom event handling
   */
  private setupComponentTreeWithEvents<T extends ComponentData>(
    componentData: T,
    customEventsBindings: EventBinding[]
  ): T {
    if ('children' in componentData) {
      for (const childKey of Object.keys(componentData['children'])) {
        // Compute which events should be passed to the child
        const childEvents = customEventsBindings
          .filter(binding => binding.path[0] === childKey)
          .map(binding => ({ ...binding, path: binding.path.slice(1) }));

        componentData['children'][childKey] = this.setupComponentTreeWithEvents(
          componentData['children'][childKey],
          childEvents
        );
      }
    }

    if (!componentData.events) {
      componentData.events = {};
    }

    for (const eventKey of Object.keys(componentData.events)) {
      const eventDatas: EventData[] = componentData.events[eventKey];

      // Backend defined ngrx action to be dispatched in place of this event
      for (const eventData of eventDatas) {
        eventData.handler = (component: BaseComponent, $event: any) => {
          const data = _.cloneDeep(eventData);
          data.params = this.buildEventParams(
            data.params,
            $event,
            component.$me
          );

          if (eventData.action) {
            this.dispatchAction.emit(data);
          } else if (eventData.bubble) {
            component.bubble.emit({
              eventName: eventData.bubble,
              params: eventData.params,
              event: $event
            });
          }
        };
      }
    }

    // Custom defined handler
    const customComponentEvents = customEventsBindings
      .filter(binding => binding.path.length === 0)
      .reduce(
        (componentEvents, eventBinding) => ({
          ...componentEvents,
          [eventBinding.event]: eventBinding.config
        }),
        {}
      );

    for (const eventKey of Object.keys(customComponentEvents)) {
      componentData.events[eventKey] = customComponentEvents[eventKey];
    }

    return componentData;
  }

  private buildEventParams(params: any, $event: any, $me: number): EventData {
    if (Array.isArray(params)) {
      for (let i = 0; i < params.length; i++) {
        params[i] = this.buildEventParams(params[i], $event, $me);
      }
    } else if (typeof params === 'object') {
      for (const key of Object.keys(params)) {
        params[key] = this.buildEventParams(params[key], $event, $me);
      }
    } else if (typeof params === 'string') {
      params = this.buildParam(params, $event, $me);
    }

    return params;
  }

  private buildParam(param: any, $event: any, $me: number) {
    try {
      // tslint:disable-next-line:no-eval
      return eval(param);
    } catch (e) {
      if (param.includes('$event')) {
        const args = param.split('.');
        if (args.length === 1) {
          return $event;
        }

        let newParam = $event[args[1]];
        for (let i = 2; i < args.length; i++) {
          newParam = newParam[args[i]];
        }

        return newParam;
      }

      return param;
    }
  }
}
