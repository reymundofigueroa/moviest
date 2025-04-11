import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NavDescktopMenuComponent } from '../nav-descktop-menu/nav-descktop-menu.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SearchBarComponent, NavDescktopMenuComponent, MoviesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  contentTipe = 'peliculas';

  changeContent(tipe: string) {
    this.contentTipe = tipe;
  }
}
