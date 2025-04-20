import { Injectable } from '@angular/core';
import { DataMovies, ContentGroup } from "../../../shared/models/data-movies";


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  contentByTypeGroup: ContentGroup[] = []; // Agrupado por tipo

  isFavorite(id: string | number): boolean {
    const favorites: DataMovies[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    return favorites.some((fav) => fav.id === id);
  }

  saveMovieIntoFavorites(item: DataMovies): void {
      const favorites: DataMovies[] = JSON.parse(localStorage.getItem('favoritos') || '[]');


      if (!this.isFavorite(item.id)) {
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
      console.log('Cargando favoritos:', favorites);
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
    }
}
