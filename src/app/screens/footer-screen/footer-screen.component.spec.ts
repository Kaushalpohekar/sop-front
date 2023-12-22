import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterScreenComponent } from './footer-screen.component';

describe('FooterScreenComponent', () => {
  let component: FooterScreenComponent;
  let fixture: ComponentFixture<FooterScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterScreenComponent]
    });
    fixture = TestBed.createComponent(FooterScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
