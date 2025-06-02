import { Injectable } from '@angular/core';
import { DataMovies, ContentGroup, MoviesData } from "../../../shared/models/data-movies";
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:5222/api'
  contentByTypeGroup: ContentGroup[] = []; // Agrupado por tipo

  constructor(private http: HttpClient) {}

  // Detectamos si esta en favoritos
  isFavorites(id: string | number): boolean {
    const favorites: DataMovies[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    return favorites.some((fav) => fav.id === id);
  }


  // Guardamos en favoritos


    // Cargamos lista de favoritos
    loadFavorites(): ContentGroup[] {
      try {
        const favorites: DataMovies[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
        if (favorites.length > 0) {
          console.log('Cargando favoritos:', favorites);
          this.contentByTypeGroup = [{
            type: 'Favoritos',
            items: favorites
          }];
          return this.contentByTypeGroup;
        } else {
          return [];
        }
      } catch (error) {
        console.error(error);
        return [];
      }
    }

  getFavorites(userId: number): Observable<MoviesData> {
    return this.http.get<MoviesData>(`${this.apiUrl}/Favorites/user/${userId}`);
}

saveMovieIntoFavorites(contentId: number): Observable<any> {
    const userId = localStorage.getItem('UserId'); // o desde AuthService si ya lo usas
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const body = {
      userId: parseInt(userId),
      contentId: contentId
    };

    console.log(body)
    return this.http.post(this.apiUrl + '/Favorites', body);
  }

    deleteMovieToFavorites(contentId: number): Observable<any> {
    const userId = localStorage.getItem('UserId'); // o desde AuthService si ya lo usas
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const body = {
      userId: parseInt(userId),
      contentId: contentId
    };

    console.log(body)
    return this.http.delete(this.apiUrl + '/Favorites', { body });
  }

  isFavorite(userId: number, contentId: number): Observable<boolean> {
  return this.http.get<{ isFavorite: boolean }>(`${this.apiUrl}/exists/${userId}/${contentId}`)
    .pipe(map(response => response.isFavorite));
}

}
