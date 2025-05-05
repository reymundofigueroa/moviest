import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataMovies, MoviesData } from '../../shared/models/data-movies';
import { HttpErrorResponse } from '@angular/common/http';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  const mockResponse: MoviesData = {
    movies: [
      {
        id: 'm1',
        title: 'Test Movie',
        description: 'A test description',
        genre: 'Action',
        coverImage: 'test.jpg',
      }
    ],
    series: [
      {
        id: 's1',
        title: 'Test Series',
        description: 'A test series description',
        genre: 'Drama',
        coverImage: 'series.jpg'
      }
    ]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService, provideHttpClientTesting()]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify()
  })

  it('Debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests para el método getMovies()', () => {
    it('Debería retornar los datos con la estructura de MoviesData', () => {
      // Arrange
      let result: MoviesData | undefined;

     // Act
      service.getMovies().subscribe((data) => {
        result = data;
      });

      const req = httpMock.expectOne('assets/data/movies.json');
      req.flush(mockResponse);

     // Assert
      expect(result).toBeDefined();
      expect(result!.movies.length).toBe(1);
      expect(result!.movies[0]).toEqual(
        jasmine.objectContaining({
          id: jasmine.any(String),
          title: jasmine.any(String),
          description: jasmine.any(String),
          genre: jasmine.any(String),
          coverImage: jasmine.any(String)
        })
      )
      expect(result!.series.length).toBe(1)
      expect(result!.series[0]).toEqual(
        jasmine.objectContaining({
          id: jasmine.any(String),
          title: jasmine.any(String),
          description: jasmine.any(String),
          genre: jasmine.any(String),
          coverImage: jasmine.any(String)
        })
      )
    });
  })

  describe('Tests para el método loadData()', () => {
    it('Debería pre-cargar la data', (done) => {
      // Arrange
      let results:DataMovies[]

      // Act
      service.loadData().subscribe((data) => {
        results = [...data.movies, ...data.series]

        // Assert
        expect(results.length).toBe(2)
        expect(results[0].id).toBe('m1')
        expect(results[1].id).toBe('s1')
        done()

      })
      const req = httpMock.expectOne('assets/data/movies.json')
      req.flush(mockResponse)
    })

    it('Debería enviar un array de tipo MoviesData vacío si falla al cargar la data', (done) => {
      // Arrange
      let results: DataMovies[]
      spyOn(console, 'error')

      // Act
      service.loadData().subscribe((data) => {
        results = [...data.movies, ...data.series]

        // Assert
        expect(results.length).toBe(0)
        expect(console.error).toHaveBeenCalledWith('Error loading data:', jasmine.any(HttpErrorResponse));

        done()
      })

      const req = httpMock.expectOne('assets/data/movies.json')
      req.error(new ErrorEvent('Network error', {
        message:' Error al cargar la data'
      }))
    })
  })

  describe('Tests para el método searchMOvies()', () => {
    it('debería retornar películas que coincidan con el título (case-insensitive)', () => {
      // Arrange
      const query = 'test movie';
      let searchResult
      // Act
      service.moviesData = mockResponse.movies
      service.searchMovies(query).subscribe((data) => {
        searchResult = data
        // Assert
        expect(searchResult.length).toBe(1);
        expect(searchResult[0].title).toBe('Test Movie');
      });
    });

    it('debería retornar películas que coincidan con el título (case-sensitive)', () => {
      // Arrange
      const query = 'Test MOvie';
      let searchResult
      // Act
      service.moviesData = mockResponse.movies
      service.searchMovies(query).subscribe((data) => {
        searchResult = data
        // Assert
        expect(searchResult.length).toBe(1);
        expect(searchResult[0].title).toBe('Test Movie');
      });
    });
  })

  it('Debería devolver un array vacío si no encuentra la película', () => {
    // Arrange
    spyOn(console, 'warn');
    const query = '   ';
    let results

    // Act
    service.searchMovies(query).subscribe((data) => {
      results = data

      // Assert
      expect(results).toEqual([]);
      expect(console.warn).toHaveBeenCalledWith('La consulta esta vacía');
    });
  });

});
