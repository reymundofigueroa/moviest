import { Component, Input, ViewChild, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataMovies } from '../../../shared/models/data-movies';
import { FavoritesService } from '../services/favorites.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnChanges, OnDestroy {
  @Input() movie: DataMovies = {} as DataMovies; // Decorador input para recibir los datos a de la película a renderizar

  //Decoradores ViewChild para controlar el comportamiento al reproducir el video
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainerElement!: ElementRef<HTMLDivElement>;

  constructor(private favoritesService: FavoritesService) {
    // Constructor vacío
  }


  // hook para detectar cuando se salga del video
  ngOnChanges() {
    document.addEventListener('fullscreenchange', this.handleFullscreenExit.bind(this));
  }

  // destruir el escuchador cundo no se use para mejorar el rendimiento
  ngOnDestroy() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenExit.bind(this));
  }


  // Método para mostrar el video
  showVideo() {
    if (this.videoContainerElement && this.videoElement) {
      const videoContainer = this.videoContainerElement.nativeElement;
      const video = this.videoElement.nativeElement;

      videoContainer.style.display = 'block';
      video.play();

      video.requestFullscreen();
    }
  }


  // Método para manejar el comportamiento al salir del video
  handleFullscreenExit(): void {
    const videoContainer = this.videoContainerElement.nativeElement;
    const video = this.videoElement.nativeElement;
    if (!document.fullscreenElement) { // detectamos si de verdad se esta en pantalla completa
      video.pause(); // pausamos el video
      videoContainer.style.display = 'none'; // desaparecemos la vista pequeña del video
    }
  }

  // Métodos para manejar los favoritos
  addToFavorites(movie: DataMovies) {
    this.favoritesService.saveMovieIntoFavorites(Number(movie.id));
  }
  removeFromFavorites(id: string | number) {
    this.favoritesService.deleteMovieToFavorites(Number(id))
  }
  // Si quieres usar la versión local (localStorage) que espera solo un id:


// Si quieres usar la versión que espera userId y contentId (por ejemplo, desde backend):
isFavorite(id: string | number): Observable<boolean> {
  const userIdStr = localStorage.getItem('UserId');
  return this.favoritesService.isFavorite(Number(userIdStr), Number(id));
}

}
