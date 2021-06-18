import { TestBed } from '@angular/core/testing';

import { EventsInformationApiService } from './events-information-api.service';

describe('EventsInformationApiService', () => {
  let service: EventsInformationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsInformationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
