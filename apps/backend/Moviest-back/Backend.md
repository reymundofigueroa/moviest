# 🔌 Backend - Moviest API

Este módulo corresponde a la **Web API desarrollada en C# (.NET 8)**, encargada de gestionar y exponer los datos almacenados en la base de datos SQL Server. Provee endpoints REST que son consumidos por el frontend de Moviest.

---

## 📁 Estructura del proyecto

```plaintext
/apps/backend/Moviest-back/
├── Controllers/         → Controladores API
├── Models/              → Modelos de datos
├── Data/                → Contexto de base de datos (DbContext)
├── Program.cs           → Configuración y punto de entrada
├── appsettings.json     → Configuración general (cadena de conexión, etc.)
└── Moviest-back.csproj  → Archivo del proyecto
```

## Cómo iniciar la API

1. Asegúrate de tener instalado

- .NET SDK 9.0
- SQL Server

2. Ejecutar desde la raíz del monorepo

```bash
npm run start:backend
```

---

## Documentación de endpoints

La documentación interactiva generada por swagger estará disponible en:

```bash
https://localhost:5222/swagger
```

El puerto puede variar según tu configuración, verifica en la terminal cuando levantas la API

---

## Conexión a la base de datos

La cadena de conexión se encuentra en:

```json
 "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=Moviest_DB;Trusted_Connection=True;TrustServerCertificate=True;Max Pool Size=100;Min Pool Size=5;"
    },
```

Puedes ajustarla según tu configuración local, pero se recomienda usar Windows Authentication

---

## Endpoints del proyecto

### Base URL

<http://localhost:5222/api>

El puerto puede cambiar según tu configuración, se recomienda verificarlo al momento de levantar la API

---

## 📋 Endpoints

### 🔐 Autenticación

#### POST `/auth/login`

Inicia sesión de un usuario registrado.

- **URL**: `/api/auth/login`
- **Método**: `POST`
- **Body (JSON)**:

```json
{
  "email": "usuario@correo.com",
  "password": "contraseña123"
}
```

##### Respuesta

- 200 OK:

```json
{
  "message": "Login successful",
  "userId": 1,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiZW1haWwiOiJtaWd1ZWxAZWplbXBsby5jb20iLCJuYW1lIjoiSnVhbiBQw6lyZXoiLCJleHAiOjE3NDc5MDA0Nzl9.n2vhv9SCgJdfR518PeBLRsa3FweCC7MTGcPH5Us3_Oc"
}
```

- 401 Unauthorized: Credenciales invalidas

---

### Registro

#### POST `/auth/register`

Registra un nuevo usuario en el sistema

- **URL**: `/api/auth/register`
- **Método**: `POST`
- **Body (JSON)**:

```json
{
  "email": "usuario@correo.com",
  "password": "contraseña123",
  "name": "Nombre Completo",
  "birthDate": "2000-01-01"
}
```

##### Respuesta

200 OK:

```json
{
  "message": "User registered successfully"
}
```

### Favoritos

#### POST `/api/Favorites`

Agrega un elemento a favoritos

- **URL**: `/api/Favorites`
- **Método**: `POST`
- **Body (JSON)**:

```json
{
  "userId": 1,
  "contentId": 1,
}
```

##### Respuesta

200 OK:

```json
{
  "message": "Favorite added successfully."
}
```

409 Conflict:

```json
{
  "message": "Favorite already exists."
}
```

404 Not found:

```json
{
  "message": "No content found with ID 91"
}
```

#### DELETE `/api/Favorites`

Agrega un elemento a favoritos

- **URL**: `/api/Favorites`
- **Método**: `DELETE`
- **Body (JSON)**:

```json
{
  "userId": 1,
  "contentId": 1,
}
```

##### Respuesta

200 OK:

```json
{
  "message": "Favorito eliminado correctamente."
}
```

404 Not found:

```json
{
  "message": "No se encontró el favorito."
}
```

#### GET `/api/Favorites/user/{userId}`

Agrega un elemento a favoritos

- **URL**: `/api/Favorites/user/{userId}`
- **Método**: `GET`
- **Body (JSON)**:

