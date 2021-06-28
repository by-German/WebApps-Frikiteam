import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOrganizerComponent } from './signup-organizer.component';

describe('SignupOrganizerComponent', () => {
  let component: SignupOrganizerComponent;
  let fixture: ComponentFixture<SignupOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupOrganizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
