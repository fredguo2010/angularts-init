import { TestBed } from '@angular/core/testing';

import { RockiihubService } from './rockiihub.service';

describe('RockiihubService', () => {
  let service: RockiihubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RockiihubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
