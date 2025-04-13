import { Component, Input, SimpleChanges, } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movie']) {
      console.log('movie-details cambió:', this.movie);
    }
  }
}
