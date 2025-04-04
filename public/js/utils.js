
function renderMovieList(data) {
  let content = '';

  data.forEach(movie => {
    content += `
      <div class="card">
        <div class="top_icons-card-container">
          <img src="../assets/svg/hide.svg" alt="Ocultar">
          <img src="../assets/svg/heart.svg" alt="Me gusta">
        </div>
        <div class="play_button-card-container">
          <img class="play-button" src="../assets/svg/play.svg" alt="Play">
        </div>
        <div class="bottom_tittle-card-container">
          <h4 class="title">${movie.title}</h4>
        </div>
      </div>
    `;
  });

  return content;
}

function renderCategoryMoviesContainer(data, category) {
  const categoryContainer = document.createElement('article');

  categoryContainer.innerHTML = `
    <div>
      <h2>${category}</h2>
    </div>
    <div class="cards-container">
      ${renderMovieList(data)}
    </div>
  `;

  return categoryContainer;
}

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
