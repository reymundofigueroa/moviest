import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

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
  let mock

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);

  });

  it('should be created Favoritos', () => {
    expect(service).toBeTruthy();
  });
});
