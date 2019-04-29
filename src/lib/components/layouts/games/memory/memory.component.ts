import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { Minigame } from '../minigame';

import * as _ from 'lodash';

interface Card {
  id: number;
  image: string;
  label: string;
  flipped: boolean;
}

@Component({
  selector: 'ren-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemoryComponent extends BaseComponent implements Minigame, OnInit {
  /** Required */
  @Input()
  images: string[] = [
    'https://www.w3resource.com/w3r_images/javascript-exercises.gif',
    'https://www.w3resource.com/w3r_images/javascript-array-exercise-17.png',
    'https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg'
  ];

  /** Optional */
  @Input()
  cols: number = 3;

  @Input()
  rows: number = 4;

  @Input()
  placeholderImages: string[] = [
    '/assets/carta1_square.png',
    '/assets/carta2_square.png'
  ];

  /** Outputs */
  @Output()
  gameFinished = new EventEmitter<void>();

  /** Private */
  cards: Array<Card>;

  currentFlippedCardIndex: number = null;

  flipping = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    const imageList = this.images.map((image, index) => ({
      id: index,
      label: '',
      image: image,
      flipped: false
    }));
    this.cards = this.shuffle(imageList.concat(_.cloneDeep(imageList)));
  }

  flipCard(cardIndex: number) {
    if (this.cards[cardIndex].flipped) {
      return;
    }

    const card = this.cards[cardIndex];
    card.flipped = true;

    if (this.currentFlippedCardIndex !== null) {
      const flippedCard = this.cards[this.currentFlippedCardIndex];

      if (flippedCard.id !== card.id) {
        this.flipping = true;
        setTimeout(() => {
          this.flipping = false;
          flippedCard.flipped = false;
          card.flipped = false;
          this.changeDetectorRef.detectChanges();
        }, 2000);
      } else if (this.cards.every(c => c.flipped)) {
        setTimeout(() => this.gameFinished.emit(), 500);
      }

      this.currentFlippedCardIndex = null;
    } else {
      this.currentFlippedCardIndex = cardIndex;
    }
  }

  getScore(totalTime: number, timeSpent: number): { win: boolean; score: any } {
    const flippedCardNumber = this.cards.filter(card => card.flipped).length;
    return {
      win: flippedCardNumber === this.cards.length,
      score: flippedCardNumber
    };
  }

  getMaxScore(): number {
    return this.cards ? this.cards.length : 0;
  }

  getPlaceholder(index: number): string {
    return this.placeholderImages[
      ((index % 2) + (Math.floor(index / this.cols) % 2)) % 2
    ];
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
