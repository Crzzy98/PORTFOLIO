import { TestBed } from '@angular/core/testing';

import { ChractersService } from './chracters.service';

describe('ChractersService', () => {
  let service: ChractersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChractersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
