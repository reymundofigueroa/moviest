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
| ¿Qué salió bien?        | - La estructura básica de la API en 'C#' fue comprendida rápido debido a las explicaciones del challenger. <br> - La base de datos se maqueto sin mayores inconvenientes. <br> - El consumo de la API desde el frontend se incorporo sin mayores inconvenientes. |
| ¿Qué puedo hacer diferente? | - Enviar el proyecto aun sin completar la documentación (se podrá añadir la documentación en commits subsecuentes).<br> - estudiar mas a fondo la estructura del archivo Program.cs para entender mejor el orden de las lineas que se tienen que ejecutar en dicho archivo                                                                                 |
| ¿Qué no salió bien?     | - No entregué el proyecto en tiempo y forma debido a temas de Salud y estar internado en las fechas de entrega. <br> No alcanse a usar Guards en el frontend debido a temas de tiempo                                                  |

---

### Ultima actualización el 21/05/2025
