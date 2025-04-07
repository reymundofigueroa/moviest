/*
Esta función renderiza una lista de películas en base a una sección de
un JSON y retorna un string que será usado por otra función que
interpretará el string como nodo de html y lo insertará en un videoContainer
*/

function renderMovieList(data) {
  let content = '';

  data.forEach(movie => {
    content += `
      <div style="background-image: url('../assets/images/${movie.coverImage}')" class="card">
        <div class="top_icons-card-container">
          <img class="hide-icon" src="../assets/svg/hide.svg" alt="Ocultar">
          <img class="heart-icon" src="../assets/svg/heart.svg" alt="Me gusta">
        </div>
        <div class="play_button-card-container">
          <img class="play-button" src="../assets/svg/play.svg" alt="Play">
        </div>
        <div class="bottom_tittle-card-container">
          <h4 class="title" >${movie.title}</h4>
        </div>
      </div>
    `;
  });

  return content;
}

function renderMovieDetails(data){
  let content = ''
  content = `
    <div style="background-image: url('../assets/images/${data.coverImage}')" id="detailsCard-container" class="card">
      <div class="top_icons-card-container">
        <img class="heart-icon" src="../assets/svg/heart.svg" alt="Me gusta">
      </div>
      <div class="play_button-card-container">
        <img id="play-movie" class="play-button" src="../assets/svg/play.svg" alt="Play">
      </div>
      <div class="bottom_tittle-card-container">
        <h4 class="title" >${data.title}</h4>
      </div>
    </div>
    <div class="details-container">
      <div class="detailsTitle-container">
        <h2>${data.title}</h2>
      </div>
      <div class="detailsDescription-container">
        <p>${data.description}</p>
      </div>
      <div>
        <button onclick="showVideo()" >¡Ver ahora!</button>
      </div>
    </div>
   
    <div id="video-container" style="display: none;">
      <video id="miVideo" width="100%" height="100%" controls style="display: block;">
        <source src="../assets/videos/MR-Robot-Linux.mp4" type="video/mp4">
        Tu navegador no soporta la etiqueta de video.
      </video>
      
      <button onclick="closeVideo()" style="
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 5px;
        ">
        ✖ Cerrar video
      </button>
    </div>
    
  `
  return content
}


function renderMovieDetailsContainer(data, category) {
  const categoryContainer = document.createElement('article')
  categoryContainer.innerHTML = `
    <div>
      <h2>${category}</h2>
    </div>
    <div class="cardAndDetails-container">
      ${renderMovieDetails(data)}
    </div>
  `

  return categoryContainer
}

/*
Esta función toma como argumento un string que será interpretado 
como nodo de html, ademas de el nombre del videoContainer. Esto retornara 
un videoContainer de una lista de películas 
*/

function renderCategoryMoviesContainer(data, category) {
  const categoryContainer = document.createElement('article')

  categoryContainer.innerHTML = `
    <div>
      <h2>${category}</h2>
    </div>
    <div class="cards-container">
      ${renderMovieList(data)}
    </div>
  `

  return categoryContainer
}
function showVideo() {
  const videoContainer = document.getElementById("video-container");
  const video = document.getElementById("miVideo");

  videoContainer.style.display = "block";

  setTimeout(() => {
    
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
      videoContainer.msRequestFullscreen();
    }
  
    video.play();
  }, 100);
}

function closeVideo() {
  const videoContainer = document.getElementById("video-container");
  const video = document.getElementById("miVideo");

  video.pause();
  video.currentTime = 0;
  videoContainer.style.display = "none";

  // Salir de pantalla completa si está activo
  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
/*
  Esta función permite la búsqueda de una película o serie por su título, 
  primero en el array de películas y luego en el de series, de manera eficiente.
  Se hace de esta forma para evitar redundancia al usar un solo criterio de búsqueda
  (título) para ambos tipos de contenido.
*/

function findMovieDataByTitle(title) {
  const movie = data.movies.find(m => m.title === title)
  if (movie) return movie

  const series = data.series.find(s => s.title === title)
  return series || null
}

/* 
  Se usa un check para evitar que una película o serie se guarde dos veces en los favoritos,
  lo cual mejora la experiencia del usuario al no permitir duplicados.
  Al guardar directamente en `localStorage` estamos persistiéndolo entre sesiones.
*/

function saveToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || []

  // Evitamos duplicados comprobando si ya existe en favoritos
  if (!favorites.some(fav => fav.id === movie.id)) {
    favorites.push(movie)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    console.log("Película guardada en favoritos:", movie)
  } else {
    console.log("La película ya está en favoritos.")
  }
}

