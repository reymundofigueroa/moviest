export interface DataMovies {
  id: number | string;
  title: string;
  description: string;
  genre: string;
  year?: number;
  rating?: number;
  duration?: number;
  coverImage: string;
  videoUrl?: string;
}
export interface ContentGroup {
  type: string;
  items: DataMovies[]; // Lista de películas o series
}

export type GroupedContent = Record<string, DataMovies[]>; // Clave: género, Valor: lista de películas o series

export interface MoviesData {
  movies: DataMovies[];
  series: DataMovies[];
}
