import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent implements OnChanges {
  @Input() category: string = '';
  contenido: { [genero: string]: any[] } = {};

  constructor(private peliculasService: PeliculasService) {}

ngOnChanges() {
  console.log('tipo recibido', this.category)
  this.peliculasService.getMovies().subscribe((data) => {
    let items: any[] = [];

    if (this.category === 'movies') items = data.movies;
    else if (this.category === 'series') items = data.series;
    else if (this.category === 'categories'){
      items = [...data.movies, ...data.series];
      this.agruparPorGenero(items);
    }else if(this.category === 'home'){
      items = [...data.movies, ...data.series]
      this.renderHome(items)
    }


  });
}

renderHome(lista: any[]) {
  this.contenido = {};
  lista.forEach(item => {
    const genero = item.genre;
    if (!this.contenido[genero]) {
      this.contenido[genero] = [];
    }
    this.contenido[genero].push(item);
  });
  console.log('Contenido agrupado:', this.contenido);
}

agruparPorGenero(lista: any[]) {
  this.contenido = {};
  lista.forEach(item => {
    const genero = item.genre;
    if (!this.contenido[genero]) {
      this.contenido[genero] = [];
    }
    this.contenido[genero].push(item);
  });
  console.log('Contenido agrupado:', this.contenido);
}
}
