import { InjectionToken, ComponentRef, Type } from '@angular/core';
import { BaseComponent } from './components/base.component';

export interface Dictionary<T> {
  [key: string]: T;
}

/** Relation between each angular component to its layout name */

export interface ComponentRelation {
  types: Dictionary<{
    type: Type<BaseComponent>;
    keys?: Dictionary<Type<BaseComponent>>;
  }>;
  keys: Dictionary<Type<BaseComponent>>;
}

export const COMPONENT_RELATION = new InjectionToken<ComponentRelation>(
  'GLOBAL COMPONENT RELATION'
);
export const CUSTOM_COMPONENT_RELATION = new InjectionToken<ComponentRelation>(
  'CUSTOM GLOBAL COMPONENT RELATION'
);

export const COMPONENT_DATA = new InjectionToken<{}>('COMPONENT_DATA');

export interface ModelSelect {
  model: string;
  id: string;
  attribute: string;
}

export interface ScopeSelect {
  scope: string; // local | view | global | route
  select: string;
}

export type SelectConfig = ModelSelect | ScopeSelect;

export type ValueData = string | SelectConfig;

export interface EventBinding {
  path: string[];
  event: string;
  config: EventData;
}

export interface BubbleEvent {
  eventName: string;
  params: any;
  event: any;
}

export interface EventData {
  params?: any | SelectConfig;
  action?: string;
  bubble?: string;
  handler?: (componentRef: BaseComponent, $event: any) => void;
}

export interface ComponentData {
  type: string; // The component that this config will render
  values: Dictionary<ValueData | ValueData[]>;
  events?: Dictionary<EventData[]>;

  route?: string;
  local?: any;
}

export interface LayoutData<CHILDREN extends string = any>
  extends ComponentData {
  children: { [c in CHILDREN]: LayoutData | ComponentData };
}

export interface ViewData {
  // Identificator of the view
  view: string;
  layout: LayoutData;
}
