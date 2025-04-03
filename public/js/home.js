const moviesListContainer = document.getElementById('moviesContainer')
const moviesListTitleContainer = document.getElementById('title-movies-container-section')
const homeBtn = document.getElementById('home-btn')
const favoritesBtn = document.getElementById('favorites-btn')
const moviesBtn = document.getElementById('movie-btn')
const seriesBtn = document.getElementById('series-btn')
let homeLoader;

const genres = ["Acción", "Misterio", "Comedia", "Drama", "Terror", "Ciencia Ficción", "Suspenso", "Fantasía"]
const homeCategories = ['movies', 'series']

async function getMovieList(){
  try{
    moviesListTitleContainer.innerHTML = ''
    moviesListContainer.innerHTML = ''
    renderMovieList(data.movies, moviesListTitleContainer, moviesListContainer, 'Películas')
    console.log(data)
  }
  catch(error){
    console.log(error)
  }
}

async function getSeriesList(){
  try{
    moviesListTitleContainer.innerHTML = ''
    moviesListContainer.innerHTML = ''
    renderMovieList(data.series, moviesListTitleContainer, moviesListContainer,  'Series')
    console.log(data)
  }
  catch(error){
    console.log(error)
  }
}
function getMoviesAndSeriesByCategory(array) {
  return function () {
    moviesListContainer.innerHTML = '';
    
    for (let content of array) {
      console.log(data[content]);
      
      // Convertimos la cadena en un elemento HTML antes de añadirla
      const categoryElement = renderCategoryMoviesContainer(data[content], content);
      moviesListContainer.appendChild(categoryElement);
    }
  };
}


homeLoader = getMoviesAndSeriesByCategory(homeCategories)
window.addEventListener('DOMContentLoaded', homeLoader)
homeBtn.addEventListener('click', homeLoader)
moviesBtn.addEventListener('click', getMovieList)
seriesBtn.addEventListener('click', getSeriesList)