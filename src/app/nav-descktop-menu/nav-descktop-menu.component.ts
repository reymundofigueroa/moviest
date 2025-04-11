import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-descktop-menu',
  standalone: true,
  imports: [],
  templateUrl: './nav-descktop-menu.component.html',
  styleUrl: './nav-descktop-menu.component.css'
})
export class NavDescktopMenuComponent {
  @Output() tipoSeleccionado = new EventEmitter<string>();

  seleccionarTipo(tipo: string) {
    this.tipoSeleccionado.emit(tipo);
  }
}
