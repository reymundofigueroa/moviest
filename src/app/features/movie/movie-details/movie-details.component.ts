import { Component, Input, SimpleChanges, ViewChild, ElementRef, OnChanges, OnDestroy } from '@angular/core';
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
export class MovieDetailsComponent implements OnChanges, OnDestroy {
  @Input() movie: DataMovies = {} as DataMovies;
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainerElement!: ElementRef<HTMLDivElement>;

  constructor(private favoritesService: FavoritesService) {
    // Constructor vacío
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movie']) {
      console.log('movie-details cambió:', this.movie);
    }
    document.addEventListener('fullscreenchange', this.handleFullscreenExit.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenExit.bind(this));
  }

  showVideo() {
    if (this.videoContainerElement && this.videoElement) {
      const videoContainer = this.videoContainerElement.nativeElement;
      const video = this.videoElement.nativeElement;

      videoContainer.style.display = 'block';
      video.play();

      video.requestFullscreen();
    }
  }

  handleFullscreenExit(): void {
    const videoContainer = this.videoContainerElement.nativeElement;
    const video = this.videoElement.nativeElement;
    if (!document.fullscreenElement) {
      video.pause();
      videoContainer.style.display = 'none';
    }
  }

  addToFavorites(movie: DataMovies) {
    this.favoritesService.saveMovieIntoFavorites(movie);
  }
  removeFromFavorites(id: string | number) {
    this.favoritesService.deleteMovieToFavorites(id)
  }

}
