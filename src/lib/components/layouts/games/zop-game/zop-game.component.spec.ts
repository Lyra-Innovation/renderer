import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZopGameComponent } from './zop-game.component';

describe('ZopGameComponent', () => {
  let component: ZopGameComponent;
  let fixture: ComponentFixture<ZopGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZopGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZopGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