/* 
  Esta función filtra los favoritos y elimina la película especificada,
  asegurándose de que los cambios sean persistidos en `localStorage`.
  Se hace de esta manera para actualizar la lista de favoritos de forma eficiente
  sin alterar el estado de otras películas o series.
*/
  
function deleteToFavorites(movie){
  let favorites = JSON.parse(localStorage.getItem("favorites")) || []

  // Creamos una nueva lista sin la película eliminada
  const updatedFavorites = favorites.filter(fav => fav.id !== movie.id)
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  console.log("Película eliminada de favoritos:", movie)
}

/* 
Los datos se movieron a este archivo porque si se clona el repositorio 
y se abre desde el archivo index.html sin iniciar un servidor local 
estos no funcionarán debido a temas de "CORS"
*/

let data = {
  movies: [
    {
      "id": "m1",
      "title": "El señor de los anillos",
      "description": "Una emocionante aventura llena de acción.",
      "genre": "Acción",
      "year": 2022,
      "rating": 8.5,
      "duration": 120,
      "coverImage": "El-señor-de-los-anillos.webp",
      "videoUrl": "ruta/a/video1.mp4"
    },
    {
      "id": "m2",
      "title": "Monster House",
      "description": "Un intrigante misterio que te mantendrá en vilo.",
      "genre": "Misterio",
      "year": 2021,
      "rating": 7.8,
      "duration": 110,
      "coverImage": "monster-house.webp",
      "videoUrl": "ruta/a/video2.mp4"
    },
    {
      "id": "m3",
      "title": "Señor dame paciencia",
      "description": "Una comedia para toda la familia.",
      "genre": "Comedia",
      "year": 2023,
      "rating": 7.0,
      "duration": 95,
      "coverImage": "señor-dame-paciencia.webp",
      "videoUrl": "ruta/a/video3.mp4"
    },
    {
      "id": "m4",
      "title": "Goku",
      "description": "Una historia de despedida y redención.",
      "genre": "Drama",
      "year": 2019,
      "rating": 8.2,
      "duration": 130,
      "coverImage": "goku.webp",
      "videoUrl": "ruta/a/video4.mp4"
    },
    {
      "id": "m5",
      "title": "Life of PI",
      "description": "Una película fascinante de ciencia y matemáticas.",
      "genre": "Drama",
      "year": 2020,
      "rating": 6.9,
      "duration": 105,
      "coverImage": "Life-of-PI.webp",
      "videoUrl": "ruta/a/video5.mp4"
    }
  ],
  series: [
    {
      "id": "s1",
      "title": "Dark",
      "description": "Historias de la vida real en la ciudad.",
      "genre": "Drama",
      "year": 2020,
      "rating": 8.9,
      "coverImage": "dark.webp",
      "seasons": [
        {
          "seasonNumber": 1,
          "episodes": [
            {
              "episodeNumber": 1,
              "title": "Comienzos difíciles",
              "duration": 42,
              "videoUrl": "ruta/a/serie1_s1_e1.mp4"
            }
          ]
        }
      ]
    },
    {
      "id": "s2",
      "title": "Phanteon",
      "description": "Explorando los misterios del universo y más allá.",
      "genre": "Ciencia Ficción",
      "year": 2021,
      "rating": 9.1,
      "coverImage": "phanteon.webp",
      "seasons": [
        {
          "seasonNumber": 1,
          "episodes": [
            {
              "episodeNumber": 1,
              "title": "El origen del cosmos",
              "duration": 50,
              "videoUrl": "ruta/a/serie2_s1_e1.mp4"
            }
          ]
        }
      ]
    },
    {
      "id": "s3",
      "title": "Breaking bad",
      "description": "Un thriller de ciencia ficción sobre realidades alternativas.",
      "genre": "Suspenso",
      "year": 2023,
      "rating": 8.8,
      "coverImage": "breaking-bad.webp",
      "seasons": [
        {
          "seasonNumber": 1,
          "episodes": [
            {
              "episodeNumber": 1,
              "title": "La puerta dimensional",
              "duration": 52,
              "videoUrl": "ruta/a/serie3_s1_e1.mp4"
            }
          ]
        }
      ]
    },
    {
      "id": "s4",
      "title": "Suits",
      "description": "Un épico viaje por tierras inexploradas.",
      "genre": "Drama",
      "year": 2020,
      "rating": 9.0,
      "coverImage": "suits.webp",
      "seasons": [
        {
          "seasonNumber": 1,
          "episodes": [
            {
              "episodeNumber": 1,
              "title": "El llamado del destino",
              "duration": 55,
              "videoUrl": "ruta/a/serie4_s1_e1.mp4"
            }
          ]
        }
      ]
    }
  ]
}
