import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicetypeModalComponent } from './servicetype-modal.component';

describe('ServicetypeModalComponent', () => {
  let component: ServicetypeModalComponent;
  let fixture: ComponentFixture<ServicetypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicetypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicetypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
