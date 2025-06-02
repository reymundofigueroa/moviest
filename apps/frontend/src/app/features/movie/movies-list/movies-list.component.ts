import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from "@angular/core";
import { MoviesService } from "../../../core/services/movies.service";
import { CommonModule } from "@angular/common";
import { DataMovies, ContentGroup, GroupedContent, MoviesData } from "../../../shared/models/data-movies";
import { FavoritesService } from "../services/favorites.service";

@Component({
  selector: "app-movies-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./movies-list.component.html",
  styleUrl: "./movies-list.component.css",
})

export class MoviesListComponent implements OnChanges, OnInit {
  @Input() category = ""; // DEcorador input para recibir indicaciones de que data renderizar
  @Input() dataFromSearch:DataMovies[] = []
  @Output() movieDetails = new EventEmitter<DataMovies>(); // Decorador output para enviar data de la película que se quieren saber detalles
  contentByGenreGroup: GroupedContent = {}; // Agrupado por género
  contentByTypeGroup: ContentGroup[] = []; // Agrupado por tipo
  isMoviesListEmpty = false
  favoriteIdsSet = new Set<number>();

  constructor(private moviesService: MoviesService, private favoritesService: FavoritesService) { }

  // Hook para manejar listas de películas cuando se detecten cambios
  ngOnChanges(changes: SimpleChanges) {
    // Detectar cambios en category (tu lógica existente)
    if (changes['category'] || changes['dataFromSearch']) {
        this.renderMoviesLists();
    }
  }

  ngOnInit(): void {
     this.getFavoritesIds()
  }

  // Método selector de data a renderizar en vase a la categoría que se indico en nav-menu
  renderMoviesLists(): void {
    switch (this.category) {
      case "movies":
        this.moviesService.getMovies().subscribe((data: MoviesData) => {
        this.handleCategorySelected(['movies'], data);
        })
        break;
      case "series":
        this.moviesService.getSeries().subscribe((data: MoviesData) => {
        this.handleCategorySelected(['series'], data);
        })
        break;
      case "categories":
        this.moviesService.getMoviesSortedByCategory().subscribe((data: MoviesData) => {
          const dataKeys = Object.keys(data) as (keyof MoviesData)[]
          this.handleCategorySelected(dataKeys, data);
          console.log(data)
        })
        break;
      case "home":
        this.moviesService.getHomeMovies().subscribe((data: MoviesData) => {
        this.handleCategorySelected(['movies', 'series'], data);
        })
        break;
      case "favorites": {
        this.loadFavorites()
        break;
      }
        case 'buscador':
        this.handleSearchData();
        break;
      default:
        console.error("Categoría no válida");
        break;
    }
  }

  // Método manejador de la data a inyectar en la interfaz de las listas de películas
  handleCategorySelected(categories: (keyof MoviesData)[], data: MoviesData): void {
    this.contentByTypeGroup = [];
    categories.forEach((category,) => {
      this.contentByTypeGroup.push({ type: category, items: data[category] });
    });
  }

  handleSearchData(): void {
    this.contentByTypeGroup = [];

    if (this.dataFromSearch && this.dataFromSearch.length > 0) {
      this.contentByTypeGroup.push({
        type: 'búsqueda',
        items: this.dataFromSearch
      });
    }else{
      this.isMoviesListEmpty = true
    }
  }

  // Método que agrupa y divide por el genero de la película
  groupByGenre(lista: DataMovies[]) {
    this.contentByGenreGroup = {};
    lista.forEach((item) => { // Iteramos por la lista de datos
      const genero = item.genre;
      if (!this.contentByGenreGroup[genero]) { // Si el genero no existe lo creamos
        this.contentByGenreGroup[genero] = [];
      }
      this.contentByGenreGroup[genero].push(item); // Si ya existe inyectamos la película o serie en ese genero
    });
  }

  // Métodos para manejar los favoritos
  addToFavorites(item: DataMovies): void {
    this.favoritesService.saveMovieIntoFavorites(Number(item.id)).subscribe({
      next: () => {
        console.log('Agregado a favoritos')
        this.getFavoritesIds()
      },
    });

  }
  removeFromFavorites(id: string | number): void {
    this.favoritesService.deleteMovieToFavorites(Number(id)).subscribe({
      next: () => {
        console.log('eliminado de favoritos')
        this.getFavoritesIds()
      }
    });
    if (this.category === "favorites") {
      this.loadFavorites();
    }
  }

  loadFavorites(): void {
    const userIdStr = localStorage.getItem('UserId');
        if (userIdStr !== null) {
          const userId = Number(userIdStr);
          this.favoritesService.getFavorites(userId).subscribe((data: MoviesData) => {
            this.handleCategorySelected(['movies'], data)
            this.getFavoritesIds();
          });
  }}

isFavorite(id: number): boolean {
  console.log(this.favoriteIdsSet)
  console.log(this.favoriteIdsSet.has(id))
  return this.favoriteIdsSet.has(id);
}

getFavoritesIds(){
const userId = Number(localStorage.getItem('UserId'));
  this.favoritesService.getFavoriteIds(userId).subscribe(ids => {
    this.favoriteIdsSet = new Set(ids);
  });
}

  loadMovieDetails(item: DataMovies): void {
    this.movieDetails.emit(item);
  }

}
