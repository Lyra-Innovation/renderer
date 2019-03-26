import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLauncherComponent } from './menu-launcher.component';

describe('MenuLauncherComponent', () => {
  let component: MenuLauncherComponent;
  let fixture: ComponentFixture<MenuLauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLauncherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
