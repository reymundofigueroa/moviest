import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesData, DataMovies } from '../../shared/models/data-movies';
import { Observable, of } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'http://localhost:5222/api/movies/home';
  public moviesData: DataMovies[]= []

  constructor(private http: HttpClient) {}

  // Método para obtener las películas
  getMovies(): Observable<MoviesData> {
    return this.http.get<MoviesData>(this.apiUrl);
  }


  // Método para cargar la data y usarla cuando el buscador la necesite
  loadData(): Observable<MoviesData> {
    return this.http.get<MoviesData>(this.apiUrl).pipe(
      map(data => {
        this.moviesData = [...data.movies, ...data.series];
        return { movies: data.movies, series: data.series };
      }),
      catchError(error => {
        console.error('Error loading data:', error);
        return of({ movies: [], series: [] } as MoviesData);
      })
    );
  }

  // Método para buscar las coincidencias de películas
  searchMovies(query: string): Observable<DataMovies[]> {
    console.log('buscando')
    if (!query.trim()) {
    console.warn('La consulta esta vacía')
      return of([]);
    }

    const lowerCaseQuery = query.toLowerCase();
    return of(this.moviesData).pipe(
      map(movies => {
        const results:DataMovies[] = movies.filter(movie =>
          movie.title.toLowerCase().includes(lowerCaseQuery) ||
          (movie.description && movie.description.toLowerCase().includes(lowerCaseQuery))
        );
        console.log('Resultados encontrados:', results);
        return results;
      })
    );
  }
}
