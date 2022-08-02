import { TestBed } from '@angular/core/testing';

import { LoggingInterceptor } from './logger-shared.service';

describe('LoggerSharedService', () => {
  let service: LoggingInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
