// guard.js — se ejecuta ANTES que todo

window.addEventListener("error", () => {
  if (!location.pathname.endsWith("/pages/error.html")) {
    location.href = "./pages/error.html";
  }
});

window.addEventListener("unhandledrejection", () => {
  if (!location.pathname.endsWith("/pages/error.html")) {
    location.href = "./pages/error.html";
  }
});
