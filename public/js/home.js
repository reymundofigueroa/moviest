// Nodos
const moviesListContainer = document.getElementById('moviesContainer')
const homeBtn = document.getElementById('home-btn')
const favoritesBtn = document.getElementById('favorites-btn')
const moviesBtn = document.getElementById('movie-btn')
const seriesBtn = document.getElementById('series-btn')
const categoriesBtn = document.getElementById('categories-btn')

/*
Guarda el closure de la función que genera listas de películas 
por categoría 
*/
let homeLoader
let seriesLoader
let moviesLoader
let favoritesLoader

// Funciones para cargar contenido
/*
Se opto por usar "closures" en las funciones debido 
a que requieren argumentos, y con el uso
de estos se logra poner los argumentos y que no se
llame al principio del addEventListener
*/
function getMovieList(data, category){
  return function(){
    moviesListContainer.innerHTML = ''
    const categoryElement = renderCategoryMoviesContainer(data, category);
    moviesListContainer.appendChild(categoryElement);
  }
}

function getMoviesAndSeries(categoriesArray) {
  return function () {
    moviesListContainer.innerHTML = '';
    
    for (let content of categoriesArray) {
      console.log(data[content]);
      const categoryElement = renderCategoryMoviesContainer(data[content], content);
      moviesListContainer.appendChild(categoryElement);
    }
  };
}

function getContentByGenre() {
  moviesListContainer.innerHTML = ''

  const genresList = {}

  // Agrupa series y películas por géneros
  data.movies.forEach(movie => {
    if (!genresList[movie.genre]) {
      genresList[movie.genre] = []
    }
    genresList[movie.genre].push(movie)
  })

  data.series.forEach(serie => {
    if (!genresList[serie.genre]){
      genresList[serie.genre] = []
    } 
    genresList[serie.genre].push(serie)
  })

  // Recorre cada género y lo renderiza
  for (let genre in genresList) {
    const contentByGenre = genresList[genre]
    const categoryElement = renderCategoryMoviesContainer(contentByGenre, genre)
    moviesListContainer.appendChild(categoryElement)
  }
}

function findMovieByTitle(title) {
  const movie = data.movies.find(m => m.title === title)
  if (movie) return movie

  const series = data.series.find(s => s.title === title)
  return series || null
}

function saveToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.some(fav => fav.id === movie.id)) {
    favorites.push(movie)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    console.log("Película guardada en favoritos:", movie)
  } else {
    console.log("La película ya está en favoritos.")
  }
}
console.log(JSON.parse(localStorage.getItem("favorites")));

// Closures
homeLoader = getMoviesAndSeries(['movies', 'series'])
moviesLoader = getMovieList(data.movies, 'Películas')
seriesLoader = getMovieList(data.series, 'Series')
favoritesLoader = getMovieList(JSON.parse(localStorage.getItem("favorites")))

// Escuchadores de eventos
window.addEventListener('DOMContentLoaded', homeLoader)
homeBtn.addEventListener('click', homeLoader)
moviesBtn.addEventListener('click', moviesLoader)
seriesBtn.addEventListener('click', seriesLoader)
categoriesBtn.addEventListener('click', getContentByGenre)
favoritesBtn.addEventListener('click', favoritesLoader)

document.addEventListener("click", function(event) {
  if (event.target.matches(".heart-icon")) {
    const movieCard = event.target.closest(".card")
    
    if (movieCard) {
      const movieTitle = movieCard.querySelector(".title").textContent

      const movie = findMovieByTitle(movieTitle)

      if (movie) {
        saveToFavorites(movie)
      }
    }
  }
})