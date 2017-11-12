import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeojectItemComponent } from './peoject-item.component';

describe('PeojectItemComponent', () => {
  let component: PeojectItemComponent;
  let fixture: ComponentFixture<PeojectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeojectItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeojectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
