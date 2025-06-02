import { Injectable } from '@angular/core';
import { DataMovies, ContentGroup, MoviesData } from "../../../shared/models/data-movies";
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FavoritesModel } from '../../../shared/models/favoritesHandlerModel';

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

  getFavorites(userId: number): Observable<MoviesData> {
    return this.http.get<MoviesData>(`${this.apiUrl}/Favorites/user/${userId}`);
}

saveMovieIntoFavorites(contentId: number): Observable<FavoritesModel> {
    const userId = localStorage.getItem('UserId'); // o desde AuthService si ya lo usas
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }

    const body = {
      userId: parseInt(userId),
      contentId: contentId
    };

    console.log(body)
    return this.http.post<FavoritesModel>(this.apiUrl + '/Favorites', body);
  }

   deleteMovieToFavorites(contentId: number): Observable<FavoritesModel> {
  const userId = localStorage.getItem('UserId');
  if (!userId) {
    throw new Error('User ID not found in localStorage');
  }

  const body = {
    userId: parseInt(userId),
    contentId: contentId
  };

  return this.http.delete<FavoritesModel>(this.apiUrl + '/Favorites', { body });
}



getFavoriteIds(userId: number): Observable<number[]> {
  return this.http.get<{ favoriteIds: number[] }>(`${this.apiUrl}/Favorites/ids/${userId}`)
    .pipe(
      map(response => response.favoriteIds)
    );
}

}
