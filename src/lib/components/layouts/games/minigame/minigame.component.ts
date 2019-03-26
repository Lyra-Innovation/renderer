import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { LayoutComponent } from '../../layout.component';
import { ComponentRendererService } from '../../../../services/component-renderer.service';
import { Minigame } from '../minigame';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'ren-minigame',
  templateUrl: './minigame.component.html',
  styleUrls: ['./minigame.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(() => MinigameComponent)
    }
  ]
})
export class MinigameComponent extends LayoutComponent<'game'>
  implements OnInit {
  /** This component requires a single child that implements the above defined Minigame interface */

  /** Optional */
  @Input()
  showScore: boolean = false;

  // Time in ms in which the game has to be completed
  // If time = 0 disables time management
  @Input()
  time: number = 0;

  // Time in ms between each interval
  @Input()
  timeInterval: number = 100;

  @Input()
  color: 'primary' | 'accent' | 'warn' = 'accent';

  @Output()
  gameFinished = new EventEmitter<{
    timeSpent: number;
    score: any;
    win: boolean;
  }>();

  @Output()
  gameWinned = new EventEmitter<{
    timeSpent: number;
    score: any;
    win: boolean;
  }>();

  @Output()
  gameLost = new EventEmitter<{
    timeSpent: number;
    score: any;
    win: boolean;
  }>();

  interval: any;
  timeSpent: number = 0;

  containedGame: Minigame;

  gameFinishEmitted = false;

  constructor(
    protected componentResolver: ComponentRendererService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(componentResolver, changeDetectorRef);
  }

  onChildrenRendered(childrenKeys: string[]) {
    super.onChildrenRendered(childrenKeys);

    if (this.time) {
      this.interval = setInterval(() => {
        this.timeSpent += this.timeInterval;

        if (this.timeSpent >= this.time) {
          this.emitGameFinished();
          clearInterval(this.interval);
        }
      }, this.timeInterval);
    }

    const gameRef = this.getChildRefs('game')[0];

    if ('getScore' in gameRef) {
      this.containedGame = <Minigame>gameRef;
      this.subscriptions.push(
        this.containedGame.gameFinished.subscribe(_ => this.emitGameFinished())
      );
    }
  }

  /**
   * @returns the game score, depending on the time spent
   */
  getGameScore() {
    return this.containedGame
      ? this.containedGame.getScore(this.time, this.timeSpent)
      : { win: false, score: 0 };
  }

  getScorePercentage(): number {
    return this.containedGame
      ? (100 * this.containedGame.getScore(this.time, this.timeSpent).score) /
          this.containedGame.getMaxScore()
      : 0;
  }

  /**
   * Game is finished: output the result
   */
  emitGameFinished() {
    if (!this.gameFinishEmitted) {
      this.gameFinishEmitted = true;

      const score = this.getGameScore();
      this.gameFinished.emit({
        timeSpent: this.timeSpent,
        score: score.score,
        win: score.win
      });

      if (score.win) {
        this.gameWinned.emit({
          timeSpent: this.timeSpent,
          score: score.score,
          win: score.win
        });
      } else {
        this.gameLost.emit({
          timeSpent: this.timeSpent,
          score: score.score,
          win: score.win
        });
      }
    }
  }

  /**
   * @returns the percentage of time of the minigame that is remaining
   */
  percentageRemaining() {
    return (100 * (this.time - this.timeSpent)) / this.time;
  }

  protected getCssClasses() {
    return super.getCssClasses() + ' renderer-fill';
  }
}
