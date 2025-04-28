import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { FavoritesService } from '../services/favorites.service';
import { ElementRef } from '@angular/core';


describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería crear un addEventListener', () => {
    // Arrange
    spyOn(document, 'addEventListener')

    // Act
    component.ngOnChanges()

    // Assert
    expect(document.addEventListener).toHaveBeenCalled()
    expect(document.addEventListener).toHaveBeenCalledWith('fullscreenchange', jasmine.any(Function));
  })

  it('Debería eliminar el addEventListener', () => {
    // arrange
    spyOn(document, 'removeEventListener')

    // Act
    component.ngOnDestroy()

    // Assert
    expect(document.removeEventListener).toHaveBeenCalled()
    expect(document.removeEventListener).toHaveBeenCalledWith('fullscreenchange', jasmine.any(Function))
  })

  it('Debería mostrar el video', () => {
    // Arrange
    component.videoContainerElement = {
      nativeElement: {
        style: { display: '' }
      }
    } as ElementRef<HTMLDivElement>;

    component.videoElement = {
      nativeElement: {
        play: jasmine.createSpy('play'),
        requestFullscreen: jasmine.createSpy('requestFullscreen')
      } as unknown as HTMLVideoElement
    } as ElementRef<HTMLVideoElement>;
  // Act
  component.showVideo();

  // Assert
  expect(component.videoContainerElement.nativeElement.style.display).toBe('block')
  expect(component.videoElement.nativeElement.play).toHaveBeenCalled()
  expect(component.videoElement.nativeElement.requestFullscreen).toHaveBeenCalled()
});

it('Debería pausar y ocultar la película', () => {
  // Arrange
  component.videoContainerElement = {
    nativeElement: {
      style: { display: '' }
    }
  } as ElementRef<HTMLDivElement>;

  component.videoElement = {
    nativeElement: {
      pause: jasmine.createSpy('pause'),
    } as unknown as HTMLVideoElement
  } as ElementRef<HTMLVideoElement>;

  // Act
  component.handleFullscreenExit()

  // Assert
  expect(component.videoElement.nativeElement.pause).toHaveBeenCalled()
  expect(component.videoContainerElement.nativeElement.style.display).toBe('none')
})
})
