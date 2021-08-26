import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInformationComponent } from './event-information.component';

describe('EventInformationComponent', () => {
  let component: EventInformationComponent;
  let fixture: ComponentFixture<EventInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
