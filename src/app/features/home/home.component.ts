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
  categoryContent = 'home';
  movieToDetails: DataMovies | null = null;

  changeMovieList(category: string) {
    this.movieToDetails = null; // Reset movie details when changing category
    this.categoryContent = category;
  }

  movieDetailsHandler(item: DataMovies) {
    console.log('HomeComponent recibió:', item);
    this.movieToDetails = item; // Cambia a los detalles de la película
  }
}
