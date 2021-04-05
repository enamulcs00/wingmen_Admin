import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingListingComponent } from './ranking-listing.component';

describe('RankingListingComponent', () => {
  let component: RankingListingComponent;
  let fixture: ComponentFixture<RankingListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
