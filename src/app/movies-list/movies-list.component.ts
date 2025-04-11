import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent implements OnChanges {

  @Input() tipe: string = '';

ngOnChanges() {
  console.log('tipo recibido', this.tipe)
}
}
