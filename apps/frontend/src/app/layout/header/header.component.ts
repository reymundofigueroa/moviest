import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  currentPage = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentPage = this.router.url;
    });
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Determinamos si se esta en la pagina de login, esto para saber que contenido del header renderizar
  isHomePage(): boolean {
    return this.currentPage === '/home';
  }
}
