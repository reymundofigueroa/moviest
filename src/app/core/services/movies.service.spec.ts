import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesData } from '../../shared/models/data-movies';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService, provideHttpClientTesting()]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('Debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debería retornar los datos con la estructura de MoviesData', () => {
     // Arrange
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

});
