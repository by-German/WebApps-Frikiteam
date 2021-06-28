import { TestBed } from '@angular/core/testing';

import { CustomersApiService } from './customers-api.service';

describe('CustomersApiService', () => {
  let service: CustomersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
