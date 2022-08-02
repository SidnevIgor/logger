import { TestBed } from '@angular/core/testing';

import { LoggerSharedService } from './logger-shared.service';

describe('LoggerSharedService', () => {
  let service: LoggerSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
