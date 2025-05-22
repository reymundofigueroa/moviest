import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAccessService } from '../services/user-access.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: UserAccessService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      console.log('formato invalido')
      return;}

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        alert('Cuenta creada correctamente');
        this.router.navigate(['/login']);
        console.log('respuesta', res)
      },
      error: (err) => {
        alert('Error: ' + (err.error || 'No se pudo crear el usuario'));
        console.error(err);
      }
    });
  }
}
