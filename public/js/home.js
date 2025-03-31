const moviesContainer = document.getElementById('moviesContainer')
async function getMovieList(){
  try{
    const response = await fetch('../js/data.json')
    const data = await response.json()

    renderMovieList(data.movies, moviesContainer)
    console.log(data)
  }
  catch{
    console.log('error')
  }
}
getMovieList()