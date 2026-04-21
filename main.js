// Punto de entrada principal del juego

/*import { startGame } from './features/core/game.js';*/
await import ("./views.js");

/*document.addEventListener('DOMContentLoaded', () => {
  startGame();
});*/

/*const root = document.querySelector("main");
const view = new Views(root);

view.showLoading();

console.log(root);*/

/*const root = document.querySelector("main");
const view = new Views(root);

view.showLoading();*/

// main.js

import { Views } from "./views.js";

// main.js

// Captura errores globales ANTES de cargar nada
// main.js

(async function bootstrap() {
  const path = location.pathname;
  const isRoot = path === "/" || path.endsWith("/index.html");
  const isErrorPage = path.endsWith("/pages/error.html");

  if (!isRoot && !isErrorPage) {
    location.replace("/index.html");
    return;
  }

  try {
    const { Views } = await import("./views.js");

    const root = document.querySelector("main");
    const views = new Views(root);

    await views.showLoading();

    try {
      const gameModule = await import("./game.js");

      if (typeof gameModule.initGame === "function") {
        await gameModule.initGame({ root, views });
      } else {
        throw new Error("initGame() no existe en game.js");
      }

    } catch (gameError) {
      console.warn("Error en el juego:", gameError);
      await views.showLoading();
      return;
    }

  } catch (criticalError) {
    console.error("Error crítico:", criticalError);

    if (!isErrorPage) {
      location.href = "./pages/error.html";
    }
  }
})();

