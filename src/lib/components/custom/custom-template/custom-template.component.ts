import {
  Component,
  Input,
  ContentChildren,
  EventEmitter,
  QueryList
} from '@angular/core';
import { BaseComponent } from '../../base.component';
import { CdkPortal } from '@angular/cdk/portal';
import { Dictionary } from '@ngrx/entity';
import { EventData } from '../../../renderer.model';

@Component({
  selector: 'ren-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss']
})
export class CustomTemplateComponent extends BaseComponent {

  @Input()
  forKey: string;

  @Input()
  forType: string;

  @ContentChildren(CdkPortal)
  customTemplate: QueryList<CdkPortal>;

  templateEmitters: Dictionary<EventEmitter<any>>;

  constructor() {
    super();
  }

  /**
   * Creates bindings exposed to the custom template
   * @param values the configured values as inputs for the template
   * @param events the configured events for which newly created event emitter will be exposed to the template
   */
  public bindConfigToTemplate(values: Dictionary<any>, events: Dictionary<EventData>) {
    this.templateEmitters = this.buildTemplateEmitters(events);

    // Setup the context for the child template
    this.customTemplate.first.context = {
      ...values,
      ...this.templateEmitters
    };
  }

  /**
   * Creates new event emitters for each event defined in the bindings
   * and builds an object with all the events
   * @param bindings the list of bindings for the child template
   * @return the object of the emitters
   */
  private buildTemplateEmitters(events: Dictionary<EventData>): Dictionary<EventEmitter<any>> {
    // Build the new event emitter with binding to the handlers
    if (!events) {
      return {};
    }

    return Object.keys(events).reduce(
      (emitters, eventKey) => ({
        ...emitters,
        [eventKey]: new EventEmitter<any>()
      }),
      {}
    );
  }
}