```json
{
  "userId": 1
}
```

##### Respuesta

200 OK:

```json
{
  "movies": [
    {
      "id": "4",
      "title": "Theory of Everithing",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://example.com/inception.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "8",
      "title": "Dragon ball evolution",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    }
  ]
}
```

#### GET `/api/Favorites/ids/{userId}`

Agrega un elemento a favoritos

- **URL**: `/api/Favorites/user/{userId}`
- **Método**: `GET`
- **Body (JSON)**:

```json
{
  "userId": 1
}
```

##### Respuesta

200 OK:

```json
{
  "favoriteIds": [
    4,
    8
  ]
}
```

### Películas

#### GET `/api/Movies`

Agrega un elemento a favoritos

- **URL**: `/api/Movies`
- **Método**: `GET`
- **Body NONE**:

##### Respuesta

200 OK:

```json
{
  "movies": [
    {
      "id": "4",
      "title": "Theory of Everithing",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://example.com/inception.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "8",
      "title": "Dragon ball evolution",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    }
  ]
}
```

#### GET `/api/Movies`

Agrega un elemento a favoritos

- **URL**: `/api/series`
- **Método**: `GET`
- **Body NONE**:

##### Respuesta

200 OK:

```json
{
  "series": [
    {
      "id": "5",
      "title": "Suits",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://example.com/inception.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "9",
      "title": "Death note",
      "description": "the best movie to the every time",
      "genre": "Comedia",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://image.tmdb.org/t/p/original/qDhbGqjZ7yFwa7FMIzuiQTQMfEQ.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    }
  ]
}
```

#### GET `/api/Movies/home`

Agrega un elemento a favoritos

- **URL**: `/api/Movies/home`
- **Método**: `GET`
- **Body NONE**:

##### Respuesta

200 OK:

```json
{
  "movies": [
    {
      "id": "4",
      "title": "Theory of Everithing",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://example.com/inception.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "8",
      "title": "Dragon ball evolution",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    }
  ],
  "series": [
    {
      "id": "5",
      "title": "Suits",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://example.com/inception.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "9",
      "title": "Death note",
      "description": "the best movie to the every time",
      "genre": "Comedia",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://image.tmdb.org/t/p/original/qDhbGqjZ7yFwa7FMIzuiQTQMfEQ.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    }
  ]
}
```

#### GET `/api/Movies/categories`

Agrega un elemento a favoritos

- **URL**: `/api/Favorites/user/{userId}`
- **Método**: `GET`
- **Body NONE**:

##### Respuesta

200 OK:

```json
{
  "Drama": [
    {
      "id": "4",
      "title": "Theory of Everithing",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://example.com/inception.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "5",
      "title": "Suits",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://example.com/inception.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "8",
      "title": "Dragon ball evolution",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    }
  ],
  "Comedia": [
    {
      "id": "9",
      "title": "Death note",
      "description": "the best movie to the every time",
      "genre": "Comedia",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://image.tmdb.org/t/p/original/qDhbGqjZ7yFwa7FMIzuiQTQMfEQ.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    }
  ]
}
```

#### GET `/api/Movies/{id}`

Agrega un elemento a favoritos

- **URL**: `/api/Favorites/user/{userId}`
- **Método**: `GET`
- **Body JSON**:

```json
"id": 8
```

##### Respuesta

200 OK:

```json
{
  "id": 8,
  "title": "Dragon ball evolution",
  "contentDescription": "the best movie to the every time",
  "contentType": "M",
  "categoryId": 4,
  "category": null,
  "contentYear": "2010-07-16T00:00:00",
  "rating": 8.8,
  "duration": "02:28:00",
  "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
  "videoUrl": "https://example.com/inception.mp4"
}
```

