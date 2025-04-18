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



  isLoginPage(): boolean {
    return this.currentPage === '/login';
}

}
