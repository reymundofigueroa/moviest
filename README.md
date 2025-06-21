# 🧩 Monorepo - Hub de entretenimiento Moviest

Este repositorio contiene el sistema completo dividido en tres módulos principales:

- 🔌 [Backend (API)](./apps/backend/Moviest-back/Backend.md)
- 🗃️ [Base de Datos](./database-sql/00_Documentacion/DataBase.md)
- 🎨 [Frontend](./apps/frontend/Frontend.md)

Puedes revisar como levantar el proyecto con docker desde:

- 🐋 [Levantar Con Docker](./LevantarConDocker.md)

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
| ¿Qué salió bien?        | - logre crear los dockerfile rápido debido a los ejemplos del challenger <br> - La configuración de la conexión a la base de datos fue rápida y sencilla debido a las explicaciones del challenger |
| ¿Qué puedo hacer diferente? | - Revisar bien la configuración de Docker cuando use WSL para evitar conflictos |
| ¿Qué no salió bien?     | - Se recortaron los tiempos de entrega y no pude hacer mejoras o actualizaciones en cuanto a test o implementar mejoras a la UI <br> - la configuración de las variables de entorno se complico debido a que no las terminaba de recibir docker cuando levantaba la imagen del backend |

---

### Ultima actualización el 21/06/2025
