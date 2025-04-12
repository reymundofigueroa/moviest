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
  ContentGroups: any[] = []

  constructor(private peliculasService: PeliculasService) {}

ngOnChanges() {
  console.log('tipo recibido', this.category)
  this.peliculasService.getMovies().subscribe((data) => {
    let items: any[] = [];

    if (this.category === 'movies') {
      this.ContentGroups = [
        {type: 'Películas', items: data.movies}
      ]
    }
    else if (this.category === 'series') {
     this.ContentGroups = [
      {type: 'Series', items: data.series}
     ]
    }
      else if (this.category === 'categories'){
      items = [...data.movies, ...data.series];
      this.groupByGenre(items);
    }else if(this.category === 'home'){
      this.ContentGroups = [
        { type: 'Películas', items: data.movies },
        { type: 'Series', items: data.series }
      ];
    }


  });
}



groupByGenre(lista: any[]) {
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
