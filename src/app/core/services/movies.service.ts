import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviesData } from '../../shared/models/data-movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private jsonUrl = 'assets/data/movies.json';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<MoviesData> {
    return this.http.get<MoviesData>(this.jsonUrl);
  }
}
