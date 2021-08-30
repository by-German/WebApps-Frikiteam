import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalInformationComponent } from './optional-information.component';

describe('OptionalInformationComponent', () => {
  let component: OptionalInformationComponent;
  let fixture: ComponentFixture<OptionalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionalInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
