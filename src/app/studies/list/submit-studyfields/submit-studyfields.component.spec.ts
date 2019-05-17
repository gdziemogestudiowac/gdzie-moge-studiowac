import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitStudyfieldsComponent } from './submit-studyfields.component';

describe('SubmitStudyfieldsComponent', () => {
  let component: SubmitStudyfieldsComponent;
  let fixture: ComponentFixture<SubmitStudyfieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitStudyfieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitStudyfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
