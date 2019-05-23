import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnInit
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
export class QuestionsGameComponent extends BaseComponent
  implements Minigame, OnInit {
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

  ngOnInit() {
    this.answers = this.shuffle(this.answers);
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

  shuffle(a): Array<any> {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
