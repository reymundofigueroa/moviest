document.addEventListener("DOMContentLoaded", () => {

  const loginButton = document.querySelector("button[type='submit']");

  if (loginButton) {
    loginButton.addEventListener("click", (event) => {
      event.preventDefault(); 

      window.location.href = "./public/pages/home.html";
    });
  }
});