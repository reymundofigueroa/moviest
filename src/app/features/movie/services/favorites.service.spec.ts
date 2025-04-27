import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { DataMovies } from '../../../shared/models/data-movies';

// Función para simular el comportamiento de localStorage en los tests
export function setupMockLocalStorage() {
  const store: Record<string, string> = {};

  const mock = {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(key => delete store[key]); },
  };

  spyOn(window.localStorage, 'getItem').and.callFake((key) => mock.getItem(key));
  spyOn(window.localStorage, 'setItem').and.callFake((key, value) => mock.setItem(key, value));
  spyOn(window.localStorage, 'removeItem').and.callFake((key) => mock.removeItem(key));
  spyOn(window.localStorage, 'clear').and.callFake(() => mock.clear());

  return mock;
}

describe('FavoritesService', () => {
  let service: FavoritesService;
  let mockLocalStorage: ReturnType<typeof setupMockLocalStorage>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    mockLocalStorage = setupMockLocalStorage();
  });

  // Test de creación del servicio
  it('Debería crear el servicio para favoritos', () => {
    expect(service).toBeTruthy();
  });

  // Test de guardar una película en favoritos
  describe('Guardar película en favoritos', () => {
    it('Debería guardar una película en favoritos', () => {
      const mockMovie: DataMovies = {
        id: 'm1',
        title: 'Test movie',
        description: 'A test movie element',
        genre: 'action',
        coverImage: 'url/test'
      };

      const storageKey = 'favoritos';
      service.saveMovieIntoFavorites(mockMovie);

      const storedFavorites = JSON.parse(mockLocalStorage.getItem(storageKey)!);
      expect(Array.isArray(storedFavorites)).toBeTrue();
      expect(storedFavorites.length).toBe(1);
      expect(storedFavorites[0].title).toBe('Test movie');
    });
  });

  // Test de cargar la lista de favoritos
  describe('Cargar lista de favoritos', () => {
    it('Debería cargar la lista de favoritos', () => {
      const mockMovie: DataMovies = {
        id: 'm1',
        title: 'Test movie',
        description: 'A test movie element',
        genre: 'action',
        coverImage: 'url/test'
      };

      service.saveMovieIntoFavorites(mockMovie);
      const result = service.loadFavorites();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(1);
      expect(result[0].items[0].id).toBe('m1');
      expect(result[0].items[0].title).toBe('Test movie');
    });

    it('Debería retornar un array vacío si no hay favoritos', () => {
      mockLocalStorage.getItem = () => null;
      const result = service.loadFavorites();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(0);
    });
  });

  // Test de verificar si una película es favorita
  describe('Verificar si una película es favorita', () => {
    it('Debería devolver true si el id está en los favoritos', () => {
      const mockMovie: DataMovies = {
        id: 'm1',
        title: 'Test movie',
        description: 'A test movie element',
        genre: 'action',
        coverImage: 'url/test'
      };

      mockLocalStorage.setItem('favoritos', JSON.stringify([mockMovie]));
      const result = service.isFavorite('m1');
      expect(result).toBeTrue();
    });

    it('Debería devolver false si el id no está en los favoritos', () => {
      const mockMovie: DataMovies = {
        id: 'm1',
        title: 'Test movie',
        description: 'A test movie element',
        genre: 'action',
        coverImage: 'url/test'
      };

      mockLocalStorage.setItem('favoritos', JSON.stringify([mockMovie]));
      const result = service.isFavorite('m2');
      expect(result).toBeFalse();
    });

    it('Debería devolver false si no hay favoritos en localStorage', () => {
      mockLocalStorage.setItem('favoritos', JSON.stringify([]));
      const result = service.isFavorite('m1');
      expect(result).toBeFalse();
    });
  });

  // Test de eliminar película de favoritos
  describe('Eliminar película de favoritos', () => {
    it('Debería eliminar un favorito correctamente', () => {
      const mockMovie: DataMovies = {
        id: 'm1',
        title: 'Test movie',
        description: 'A test movie element',
        genre: 'action',
        coverImage: 'url/test'
      };

      mockLocalStorage.setItem('favoritos', JSON.stringify([mockMovie]));
      service.deleteMovieToFavorites('m1');

      const favoritesAfterDeletion = JSON.parse(mockLocalStorage.getItem('favoritos') || '[]');
      expect(favoritesAfterDeletion.length).toBe(0);
    });

    it('No debería modificar localStorage si el id no está en los favoritos', () => {
      const mockMovie: DataMovies = {
        id: 'm1',
        title: 'Test movie',
        description: 'A test movie element',
        genre: 'action',
        coverImage: 'url/test'
      };

      mockLocalStorage.setItem('favoritos', JSON.stringify([mockMovie]));
      service.deleteMovieToFavorites('m2');

      const favoritesAfterDeletion = JSON.parse(mockLocalStorage.getItem('favoritos') || '[]');
      expect(favoritesAfterDeletion.length).toBe(1);
      expect(favoritesAfterDeletion[0].id).toBe('m1');
    });

    it('Debería eliminar el favorito correcto cuando hay varios', () => {
      const mockMovies: DataMovies[] = [
        { id: 'm1', title: 'Test movie 1', description: 'First test movie', genre: 'action', coverImage: 'url/test1' },
        { id: 'm2', title: 'Test movie 2', description: 'Second test movie', genre: 'comedy', coverImage: 'url/test2' }
      ];

      mockLocalStorage.setItem('favoritos', JSON.stringify(mockMovies));
      service.deleteMovieToFavorites('m1');

      const favoritesAfterDeletion = JSON.parse(mockLocalStorage.getItem('favoritos') || '[]');
      expect(favoritesAfterDeletion.length).toBe(1);
      expect(favoritesAfterDeletion[0].id).toBe('m2');
    });
  });

});
