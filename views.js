// Actualiza el HUD (puntos/reloj) en el DOM

/*export function updateHUD(score, time) {
  const scoreEl = document.querySelector('#score');
  const timeEl = document.querySelector('#time');
  if (scoreEl) scoreEl.textContent = score;
  if (timeEl) timeEl.textContent = time;
}
*/
import { getBestScores } from "./features/core/storage.js";

export class Views {
  constructor(root) {
    this.root = root;
    this.currentGame = null;
  }
  showLoading() {
    this.root.innerHTML = `
      <div class="progress">
        Estamos trabajando en ello, en progreso de creación...
      </div>
    `;
  }
};