import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenListComponent } from './screen-list.component';

describe('ScreenListComponent', () => {
  let component: ScreenListComponent;
  let fixture: ComponentFixture<ScreenListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenListComponent]
    });
    fixture = TestBed.createComponent(ScreenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
