const moviesListContainer = document.getElementById('moviesContainer')
const homeBtn = document.getElementById('home-btn')
const favoritesBtn = document.getElementById('favorites-btn')
const moviesBtn = document.getElementById('movie-btn')
const seriesBtn = document.getElementById('series-btn')
let homeLoader;

const genres = ["Acción", "Misterio", "Comedia", "Drama", "Terror", "Ciencia Ficción", "Suspenso", "Fantasía"]
const homeCategories = ['movies', 'series']

async function getMovieList(){
  try{
    moviesContainer.innerHTML = ''
    renderMovieList(data.movies, moviesContainer, 'Películas')
    console.log(data)
  }
  catch(error){
    console.log(error)
  }
}

async function getSeriesList(){
  try{
    moviesContainer.innerHTML = ''
    renderMovieList(data.series, moviesContainer, 'Series')
    console.log(data)
  }
  catch(error){
    console.log(error)
  }
}


function getMoviesAndSeriesByCategory(array) {
    return function(){
      moviesContainer.innerHTML = '';
      for (let content of array) {
        renderMovieList(data[content], moviesContainer, content);
      }
    } 
  };


homeLoader = getMoviesAndSeriesByCategory(homeCategories)
window.addEventListener('DOMContentLoaded', homeLoader)
homeBtn.addEventListener('click', homeLoader)
moviesBtn.addEventListener('click', getMovieList)
seriesBtn.addEventListener('click', getSeriesList)