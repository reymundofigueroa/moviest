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

/*
  Se utiliza un closure para crear una función que renderiza una lista de películas por categoría,
  evitando que se ejecute al instante y permitiendo su reutilización en diferentes eventos.
*/

function getMovieList(data, category){
  return function(){
    moviesListContainer.innerHTML = '' // Limpiamos el contenedor antes de renderizar
    const categoryElement = renderCategoryMoviesContainer(data, category)
    moviesListContainer.appendChild(categoryElement) // Añadimos el contenido renderizado
  }
}

function getMoviesAndSeries(categoriesArray) {
  return function () {
    moviesListContainer.innerHTML = '' // Limpiamos el contenedor

    // Iteramos sobre las categorías para crear y agregar los elementos correspondientes
    for (let content of categoriesArray) {
      const categoryElement = renderCategoryMoviesContainer(data[content], content)
      moviesListContainer.appendChild(categoryElement)
    }
  }
}

/*
  Esta función agrupa las películas y series por géneros antes de renderizarlas,
  permitiendo una visualización más organizada y dinámica. Se hace así para evitar 
  redundancia y que el código sea fácilmente ampliable en el futuro con nuevos géneros.
*/

function getContentByGenre() {
  moviesListContainer.innerHTML = '' // Limpiamos el contenedor

  const genresList = {} // Objeto para agrupar por géneros

  // Agrupamos las películas por género
  data.movies.forEach(movie => {
    if (!genresList[movie.genre]) {
      genresList[movie.genre] = []
    }
    genresList[movie.genre].push(movie)
  })

  // Agrupamos las series por género
  data.series.forEach(serie => {
    if (!genresList[serie.genre]){
      genresList[serie.genre] = []
    } 
    genresList[serie.genre].push(serie)
  })

  // Recorremos los géneros para renderizar las categorías agrupadas
  for (let genre in genresList) {
    const contentByGenre = genresList[genre]
    const categoryElement = renderCategoryMoviesContainer(contentByGenre, genre)
    moviesListContainer.appendChild(categoryElement)
  }
}

function favoritesHandler(event) {
  // Primero, verificamos si se hizo clic en un ícono relevante
  const isHeartIcon = event.target.matches('.heart-icon')
  const isHideIcon = event.target.matches('.hide-icon')

  // Si el clic no fue en ninguno de los dos, salimos
  if (!isHeartIcon && !isHideIcon) return

  // Obtenemos la tarjeta contenedora de la película
  const movieCard = event.target.closest('.card')
  if (!movieCard) return

  // Extraemos el título para identificar la película
  const movieTitle = movieCard.querySelector('.title')?.textContent
  if (!movieTitle) return

  // Buscamos la película en nuestros datos
  const movie = findMovieDataByTitle(movieTitle)
  if (!movie) return

  if (isHeartIcon) {
    saveToFavorites(movie)
  } else if (isHideIcon) {
    deleteToFavorites(movie)
    // Actualizamos el contenedor 
    const updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
    const favoritesLoader = getMovieList(updatedFavorites, 'Favoritos')
  favoritesLoader()
  }
}

function playHandler(event){
  const isPlayIcon = event.target.matches('.play-button')
  console.log('click en play')
  if (!isPlayIcon) return

   // Obtenemos la tarjeta contenedora de la película
  const movieCard = event.target.closest('.card')
  if (!movieCard) return

   // Extraemos el título para identificar la película
  const movieTitle = movieCard.querySelector('.title')?.textContent
  if (!movieTitle) return
  

   // Buscamos la película en nuestros datos
  const movie = findMovieDataByTitle(movieTitle)
  if (!movie) return
  console.log(movie)
  moviesListContainer.innerHTML = ''
const detailsElement = renderMovieDetailsContainer(movie, 'Detalles')
moviesListContainer.appendChild(detailsElement)
}


// Closures de las funciones
homeLoader = getMoviesAndSeries(['movies', 'series'])
moviesLoader = getMovieList(data.movies, 'Películas')
seriesLoader = getMovieList(data.series, 'Series')

// Escuchadores de eventos
window.addEventListener('DOMContentLoaded', homeLoader)
document.addEventListener('click', favoritesHandler)
document.addEventListener('click', playHandler)
homeBtn.addEventListener('click', homeLoader)
moviesBtn.addEventListener('click', moviesLoader)
seriesBtn.addEventListener('click', seriesLoader)
categoriesBtn.addEventListener('click', getContentByGenre)
favoritesBtn.addEventListener('click', function() {
  const updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
  const favoritesLoader = getMovieList(updatedFavorites, 'Favoritos')
favoritesLoader()
})
