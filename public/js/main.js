// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

  // Seleccionamos el botón por su tipo o por una clase/ID específico
  const loginButton = document.querySelector("button[type='submit']");

  // Verificamos que el botón exista antes de agregar el evento
  if (loginButton) {
    loginButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevenir el envío del formulario

      // Redirigir a la página home.html en la nueva ubicación
      window.location.href = "./public/pages/home.html";
    });
  }
});