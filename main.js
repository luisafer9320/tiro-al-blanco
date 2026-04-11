// Punto de entrada principal del juego

/*import { startGame } from './features/core/game.js';*/
import { Views } from "./views.js";

/*document.addEventListener('DOMContentLoaded', () => {
  startGame();
});*/

const root = document.querySelector("main");
const view = new Views(root);

view.showLoading();

console.log(root);