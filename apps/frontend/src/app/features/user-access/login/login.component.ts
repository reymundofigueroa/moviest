import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../layout/header/header.component';
import { UserAccessService } from '../services/user-access.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: UserAccessService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token ?? '');
        localStorage.setItem('UserId', String(response.userId));
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Credenciales inválidas';
        } else {
          this.errorMessage = 'Ocurrió un error al intentar iniciar sesión.';
        }
      }
    });
  }

  goToCreateAccount() {
    this.router.navigate(['/create-account']);
  }

  goToRecoverPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
