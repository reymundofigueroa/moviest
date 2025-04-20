import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataMovies, MoviesData } from '../shared/models/data-movies';
import { MoviesService } from '../core/services/movies.service';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent  {

}
