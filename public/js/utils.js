
function renderMovieList(data, container){
  container.innerHTML = ''

  data.forEach(movie => {
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('card')

    const topIconsCardContainer = document.createElement('div')
    topIconsCardContainer.classList.add('top_icons-card-container')
    const hideIcon = document.createElement('img')
    hideIcon.setAttribute('src', '../assets/svg/hide.svg' )
    const favoriteIcon = document.createElement('img')
    favoriteIcon.setAttribute('src', '../assets/svg/heart.svg' )
    
    topIconsCardContainer.appendChild(hideIcon)
    topIconsCardContainer.appendChild(favoriteIcon)

    const playButtonContainer = document.createElement('div')
    playButtonContainer.classList.add('play_button-card-container')
    const playButton = document.createElement('img')
    playButton.classList.add('play-button')
    playButton.setAttribute('src', '../assets/svg/play.svg')

    playButtonContainer.appendChild(playButton)
    
    const movieTitleContainer = document.createElement('div')
    movieTitleContainer.classList.add('bottom_tittle-card-container')
    const title = document.createElement('h4')
    title.classList.add('title')
    title.textContent = movie.title
    console.log(movie.title)

    movieTitleContainer.appendChild(title)

    movieContainer.appendChild(topIconsCardContainer)
    movieContainer.appendChild(playButtonContainer)
    movieContainer.appendChild(movieTitleContainer)

    container.appendChild(movieContainer)
  });
  
}