import { Component, Input, ViewChild, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataMovies } from '../../../shared/models/data-movies';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnChanges, OnDestroy, OnInit {
  @Input() movie: DataMovies = {} as DataMovies; // Decorador input para recibir los datos a de la película a renderizar

  //Decoradores ViewChild para controlar el comportamiento al reproducir el video
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainerElement!: ElementRef<HTMLDivElement>;
  favoriteIdsSet = new Set<number>();

  constructor(private favoritesService: FavoritesService) {
    // Constructor vacío
  }
  // Hook para saber si el elemento es favorito al iniciar
  ngOnInit(): void {
    this.getFavoritesIds()
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

  // Métodos para solicitar añadir a favoritos
  addToFavorites(movie: DataMovies) {
    this.favoritesService.saveMovieIntoFavorites(Number(movie.id)).subscribe({ // Hacemos la petición a nuestro favorites.service.ts
      next: () => {
        console.log('Agregado a favoritos')
        this.getFavoritesIds() // Actualizamos la lista de favoritos
      },
    })
  }

  // método para solicitar eliminar elemento de favoritos
  removeFromFavorites(id: string | number) {
    this.favoritesService.deleteMovieToFavorites(Number(id)).subscribe({ // Hacemos la petición a nuestro favorites.service.ts
      next: () => {
        console.log('eliminado de favoritos')
        this.getFavoritesIds() // Actualizamos la lista de favoritos
      }
    });
  }

  // Método para identificar favoritos
  isFavorite(id: number): boolean {
    return this.favoriteIdsSet.has(id); // Retorna el booleano de contener el id de la película en el array favoritesIdSet
  }

  // Método para solicitar los ids de los elementos que están en favoritos
  getFavoritesIds() {
    const userId = Number(localStorage.getItem('UserId')); // Obtenemos el 'UserId' del usuario
    this.favoritesService.getFavoriteIds(userId).subscribe(ids => { // Hacemos la petición del array con los ids
      this.favoriteIdsSet = new Set(ids); // actualizamos el favoritesIdsSet con la lista de ids favoritos
    });
  }
}
