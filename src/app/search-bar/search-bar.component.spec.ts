import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl } from '@angular/forms';
import { MoviesService } from '../core/services/movies.service';
import { DataMovies } from '../shared/models/data-movies';
import { of } from 'rxjs';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let moviesServiceMock: jasmine.SpyObj<MoviesService>;

  const mockResults: DataMovies[] = [
    { id: '1', title: 'Test Movie', description: 'Desc', genre: 'Action', coverImage: 'img.jpg' }
  ];
  beforeEach(async () => {
    moviesServiceMock = jasmine.createSpyObj('MoviesService', ['searchMovies']);
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, HttpClientTestingModule],
      providers: [{ provide: MoviesService, useValue: moviesServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialización', () => {
    it('Debería crear el componente correctamente', () => {
      // Arrange
      // Act
      // Assert
      expect(component).toBeTruthy();
    });

    it('Debería inicializar el FormControl', () => {
      // Arrange
      // Act
      // Assert
      expect(component.searchControl).toBeInstanceOf(FormControl);
    });
  });


  it('Debería emitir resultados después del debounce', fakeAsync(() => {
    // Arrange
    const testQuery = 'test';
    moviesServiceMock.searchMovies.and.returnValue(of(mockResults));
    spyOn(component.searchResults, 'emit');
    spyOn(component.categorySelected, 'emit');

    // Act
    component.searchControl.setValue(testQuery);
    tick(250); // Avanzar el tiempo del debounce
    fixture.detectChanges();

    // Assert
    expect(moviesServiceMock.searchMovies).toHaveBeenCalledWith(testQuery);
    expect(component.searchResults.emit).toHaveBeenCalledWith(mockResults);
    expect(component.categorySelected.emit).toHaveBeenCalledWith('buscador');
  }));


});
