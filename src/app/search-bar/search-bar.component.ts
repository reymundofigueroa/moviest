import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../core/services/movies.service';
import { DataMovies, } from '../shared/models/data-movies';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit  {

  searchControl = new FormControl('');
  isLoading = false;

  @Output() searchResults = new EventEmitter<DataMovies[]>();
  @Output() categorySelected = new EventEmitter<string>()

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    console.log('cambios')
    this.searchControl.valueChanges.pipe(
      debounceTime(250), // Espera 300ms después de cada tecleo
      distinctUntilChanged(), // Solo emite si el valor cambió
      tap(() => this.isLoading = true),
      switchMap(query => this.moviesService.searchMovies(query!)),
      tap(() => this.isLoading = false)
    ).subscribe(results => {
      this.categorySelected.emit('buscador')
      this.searchResults.emit(results);
      console.log('🔍🔍', results)
    });
  }


  // método para iniciar la búsqueda
  triggerSearch() {
    const query = this.searchControl.value;
    this.moviesService.searchMovies(query || '').subscribe(results => {
      this.categorySelected.emit('buscador')
      this.searchResults.emit(results);
    });
  }
}
