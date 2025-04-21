# Moviest

## 📄 Descripción

Esta es una (SPA) que simula un servicio de streaming. Cuenta con una página de login que redirecciona al home al hacer clic en **"Iniciar sesión"**.  
En el home se administran diferentes vistas mediante un menú de navegación estático, con filtros por:

- Categorías
- Películas
- Series
- Favoritos  

También incluye una sección de detalles de cada película.

---

## 🛠️ Stack Tecnológico

- HTML  
- CSS  
- Angular y TypeScript

---

## 🚀 ¿Cómo instalarlo?

1. Clona este repositorio por HTTPS.
2. Abre la carpeta del repositorio clonado.
3. Ejecuta el comando npm install.
4. Ejecuta en comando ng serve para ejecutar el proyecto

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
Una ventana de login sencilla en la que, para entrar, solo hay que hacer click en ingresar. El esquema de estilos esta inspirado en el Glassmorphism.

![Vista previa del Login](./public/assets/images/Captura-login.png)

- Home
El home consta de las secciones principales:
  - header que muestra el logo, un icono de buscar y un mensaje de bienvenida al usuario
  - una barra de búsqueda con alta visibilidad, pues se espera que en futuras iteraciones sea un
   punto importante para la navegación en la app
  - menú de navegación, este funciona como sistema de navegación para clasificar el contenido en distintas categorías predefinidas
  - Sección de películas, esta sección muestra una lista de películas en las cuales puedes ver detalles agregar o quitar de favoritos en base a los iconos    dispuestos en cada tarjeta
![Vista previa del Home](./public/assets/images/Captura-home.png)
![Vista previa home responsive](./public/assets/images/captura-peliculas-responsive.png)
- Favoritos
se accede dando click en el icono de favoritos en el menu de la web, esta muestra películas o series que el usuario haya agregado previamente dando click en el icono del corazón de su respectiva tarjeta, también es posible eliminarlas dando click en el icono de ocultar en la misma tarjeta

![Vista previa Favoritos](./public/assets/images/Captura-favoritos.png)

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
![Vista previa detalles de la película](./public/assets/images/Captura-detalles-de-pelicula.png)

---

## 🛠️ Proceso de Migración

1. Se creo un proyecto nuevo en Angular
2. Se crearon los componentes de las secciones de la app
3. Se clono el HTML y el CSS a sus respectivos componentes
4. Se fue implementando la lógica de los componentes uno por uno
5. Una vez el proyecto fue funcional se iniciaron las iteraciones de este para implementar cada vez las mejores prácticas y aprender más sobre la arquitectura de proyectos escalables
6. Después de haber implementado una arquitectura escalable se le añadió dinamismo a diferentes estructuras que ayudan a mejorar la UX

---

## 🐞 Errores conocidos

1. La barra de búsqueda no funciona.
2. Solo existe un video hardcodeado para todas las películas
3. Se tuvieron que crear dos estructuras de interfaces para las películas, una para categorías y otra para las demás, lo cual no obedece las mejores practicas

---

## 🔁 Sprint Review

| ¿Qué salió bien?                                                                                     | ¿Qué puedo hacer diferente?                                                                                      | ¿Qué no salió bien?                                                                                                                                  |
|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| ✅ Debido a que ya se tenía la maquetación, fue rápido migrarla a Angular.                            | ✅ Investigar más a fondo cómo se trabaja la arquitectura de los proyectos con diferentes tecnologías.            | ❌ Tuve que hacer un refactor grande en la estructura de carpetas por no entender bien la arquitectura de Angular.                                   |
| ✅ Se logró identificar la división de componentes gracias a que el proyecto ya era una SPA.          | ✅ Implementar un *linter* desde el principio.                                                                   | ❌ Las interfaces que usan la lista de películas se pudieron abstraer mejor, para evitar tener que usar dos.                                         |
| ✅ No hubo muchos problemas al aplicar los estilos responsivos.                                       |                                                                                                                  | ❌ Me fui al mar el domingo y no alcancé a darle funcionalidad a la barra de búsqueda.                                                              |
