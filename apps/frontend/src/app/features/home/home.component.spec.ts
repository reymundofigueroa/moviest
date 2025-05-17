import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MoviesService } from '../../core/services/movies.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';  // Proveedor correcto

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientModule],  // Asegúrate de que el módulo esté incluido
      providers: [
        MoviesService,  // MoviesService debe estar correctamente provisto
        provideHttpClientTesting()  // Esto proporciona HttpClient en el test
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
