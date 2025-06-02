import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MoviesData, DataMovies } from '../../shared/models/data-movies';
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'http://localhost:5222/';
  public moviesData: DataMovies[]= []

  constructor(private http: HttpClient) {}

  // Método para obtener las películas
  getHomeMovies(): Observable<MoviesData> {
    return this.http.get<MoviesData>(this.apiUrl + 'api/movies/home');
  }

  getFavoritesMovies(): Observable<MoviesData> {
    return this.http.get<MoviesData>(this.apiUrl + 'api/movies/home');
  }

  getMoviesSortedByCategory(): Observable<MoviesData> {
    return this.http.get<MoviesData>(this.apiUrl + 'api/movies/categories');
  }

  getSeries(): Observable<MoviesData> {
    return this.http.get<MoviesData>(this.apiUrl + 'api/Movies/series');
  }

  getMovies(): Observable<MoviesData> {
    return this.http.get<MoviesData>(this.apiUrl + 'api/Movies');
  }

  // Método para buscar las coincidencias de películas
searchMovies(query: string): Observable<DataMovies[]> {
  const params = new HttpParams().set('query', query);

  return this.http.get<MoviesData>(`${this.apiUrl}Search`, { params }).pipe(
    map(data => {
      this.moviesData = data.movies;
      return data.movies;
    }),
    catchError(error => {
      console.error('Error during search:', error);
      return of([] as DataMovies[]); // Devolvemos un array vacío en caso de error
    })
  );
}

}
