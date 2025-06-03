# 🧩 Monorepo - Hub de entretenimiento Moviest

Este repositorio contiene el sistema completo dividido en tres módulos principales:

- 🔌 [Backend (API)](./apps/backend/Moviest-back/Backend.md)
- 🗃️ [Base de Datos](./database-sql/00_Documentacion/DataBase.md)
- 🎨 [Frontend](./apps/frontend/Frontend.md)

---

## Creado por

Con amor por: Reymundo Fernando Figueroa Romo

---

## 🚀 Cómo iniciar

### Requisitos previos

Asegúrate de tener instalados en tu entorno:

- [Node.js](https://nodejs.org/) (v18 recomendado)
- [Angular CLI](https://angular.io/cli)
- [.NET SDK](https://dotnet.microsoft.com/) (v9.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- `concurrently` (ya está en las dependencias si ejecutas `npm install`)

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/reymundofigueroa/moviest
cd moviest
```

---

### 2. Ejecutar el comando 'npm install' dentro de cada una de las siguientes rutas del repositorio

1. Raíz del proyecto
2. apps/frontend

---

### 3. Para ejecutar ambos proyectos en simultaneo ejecuta el siguiente comando desde la raíz del proyecto

```bash
npm run start
```

---

### 4. Para ejecutar los proyectos por separado ejecuta en la raíz del proyecto

```bash
npm run start:frontend

npm run start:backend
```

---

### 5. Para preparar la base de datos

1. Asegúrate de tener SQL Server corriendo.

2. Ejecuta los scripts de las carpeta /database-sql y las carpetas numeradas en orden ascendente (primero los de 01_/**, luego /02/** etc.).

---

## 🔁 Sprint Review

## Retrospectiva

| Categoría               | Descripción                                                                                                                                              |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| ¿Qué salió bien?        | - Las conexiones a la API desde el frontend fueron sencillas <br> - LA implementación de CORS se logró sin mayor inconveniente gracias a las explicaciones del challenger <br> - La creación de los diferentes endpoints fue rápida |
| ¿Qué puedo hacer diferente? | - Asignar mejores nombres a la tabla contents por películas o un nombre mejor <br> - Crear una estructura de la base de datos adecuada para manejar las series y películas, muy posiblemente en distintas tablas. <br> -Evaluar alguna estrategia para aplicar el principio DRY al momento de hacer las peticiones en el moviesLis.component.ts en lugar de usar un switch |
| ¿Qué no salió bien?     | - No alcance a actualizar los test de los métodos usados en el frontend. <br> -La lógica para manejar favoritos es muy extensa y me causo muchas dudas al momento de implementar una solución que tenga buen performance y haga las menores peticiones posibles junto con el menor tamaño de datos a transferir. <br> -No alcance a dockerizar mis proyectos debido a que no leí con la suficiente atención los requisitos del entregable del Readme.md (Anotado poner la máxima atención para que no vuelva a pasar) |

---

### Ultima actualización el 02/06/2025
