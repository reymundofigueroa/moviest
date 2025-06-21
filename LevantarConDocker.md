# 📦 Proyecto Moviest - Docker Setup

Este proyecto contiene:

* 🎮 Un **frontend en Angular**
* 🔐 Un **backend en ASP.NET Core**
* 💄 Una **base de datos SQL Server**

> Todo el entorno está preparado para ejecutarse de forma local con **Docker**.

---

## ✅ Requisitos

* [Docker](https://www.docker.com/) instalado en tu equipo

---

## 🧰 Pasos para ejecutar el proyecto

---

### 1⃣ Clona el repositorio

```bash
git clone https://github.com/tuusuario/moviest.git
cd moviest
```

---

### 2⃣ Crea una red Docker

Esto permite que los contenedores se comuniquen entre sí:

```bash
docker network create moviest-network
```

---

### 3⃣ Levanta la base de datos

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Your_password123" \
  -p 14333:14333 \
  --name sqlserver \
  --network moviest-network \
  -v sqlvolume:/var/opt/mssql \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

> Puedes cambiar `"Your_password123"` por cualquier otra contraseña **que cumpla con los requisitos de seguridad de SQL Server**.

---

Después abre SSMS y conéctelo al servidor de Docker poniendo:

* Server name: localhost.11433
* Authentication: AQL Server Authentication
* Login: sa
* Password: la clave que pusiste al levantar el docker de la base de datos (si corriste el comando asi como está es: Your_password123)
* No olvides marcar la casilla Trust server certificate

Ahora ejecuta los scripts de la base de datos en orden ascendente desde la carpeta 01, 02 etc.

### 4⃣ Configura tu backend

Abre el archivo:

```cmd
/backend/appsettings.json
```

Y en el apartado `"ConnectionStrings"`, reemplaza la contraseña con la que usaste al crear el contenedor de la base de datos.
Por ejemplo:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=sqlserver;Database=Moviest_DB;User Id=sa;Password=Your_password123;TrustServerCertificate=True;"
}
```

> Asegúrate de que el **Server** se mantenga como `sqlserver`, ya que así se llama el contenedor dentro de la red `moviest-network`.

---

### 5⃣ Compila la imagen del backend

Situado en la ruta apps/backend/Moviest-back ejecute el siguiente comando:

```bash
docker build -t moviest-back ./backend
```

---

### 6⃣ Levanta el backend

```bash
docker run --env JWT_SECRET_KEY=UnaClaveSecreta123 \
  -p 8081:8081 \
  --name backend \
  --network moviest-network \
  -d moviest-back
```

> Reemplaza `"UnaClaveSecreta123"` por la clave secreta que desees para firmar tokens JWT (debe ser de 32 caracteres como mínimo).

---

### 7⃣ Compila y levanta el frontend

Situado en la ruta: apps/frontend ejecuta los siguientes comandos

```bash
docker build -t moviest-front ./frontend
docker run -p 8080:80 \
  --name frontend \
  --network moviest-network \
  -d moviest-front
```

---

### 🌐 Accede a la aplicación

* **Frontend**: [http://localhost:8080](http://localhost:8080)
* **Backend API**: [http://localhost:8081](http://localhost:8081)

---

## 🧪 Comprobación rápida

Puedes probar las rutas de tu API (como `/api/auth/login`) desde Postman o directamente desde el frontend.

---

## 🧹 Comandos útiles

```bash
# Ver logs de un contenedor
docker logs backend
docker logs frontend

# Detener contenedores
docker stop backend frontend sqlserver

# Eliminar contenedores
docker rm backend frontend sqlserver

# Eliminar imágenes
docker rmi moviest-back moviest-front
```

---

### Ultima actualización el 21/06/2025
