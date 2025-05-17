import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-descktop-menu',
  standalone: true,
  imports: [],
  templateUrl: './nav-descktop-menu.component.html',
  styleUrl: './nav-descktop-menu.component.css'
})
export class NavDescktopMenuComponent {
  @Output() categorySelected = new EventEmitter<string>(); // Decorador Output para enviar la categoría a la que se hizo click

  // enviamos los datos de la categoría
  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }
}
