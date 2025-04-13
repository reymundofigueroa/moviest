import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NavDescktopMenuComponent } from '../nav-descktop-menu/nav-descktop-menu.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { MovieDetailsComponent } from "../movie-details/movie-details.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SearchBarComponent, NavDescktopMenuComponent, MoviesListComponent, MovieDetailsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categoryContent = 'home';
  movieToDetails: any = null;

  changeMovieList(category: string) {
    this.categoryContent = category;
  }
  movieDetailsHandler(item: object) {
    console.log('HomeComponent recibió:', item);
    this.movieToDetails = item;
  }
}
