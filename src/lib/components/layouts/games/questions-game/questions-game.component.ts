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
  answersIds: string[];

  @Input()
  answers: string[];

  @Input()
  correct: boolean[];

  @Output()
  gameFinished = new EventEmitter<void>();

  questionsForm: FormGroup;

  selectedAnswerId: string;
  answerSubmitted = false;

  constructor() {
    super();
  }

  getOptions() {
    return this.answersIds.map((id, index) => ({
      id: id,
      name: this.answers[index]
    }));
  }

  getScore(totalTime: number, timeSpent: number): { win: boolean; score: any } {
    const correctAnswerIndex = this.answersIds.findIndex(
      (id, index) => this.correct[index]
    );
    const win =
      this.answerSubmitted &&
      totalTime > timeSpent &&
      correctAnswerIndex ===
        this.answersIds.findIndex(id => id === this.selectedAnswerId);
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
