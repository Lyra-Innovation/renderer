import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLauncherComponent } from './dialog-launcher.component';

describe('DialogLauncherComponent', () => {
  let component: DialogLauncherComponent;
  let fixture: ComponentFixture<DialogLauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLauncherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
