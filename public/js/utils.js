/*
Esta función renderiza una lista de películas en base a una sección de
un JSON y retorna un string que será usado por otra función que
interpretará el string como nodo de html y lo insertará en un contenedor
*/

function renderMovieList(data) {
  let content = '';

  data.forEach(movie => {
    content += `
      <div class="card">
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

/*
Esta función toma como argumento un string que será interpretado 
como nodo de html, ademas de el nombre del contenedor. Esto retornara 
un contenedor de una lista de películas 
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
      "title": "La Gran Aventura",
      "description": "Una emocionante aventura llena de acción.",
      "genre": "Acción",
      "year": 2022,
      "rating": 8.5,
      "duration": 120,
      "coverImage": "ruta/a/imagen1.jpg",
      "videoUrl": "ruta/a/video1.mp4"
    },
    {
      "id": "m2",
      "title": "El Misterio",
      "description": "Un intrigante misterio que te mantendrá en vilo.",
      "genre": "Misterio",
      "year": 2021,
      "rating": 7.8,
      "duration": 110,
      "coverImage": "ruta/a/imagen2.jpg",
      "videoUrl": "ruta/a/video2.mp4"
    },
    {
      "id": "m3",
      "title": "Risas Sin Fin",
      "description": "Una comedia para toda la familia.",
      "genre": "Comedia",
      "year": 2023,
      "rating": 7.0,
      "duration": 95,
      "coverImage": "ruta/a/imagen3.jpg",
      "videoUrl": "ruta/a/video3.mp4"
    },
    {
      "id": "m4",
      "title": "El Último Viaje",
      "description": "Una historia de despedida y redención.",
      "genre": "Drama",
      "year": 2019,
      "rating": 8.2,
      "duration": 130,
      "coverImage": "ruta/a/imagen4.jpg",
      "videoUrl": "ruta/a/video4.mp4"
    },
    {
      "id": "m5",
      "title": "Terror Nocturno",
      "description": "Una película de terror que te dejará sin dormir.",
      "genre": "Terror",
      "year": 2020,
      "rating": 6.9,
      "duration": 105,
      "coverImage": "ruta/a/imagen5.jpg",
      "videoUrl": "ruta/a/video5.mp4"
    }
  ],
  series: [
    {
      "id": "s1",
      "title": "Drama Urbano",
      "description": "Historias de la vida real en la ciudad.",
      "genre": "Drama",
      "year": 2020,
      "rating": 8.9,
      "coverImage": "ruta/a/serie1.jpg",
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
      "title": "Ciencia Oculta",
      "description": "Explorando los misterios del universo y más allá.",
      "genre": "Ciencia Ficción",
      "year": 2021,
      "rating": 9.1,
      "coverImage": "ruta/a/serie2.jpg",
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
      "title": "Mundos Paralelos",
      "description": "Un thriller de ciencia ficción sobre realidades alternativas.",
      "genre": "Suspenso",
      "year": 2023,
      "rating": 8.8,
      "coverImage": "ruta/a/serie3.jpg",
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
      "title": "Reinos Perdidos",
      "description": "Un épico viaje por tierras inexploradas.",
      "genre": "Fantasía",
      "year": 2020,
      "rating": 9.0,
      "coverImage": "ruta/a/serie4.jpg",
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
