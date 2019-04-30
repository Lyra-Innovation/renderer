import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'ren-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent extends BaseComponent {
  @Input()
  title1: string;

  @Input()
  label1: string;

  @Input()
  title2: string;

  @Input()
  label2: string;

  @Input()
  timestamp: number;

  constructor() {
    super();
  }

  protected getCssClasses() {
    return super.getCssClasses() + ' renderer-list-item';
  }

  // Timestamp received is in seconds, we need in ms
  getDate() {
    return new Date(this.timestamp * 1000);
  }
}
