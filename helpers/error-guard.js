// error-guard.js
// Este script se ejecuta SOLO en error.html

(async () => {
  try {
    // Intentamos cargar main.js para comprobar si ya no hay errores
    await import("../main.js");

    // Si main.js carga sin errores → el sistema está sano
    window.location.href = "../index.html";

  } catch (e) {
    // Si sigue fallando, nos quedamos en error.html
    console.warn("La aplicación sigue fallando:", e);
  }
})();
