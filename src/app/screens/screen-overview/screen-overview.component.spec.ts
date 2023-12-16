import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenOverviewComponent } from './screen-overview.component';

describe('ScreenOverviewComponent', () => {
  let component: ScreenOverviewComponent;
  let fixture: ComponentFixture<ScreenOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenOverviewComponent]
    });
    fixture = TestBed.createComponent(ScreenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
