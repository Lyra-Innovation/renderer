import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChildTemplateComponent } from './custom-child-template.component';

describe('CustomChildTemplateComponent', () => {
  let component: CustomChildTemplateComponent;
  let fixture: ComponentFixture<CustomChildTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomChildTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomChildTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
