import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component'; // Asegúrate de importar el componente standalone
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Proveedor de HttpClient
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from '../../../core/services/movies.service';
import { FavoritesService } from '../services/favorites.service';
import { ContentGroup, MoviesData } from '../../../shared/models/data-movies';
import { of } from 'rxjs';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let moviesService: MoviesService
  let favoritesService: FavoritesService
  const mockMoviesData: MoviesData = {
    movies: [
      {id: 'm1', title: 'Test Movie 1', description: 'First movie test', genre: 'acción', coverImage: 'url/test1' },
      {id: 'm2', title: 'Test movie 2', description: 'Second movie test', genre: 'comedia', coverImage: 'url/test2'}
    ],
    series: [
      {id: 's1', title: 'Test serie 1', description: 'First serie test', genre: 'terror', coverImage: 'url/test1'},
      {id: 's2', title: 'Test serie 2', description: 'Second serie test', genre: 'comedia', coverImage: 'url/test'}
    ]}
    const mockToAFavoriteMovie: ContentGroup[] = [{type: 'favoritos', items: [{id: 'm1', title: 'Test favorite movie', description: 'A movie to load favorites test', genre: 'acción', coverImage: 'url/test'}]}]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListComponent, HttpClientModule],  // Importa el componente standalone aquí
      providers: [
        provideHttpClientTesting(),  // Esto provee HttpClient para las pruebas
        MoviesService,
        FavoritesService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    moviesService = TestBed.inject(MoviesService);
    favoritesService = TestBed.inject(FavoritesService)
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería llenar correctamente contentByTypeGroup si la categoría es "movies"', () => {
    // Arrange
    component.category = 'movies'
    spyOn(moviesService, 'getMovies').and.returnValue(of(mockMoviesData));

    // Act
    component.ngOnChanges();

    // assert
    expect(component.contentByTypeGroup.length).toBe(1);
    expect(component.contentByTypeGroup[0].type).toBe('movies');
    expect(component.contentByTypeGroup[0].items).toEqual(mockMoviesData.movies);
    })

    it('Debería llenar contentByTypeGroup con solo series cuando el type sea "series"', () => {
      // Arrange
      component.category = 'series'
      spyOn(moviesService, 'getMovies').and.returnValue(of(mockMoviesData))

      // Act
      component.ngOnChanges()

      // Assert
      expect(component.contentByTypeGroup.length).toBe(1)
      expect(component.contentByTypeGroup[0].type).toBe('series')
      expect(component.contentByTypeGroup[0].items).toEqual(mockMoviesData.series)
    })

    it('Debería llenar contentByGenre con las películas o series ordenadas por genero', () => {
      // Arrange
      component.category = 'categories'
      spyOn(moviesService, 'getMovies').and.returnValue(of(mockMoviesData))

      // Act
      component.ngOnChanges()

      // Assert
      expect(Object.keys(component.contentByGenreGroup).length).toBe(3)
      expect(Object.keys(component.contentByGenreGroup)[0]).toBe('acción')
      expect(component.contentByGenreGroup['acción'].length).toBe(1)
      expect(Object.keys(component.contentByGenreGroup)[1]).toBe('comedia')
      expect(component.contentByGenreGroup['comedia'].length).toBe(2)
      expect(Object.keys(component.contentByGenreGroup)[2]).toBe('terror')
      expect(component.contentByGenreGroup['terror'].length).toBe(1)
    })

    it('Debería cargar la lista completa de los datos segmentados en "películas" y en "series"', () => {
      // Arrange
      component.category = 'home'
      spyOn(moviesService, 'getMovies').and.returnValue(of(mockMoviesData))

      // Act
      component.ngOnChanges()

      // Assert
      expect(component.contentByTypeGroup.length).toBe(2)
      expect(component.contentByTypeGroup[0].items).toEqual(mockMoviesData.movies)
      expect(component.contentByTypeGroup[1].items).toEqual(mockMoviesData.series)
      expect(component.contentByTypeGroup[0].type).toBe('movies')
      expect(component.contentByTypeGroup[1].type).toBe('series')
    })

    it('Debería cargar los favoritos', () => {
      // Arrange
      component.category = 'favorites'
      // Implementamos un espía de MoviesService con data vacía para que el flujo de enOnChanges no se corte
      spyOn(moviesService, 'getMovies').and.returnValue(of({movies: [], series: []}))
      spyOn(favoritesService, 'loadFavorites').and.returnValue(mockToAFavoriteMovie)
      favoritesService.contentByTypeGroup = mockToAFavoriteMovie
      // Act
      component.ngOnChanges()

      // Assert
      expect(component.contentByTypeGroup.length).toBe(1)
      expect(component.contentByTypeGroup[0].items.length).toBe(1)
      expect(component.contentByTypeGroup[0].items[0].id).toBe('m1')
    })

    it('Debería lanzar el error "Categoría no válida" si la categoría no es correcta', () => {
      // Arrange
      component.category = 'categoría invalida'
      spyOn(moviesService, 'getMovies').and.returnValue(of({movies: [], series: []}))
      spyOn(console, 'error')

      // Act
      component.ngOnChanges()

      // assert
      expect(console.error).toHaveBeenCalled()
      expect(console.error).toHaveBeenCalledOnceWith('Categoría no válida')
    })
});
