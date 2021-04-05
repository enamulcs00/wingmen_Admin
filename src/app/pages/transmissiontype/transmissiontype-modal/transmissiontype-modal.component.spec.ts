import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissiontypeModalComponent } from './transmissiontype-modal.component';

describe('TransmissiontypeModalComponent', () => {
  let component: TransmissiontypeModalComponent;
  let fixture: ComponentFixture<TransmissiontypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmissiontypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissiontypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
