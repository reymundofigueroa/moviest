import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailToResetPasswordComponent } from './send-email-to-reset-password.component';

describe('SendEmailToResetPasswordComponent', () => {
  let component: SendEmailToResetPasswordComponent;
  let fixture: ComponentFixture<SendEmailToResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendEmailToResetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendEmailToResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
