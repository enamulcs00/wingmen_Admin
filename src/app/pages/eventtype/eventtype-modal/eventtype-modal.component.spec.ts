import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtypeModalComponent } from './eventtype-modal.component';

describe('EventtypeModalComponent', () => {
  let component: EventtypeModalComponent;
  let fixture: ComponentFixture<EventtypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventtypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventtypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
