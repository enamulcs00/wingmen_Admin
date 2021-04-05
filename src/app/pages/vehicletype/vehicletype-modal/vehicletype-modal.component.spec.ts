import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicletypeModalComponent } from './vehicletype-modal.component';

describe('VehicletypeModalComponent', () => {
  let component: VehicletypeModalComponent;
  let fixture: ComponentFixture<VehicletypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicletypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicletypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
