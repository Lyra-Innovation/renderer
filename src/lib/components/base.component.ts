import {
  Input,
  OnDestroy,
  HostBinding,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentData, BubbleEvent } from '../renderer.model';
import * as _ from 'lodash';
import { AbstractControl } from '@angular/forms';

export abstract class BaseComponent implements OnInit, OnDestroy {
  SMALL_GAP = '4px';
  MEDIUM_GAP = '8px';
  LARGE_GAP = '16px';
  XL_GAP = '24px';
  XXL_GAP = '32px';

  _data: ComponentData;
  @Input()
  set data(data: ComponentData) {
    data.local = this;
    this._data = data;
  }

  @Input()
  $me: number;

  @Input()
  class: string = '';

  @Output()
  init = new EventEmitter<void>();

  @Output()
  destroy = new EventEmitter<void>();

  @Output()
  bubble = new EventEmitter<BubbleEvent>();

  @HostBinding('class')
  classes: string;

  protected subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit() {
    this.init.emit();

    // Execute appropiate function on bubble event emitted
    const subs = this.bubble.subscribe((bubbleEvent: BubbleEvent) => {
      this.onBubbleEvent(
        bubbleEvent.eventName,
        bubbleEvent.params,
        bubbleEvent.event
      );
    });
    this.subscriptions.push(subs);

    this.classes = this.getCssClasses() + ' renderer-component ' + this.class;
  }

  ngOnDestroy() {
    // Unsubscribe for all subscription for memory efficiency
    this.subscriptions.forEach(subs => subs.unsubscribe);

    this.destroy.emit();
  }

  public getComponentForm(): AbstractControl {
    return null;
  }

  public patchValue(value: any): void {
    const form = this.getComponentForm();
    if (form) {
      form.patchValue(value);
    }
  }

  /**
   * @returns the list of css classes to apply to this component
   */
  protected getCssClasses(): string {
    return '';
  }

  /**
   * Override this function in order to declare bubble events that can be received by this component
   */
  protected onBubbleEvent(name: string, params: any, event: any): void {}
}
