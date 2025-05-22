# Moviest Frontend

## 📄 Descripción

Esta es una (SPA) que simula un servicio de streaming. Cuenta con una página de login que redirecciona al home al hacer clic en **"Iniciar sesión"**.  
En el home se administran diferentes vistas mediante un menú de navegación estático, con filtros por:

- Categorías
- Películas
- Series
- Favoritos  

También incluye una sección de detalles de cada película.

---

## 🎯 Objetivo

Elaborar un Hub de entretenimiento funcional para aprender y sobre todo demostrar mis habilidades ante Mega

---

## 🛠️ Stack Tecnológico

- HTML  
- CSS  
- Angular y TypeScript
- ESLint

---

## 🎨 Mockup

![Mockup 1](./public/assets/images/mockup1.jpg)
![Mockup 2](./public/assets/images/mockup2.jpg)
![Mockup 3](./public/assets/images/mockup3.jpg)
![Mockup 4](./public/assets/images/Login-responsive.jpg)
![Mockup 5](./public/assets/images/peliculas-responsive.jpg)
![Mockup 6](./public/assets/images/detalles-responsive.jpg)

---

## 👀 Vista del proyecto

- Login
Una ventana de login sencilla en la que, para entrar, hay que tener un usuario ya creado e introducir las credenciales. El esquema de estilos esta inspirado en el Glassmorphism.

![Vista previa del Login](./public/assets/images/Captura-login.png)

- Crear cuenta
Una ventana dedicada a crear una cuenta para usuarios nuevos (obligatorio llenar todos los campos)

![Vista previa Crear cuenta](./public/assets/images/CapturaCrarCuenta.png)

- Recuperar contraseña
Una ventana dedicada a recuperar contraseña (de momento sin funcionalidad por temas de seguridad)

![vista previa recuperar contraseña](./public/assets/images/CapturaRecuperarContraseña.png)

- Home
El home consta de las secciones principales:
  - header que muestra el logo, un icono de buscar y un mensaje de bienvenida al usuario
  - una barra de búsqueda con alta visibilidad, pues se espera que en futuras iteraciones sea un
   punto importante para la navegación en la app
  - menú de navegación, este funciona como sistema de navegación para clasificar el contenido en distintas categorías predefinidas
  - Sección de películas, esta sección muestra una lista de películas en las cuales puedes ver detalles agregar o quitar de favoritos en base a los iconos    dispuestos en cada tarjeta
![Vista previa del Home](./public/assets/images/home-actualizado.png)
![Vista previa home responsive](./public/assets/images/captura-peliculas-responsive.png)
- Favoritos
se accede dando click en el icono de favoritos en el menu de la web, esta muestra películas o series que el usuario haya agregado previamente dando click en el icono del corazón de su respectiva tarjeta, también es posible eliminarlas dando click en el icono de ocultar en la misma tarjeta

![Vista previa Favoritos](./public/assets/images/favoritos-actualizado.png)

- Categorías
Se accede dando click al icono de categorías y este muestra todas las películas y series según su categoría
actualmente existen las categorías de
  - Acción
  - Misterio
  - Comedia
  - Drama
  - Ciencia Ficción
  - Suspenso

![Vista previa filtro por categorías](./public/assets/images/Captura-categorias.png)

- Detalles de la película
Esta sección muestra los detalles de la película seleccionada, para poder acceder a esta sección hay que hacer click en el icono de la película que se desean conocer los detalles
![Vista previa detalles de la película](./public/assets/images/movie-details-actualizada.png)
![Vista previa detalles de la película responsive](./public/assets/images/movie-details-responsive.png)

- Barra de búsqueda
Esta sección muestra los resultados de una búsqueda con coincidencias ya sea por titulo o descripción
![Vista previa de resultados de búsqueda (señor)](./public/assets/images/busqueda.png)

---

## 🛠️ ¿Como lo hice?

1. Realice las conexiones a la API para manejar el flujo de login implementando servicios
2. En el servicio 'user-access.service.ts' cree los métodos que se conectaran a la API para las peticiones post segmentadas por crear usuarios y hacer login
3. Implemente los métodos que consumían el servicio 'user-access.service.ts' en cada uno de los componentes del flujo de login
4. Implemente el uso de JWT para mejorar la seguridad en el inicio de sesión

---

## 🐞 Errores conocidos

1. No hay algún elemento de UX para retroceder las listas de películas una vez realizada una búsqueda (se tiene que dar click en algún icono del nav-menu)
2. Solo existe un video hardcodeado para todas las películas
3. Se tuvieron que crear dos estructuras de interfaces para las películas, una para categorías y otra para las demás, lo cual no obedece las mejores practicas
4. No se alcanzaron a corregir las propuestas de UX propuestas por el Challenger debido a que la retroalimentación llego apenas

---

## Bibliotecas y dependencias utilizadas

- Rxjs 7.8.0
- typescript-eslint 8.27.0
- eslint 9.23.0
- karma 6.4.0
- angular/common/http 18.2.0 (no logre encontrar el paquete de http en el package.json por que creo que este viene dentro de @angular/common asi que puse la version que esta biblioteca indicaba)

## Reporte de code coverage

![Imagen del reporte de code coverage](./public/assets/images/code-covearge.png)
![Imagen del reporte de test con karma](./public/assets/images/code-covearge-karma.png)

 Coverage summary <br>
- Statements   : 80.24% ( 130/162 ) <br>
- Branches     : 64.1% ( 25/39 ) <br>
- Functions    : 70.9% ( 39/55 ) <br>
- Lines        : 79.61% ( 125/157 ) <br>

---
