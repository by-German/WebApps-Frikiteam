import { TestBed } from '@angular/core/testing';

import { EventItinerariesApiService } from './event-itineraries-api.service';

describe('EventItinerariesApiService', () => {
  let service: EventItinerariesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventItinerariesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
