import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { Minigame } from '../minigame';
import { FormGroup } from '@angular/forms';

export interface Answer {
  id: string;
  answer: string;
  correct: boolean;
}

@Component({
  selector: 'ren-questions-game',
  templateUrl: './questions-game.component.html',
  styleUrls: ['./questions-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsGameComponent extends BaseComponent implements Minigame {
  /** Required */

  @Input()
  question: string;

  @Input()
  answers: Answer[];

  @Output()
  gameFinished = new EventEmitter<void>();

  questionsForm: FormGroup;

  selectedAnswerId: string;
  answerSubmitted = false;

  constructor() {
    super();
  }

  getScore(totalTime: number, timeSpent: number): { win: boolean; score: any } {
    const win =
      this.answerSubmitted &&
      totalTime > timeSpent &&
      this.answers.find(answer => answer.id === this.selectedAnswerId).correct;
    return {
      win: win,
      score: win
    };
  }

  getMaxScore(): number {
    return 1;
  }

  submitAnswer() {
    if (!this.answerSubmitted) {
      this.answerSubmitted = true;
      this.gameFinished.emit();
    }
  }
}
