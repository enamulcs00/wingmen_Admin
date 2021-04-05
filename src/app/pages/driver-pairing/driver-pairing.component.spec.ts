import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPairingComponent } from './driver-pairing.component';

describe('DriverPairingComponent', () => {
  let component: DriverPairingComponent;
  let fixture: ComponentFixture<DriverPairingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverPairingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverPairingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
