import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component'; // Asegúrate de importar el componente standalone
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Proveedor de HttpClient
import { HttpClientModule } from '@angular/common/http';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListComponent, HttpClientModule],  // Importa el componente standalone aquí
      providers: [
        provideHttpClientTesting(),  // Esto provee HttpClient para las pruebas
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
