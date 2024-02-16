import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { screenDisplayGuard } from './screen-display.guard';

describe('screenDisplayGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => screenDisplayGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