404 Not found:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
  "title": "Not Found",
  "status": 404,
  "traceId": "00-fbf284d14a8e5fec084db2a2328356f4-1f99da3317680824-00"
}
```

#### POST `/api/Movies`

Agrega un elemento a favoritos

- **URL**: `/api/Movies`
- **Método**: `GET`
- **Body JSON**:

```json
{
  "title": "Dragon ball evolution",
  "contentDescription": "the best movie to the every time",
  "contentType": "M",
  "categoryId": 4,
  "category": null,
  "contentYear": "2010-07-16T00:00:00",
  "rating": 8.8,
  "duration": "02:28:00",
  "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
  "videoUrl": "https://example.com/inception.mp4"
}
```

##### Respuesta

200 OK:

```json
{
  "id": 8,
  "title": "Dragon ball evolution",
  "contentDescription": "the best movie to the every time",
  "contentType": "M",
  "categoryId": 4,
  "category": null,
  "contentYear": "2010-07-16T00:00:00",
  "rating": 8.8,
  "duration": "02:28:00",
  "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
  "videoUrl": "https://example.com/inception.mp4"
}
```

 ### Búsqueda

#### GET `/search`

Agrega un elemento a favoritos

- **URL**: `/Search?query={searchContent}`
- **Método**: `GET`
- **Body QueryParams**:

##### Respuesta

200 OK:

```json
{
  "movies": [
    {
      "id": "4",
      "title": "Theory of Everithing",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://example.com/inception.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "5",
      "title": "Suits",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://example.com/inception.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "8",
      "title": "Dragon ball evolution",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "9",
      "title": "Death note",
      "description": "the best movie to the every time",
      "genre": "Comedia",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "https://image.tmdb.org/t/p/original/qDhbGqjZ7yFwa7FMIzuiQTQMfEQ.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "10",
      "title": "Dragon ball evolution",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    },
    {
      "id": "11",
      "title": "Dragon baddddddll evolution",
      "description": "the best movie to the every time",
      "genre": "Drama",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "coverImage": "http://www.freemovieposters.net/posters/dragonball_evolution_2009_3760_poster.jpg",
      "videoUrl": "https://example.com/inception.mp4"
    }
  ]
}
```

---

## Seguridad

- Las contraseñas se almacenan con hashing mediante BCrypt.

- Los datos sensibles como la clave secreta para JWT se manejan a través de variables de entorno.

### Configuración de variables de entorno para JWT

Para que el sistema de autenticación basado en JWT funcione correctamente, necesitas definir una clave secreta en tus variables de entorno. Esta clave será utilizada para firmar y validar los tokens generados por la API.

1. Crea un archivo .env en la raíz del proyecto
Este archivo debe contener la clave secreta utilizada para firmar los JWT.

📁 Ruta: Moviest-back/.env

JWT_SECRET_KEY=una_clave_super_segura_de_32_caracteres

Importante que la clave tenga 32 caracteres

---

### Cómo lo hice

1. Cree los modelos de las bases de datos para cada tabla que consumí
2. cree los DTOS para ajustar el formato de envío para el frontend
3. Agregué el contexto de los modelos de mis tablas en el MoviestDbContext
4. Cree los controladores divididos por lógica de las secciones que usarían, es decir uno para favoritos, otro para búsquedas, etc.
5. dentro de los controladores agregué la lógica para cada endpoint

---

### Errores conocidos

- No sirven los endpoints de delete y put para las películas
- No todos los endpoints devuelven una repuesta de mensaje JSON sino texto plano. Lo cual no obedece un orden en las respuestas

---

### Dependencias utilizadas

El proyecto "Moviest-back" tiene las referencias de paquete siguientes <br>
   [net9.0]:
  - Paquete de nivel superior                            Solicitado   Resuelto <br>
   1. BCrypt.Net-Next                                    4.0.3        4.0.3 <br> 
   2. DotNetEnv                                          3.1.1        3.1.1 <br>
   3. Microsoft.AspNetCore.Authentication.JwtBearer      9.0.5        9.0.5 <br>
   4. Microsoft.AspNetCore.OpenApi                       9.0.5        9.0.5 <br>
   5. Microsoft.EntityFrameworkCore.SqlServer            9.0.5        9.0.5 <br>
   6. Microsoft.EntityFrameworkCore.Tools                9.0.5        9.0.5 <br>
   7. Swashbuckle.AspNetCore                             8.1.1        8.1.1

### Ultima modificación 02/06/2025
