import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsGameComponent } from './questions-game.component';

describe('QuestionsGameComponent', () => {
  let component: QuestionsGameComponent;
  let fixture: ComponentFixture<QuestionsGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
