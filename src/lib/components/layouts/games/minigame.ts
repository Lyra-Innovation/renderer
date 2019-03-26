import { EventEmitter } from '@angular/core';

/**
 * Any game compoenent that goes into minigame.component has to implement this interface
 */

export interface Minigame {
  getScore: (totalTime: number, timeSpent: number) => { win: boolean; score: any };
  getMaxScore: () => number;
  gameFinished: EventEmitter<void>;
}
