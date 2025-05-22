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

## Endpoints de autenticación y registro de usuarios

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

1. Cree un nuevo proyecto de tipo webapi en `C#`
2. Definí la estructura de carpetas para usar modelo vista controlador
3. Cree controlador `AuthController.cs` para manejar los registros y el login de usuarios
4. Cree el modelo `user.cs` para manejar la estructura de la tabla `users` de mi base de datos
5. Cree el `moviestDBContext.cs` para manejar el contexto de mis diferentes tablas en mi base de datos
6. ajuste el archivo `appSettings.json` para configurar la conexión a la base de datos (utilice la autenticación de windows para mantener seguras las credenciales)

---

### Errores conocidos

- solo sirve al frontend para crear usuarios e iniciar sesión
- no maneja un tiempo para que caduquen los JWT

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

### Ultima modificación 21/02/2025
