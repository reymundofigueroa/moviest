import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { PeliculasService } from "../../../core/services/peliculas.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-movies-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./movies-list.component.html",
  styleUrl: "./movies-list.component.css",
})
export class MoviesListComponent implements OnChanges {
  @Input() category: string = "";
  @Output() movieDetails = new EventEmitter<object>();
  contenido: { [genero: string]: any[] } = {};
  ContentGroups: any[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnChanges() {
    console.log("tipo recibido", this.category);
    this.peliculasService.getMovies().subscribe((data) => {
      let items: any[] = [];

      if (this.category === "movies") {
        this.ContentGroups = [{ type: "Películas", items: data.movies }];
      } else if (this.category === "series") {
        this.ContentGroups = [{ type: "Series", items: data.series }];
      } else if (this.category === "categories") {
        items = [...data.movies, ...data.series];
        this.groupByGenre(items);
      } else if (this.category === "home") {
        this.ContentGroups = [
          { type: "Películas", items: data.movies },
          { type: "Series", items: data.series },
        ];
      } else if (this.category === "favorites") {
        this.loadFavorites();
      }
    });
  }

  groupByGenre(lista: any[]) {
    this.contenido = {};
    lista.forEach((item) => {
      const genero = item.genre;
      if (!this.contenido[genero]) {
        this.contenido[genero] = [];
      }
      this.contenido[genero].push(item);
    });
    console.log("Contenido agrupado:", this.contenido);
  }

  saveMovieIntoFavorites(item: any): void {
    const favorites = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const alreadyExist = favorites.some((fav: any) => fav.id === item.id);

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
    const favorites = JSON.parse(localStorage.getItem('favoritos') || '[]');

    this.ContentGroups = [{
      type: 'Favoritos',
      items: favorites
    }];
  }

  deleteMovieToFavorites(id: string): void {
    console.log('Eliminando de favoritos:', id);
    const favorites = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const newFavoriteList = favorites.filter((item: any) => item.id !== id);

    localStorage.setItem('favoritos', JSON.stringify(newFavoriteList));
    console.log(newFavoriteList);

    if(this.category === 'favorites'){
    this.loadFavorites();
    }
  }

  loadMovieDetails(item: object): void {
  this.movieDetails.emit(item);
}
}
