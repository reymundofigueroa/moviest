import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";
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

export class MoviesListComponent implements OnChanges {
  @Input() category = "";
  @Output() movieDetails = new EventEmitter<DataMovies>();
  contentByGenreGroup: GroupedContent = {}; // Agrupado por género
  contentByTypeGroup: ContentGroup[] = []; // Agrupado por tipo

  constructor(private moviesService: MoviesService, private favoritesService: FavoritesService) {}

  ngOnChanges() {
    console.log("tipo recibido", this.category);
    this.moviesService.getMovies().subscribe((data: MoviesData) => {
      console.log("🔍🔍data movies", data);
      const items: DataMovies[] = [];
      console.log("🔍🔍🔍items", items);

      this.renderMoviesLists(data, items);

    });
  }

  renderMoviesLists(data: MoviesData, items: DataMovies[]): void{
    switch (this.category) {
      case "movies":
        this.handleCategorySelected(["movies"], data);
        break;
      case "series":
        this.handleCategorySelected(["series"], data);
        console.log("contentByGenreGroup", this.contentByGenreGroup);
        break;
      case "categories":
        items = [...data.movies, ...data.series];
        this.groupByGenre(items);
        break;
      case "home":
        this.handleCategorySelected(['movies', 'series'], data);
        break;
      case "favorites":
        this.loadFavorites();
        break;
      default:
        console.error("Categoría no válida");
        break;
    }
  }

  handleCategorySelected(categories: (keyof MoviesData)[], data: MoviesData): void {
    this.contentByTypeGroup = [];
    categories.forEach((category,) => {
      this.contentByTypeGroup.push({ type: category, items: data[category] });
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

  addToFavorites(item: DataMovies): void {
    this.favoritesService.saveMovieIntoFavorites(item);
  }
  removeFromFavorites(id: string | number): void {
    this.favoritesService.deleteMovieToFavorites(id);
    if (this.category === "favorites") {
      this.loadFavorites();
    }
  }

  loadFavorites(): void {
    this.favoritesService.loadFavorites();
    this.contentByTypeGroup = this.favoritesService.contentByTypeGroup;
  }

  isFavorite(id: string | number): boolean {
    return this.favoritesService.isFavorite(id);
  }
  loadMovieDetails(item: DataMovies): void {
    this.movieDetails.emit(item);
  }
}
