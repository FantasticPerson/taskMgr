import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeInputComponent } from './age-input.component';

describe('AgeInputComponent', () => {
  let component: AgeInputComponent;
  let fixture: ComponentFixture<AgeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
