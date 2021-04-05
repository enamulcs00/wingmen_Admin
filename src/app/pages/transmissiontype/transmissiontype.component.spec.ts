import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissiontypeComponent } from './transmissiontype.component';

describe('TransmissiontypeComponent', () => {
  let component: TransmissiontypeComponent;
  let fixture: ComponentFixture<TransmissiontypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmissiontypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
