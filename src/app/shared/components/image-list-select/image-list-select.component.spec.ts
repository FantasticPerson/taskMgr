import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatGridListModule, MatIconModule} from '@angular/material';
import {ImageListSelectComponent} from './';

describe('ImageListSelectComponent', () => {
  let component: ImageListSelectComponent;
  let fixture: ComponentFixture<ImageListSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageListSelectComponent],
      imports: [MatGridListModule, MatIconModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
