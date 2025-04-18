import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { PeliculasService } from "../../../core/services/peliculas.service";
import { CommonModule } from "@angular/common";
import { DataMovies, ContentGroup, GroupedContent, MoviesData } from "../../../shared/models/data-movies";

@Component({
  selector: "app-movies-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./movies-list.component.html",
  styleUrl: "./movies-list.component.css",
})
export class MoviesListComponent implements OnChanges {
  @Input() category = "";
  @Output() movieDetails = new EventEmitter<DataMovies>();
  contentByGenreGroup: GroupedContent = {}; // Agrupado por género
  contentByTypeGroup: ContentGroup[] = []; // Agrupado por tipo

  constructor(private peliculasService: PeliculasService) {}

  ngOnChanges() {
    console.log("tipo recibido", this.category);
    this.peliculasService.getMovies().subscribe((data: MoviesData) => {
      let items: DataMovies[] = [];

      if (this.category === "movies") {
        this.contentByTypeGroup = [{ type: "Películas", items: data.movies }];
      } else if (this.category === "series") {
        this.contentByTypeGroup = [{ type: "Series", items: data.series }];
      } else if (this.category === "categories") {
        items = [...data.movies, ...data.series];
        this.groupByGenre(items);
      } else if (this.category === "home") {
        this.contentByTypeGroup = [
          { type: "Películas", items: data.movies },
          { type: "Series", items: data.series },
        ];
      } else if (this.category === "favorites") {
        this.loadFavorites();
      }
    });
  }

  groupByGenre(lista: DataMovies[]) {
    this.contentByGenreGroup = {};
    lista.forEach((item) => {
      const genero = item.genre;
      if (!this.contentByGenreGroup[genero]) {
        this.contentByGenreGroup[genero] = [];
      }
      this.contentByGenreGroup[genero].push(item);
    });
    console.log("contentByGenreGroup agrupado:", this.contentByGenreGroup);
  }

  saveMovieIntoFavorites(item: DataMovies): void {
    const favorites: DataMovies[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const alreadyExist = favorites.some((fav) => fav.id === item.id);

    if (!alreadyExist) {
      favorites.push(item); // Agregamos el nuevo favorito
      localStorage.setItem('favoritos', JSON.stringify(favorites));
      console.log('Agregado a favoritos:', item);
    } else {
      console.log('Este elemento ya está en favoritos.');
    }
    console.log('Favoritos actuales:', favorites);
  }

  loadFavorites(): void {
    const favorites: DataMovies[] = JSON.parse(localStorage.getItem('favoritos') || '[]');

    this.contentByTypeGroup = [{
      type: 'Favoritos',
      items: favorites
    }];
  }

  deleteMovieToFavorites(id: string | number): void {
    console.log('Eliminando de favoritos:', id);
    const favorites: DataMovies[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const newFavoriteList = favorites.filter((item) => item.id !== id);

    localStorage.setItem('favoritos', JSON.stringify(newFavoriteList));
    console.log(newFavoriteList);

    if (this.category === 'favorites') {
      this.loadFavorites();
    }
  }

  loadMovieDetails(item: DataMovies): void {
    this.movieDetails.emit(item);
  }
}
