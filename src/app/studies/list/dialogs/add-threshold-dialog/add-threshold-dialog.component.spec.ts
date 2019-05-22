import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThresholdDialogComponent } from './add-threshold-dialog.component';

describe('AddThresholdDialogComponent', () => {
  let component: AddThresholdDialogComponent;
  let fixture: ComponentFixture<AddThresholdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddThresholdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThresholdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
