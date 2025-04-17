import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}

  goHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/home']);
  }
}
