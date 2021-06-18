import { TestBed } from '@angular/core/testing';

import { OrganizersApiService } from './organizers-api.service';

describe('OrganizersApiService', () => {
  let service: OrganizersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
