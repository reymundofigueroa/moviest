import { Component } from '@angular/core';
import { HeaderComponent } from "../../../layout/header/header.component";

@Component({
  selector: 'app-send-email-to-reset-password',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './send-email-to-reset-password.component.html',
  styleUrl: './send-email-to-reset-password.component.css'
})
export class SendEmailToResetPasswordComponent {

}
