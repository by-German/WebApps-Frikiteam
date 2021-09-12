import { TestBed } from '@angular/core/testing';

import { PlacesApiService } from './places-api.service';

describe('PlacesApiService', () => {
  let service: PlacesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
