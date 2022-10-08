import { TestBed } from '@angular/core/testing';

import { MockApiResultsInterceptor } from './mock-api-results.interceptor';

describe('MockApiResultsInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [MockApiResultsInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: MockApiResultsInterceptor = TestBed.inject(MockApiResultsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
