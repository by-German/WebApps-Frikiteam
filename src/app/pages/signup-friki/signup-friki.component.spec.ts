import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFrikiComponent } from './signup-friki.component';

describe('SignupFrikiComponent', () => {
  let component: SignupFrikiComponent;
  let fixture: ComponentFixture<SignupFrikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFrikiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFrikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
