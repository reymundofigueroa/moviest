import { Component } from '@angular/core';
import { HeaderComponent } from "../../../layout/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-send-email-to-reset-password',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './send-email-to-reset-password.component.html',
  styleUrl: './send-email-to-reset-password.component.css'
})
export class SendEmailToResetPasswordComponent {
  inputEmail = ''
  isSentEmail = false

  // Método para manejar el envío del email de recuperación y mostrar texto de enviado
  sendRecoveryEmail(event: Event){
    event.preventDefault()
    if(this.inputEmail){
      this.isSentEmail = true
    }

  }

}
