import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { NavDescktopMenuComponent } from '../../layout/nav-descktop-menu/nav-descktop-menu.component';
import { MoviesListComponent } from '../movie/movies-list/movies-list.component';
import { MovieDetailsComponent } from "../movie/movie-details/movie-details.component";
import { CommonModule } from '@angular/common';
import { DataMovies } from '../../shared/models/data-movies';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SearchBarComponent, NavDescktopMenuComponent, MoviesListComponent, MovieDetailsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categoryContent = 'home'; // Variable para manejar que categoría del movie list se tiene que renderizar
  movieToDetails: DataMovies | null = null;

  // Método para cambiar la categoría de películas a renderizar
  changeMovieList(category: string) {
    this.movieToDetails = null;
    this.categoryContent = category;
  }

  // Método para controlar y enviar los detalles de la película a su respectivo componente
  movieDetailsHandler(item: DataMovies) {
    console.log('HomeComponent recibió:', item);
    this.movieToDetails = item; // Cambia a los detalles de la película
  }
}
