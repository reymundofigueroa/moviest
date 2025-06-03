import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from './core/services/movies.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private moviesService: MoviesService){}
  title = 'moviest';


}
