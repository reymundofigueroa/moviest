import { Component, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  @Input()movie: any = {};
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainerElement!: ElementRef<HTMLDivElement>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movie']) {
      console.log('movie-details cambió:', this.movie);
    }
    document.addEventListener('fullscreenchange', this.handleFullscreenExit.bind(this));
  }

  ngAfterViewInit() {
    this.showVideo();
  }
  ngOnDestroy() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenExit.bind(this));
  }
  showVideo(){
    const videoContainer = this.videoContainerElement.nativeElement;
    const video = this.videoElement.nativeElement;
    videoContainer.style.display = 'block';
    video.play();

    video.requestFullscreen();
  }

  handleFullscreenExit(): void {
    const videoContainer = this.videoContainerElement.nativeElement;
    const video = this.videoElement.nativeElement;
    if (!document.fullscreenElement) {
      video.pause();
      videoContainer.style.display = 'none';
    }
  }
}
