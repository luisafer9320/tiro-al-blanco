// Actualiza el HUD (puntos/reloj) en el DOM

/*export function updateHUD(score, time) {
  const scoreEl = document.querySelector('#score');
  const timeEl = document.querySelector('#time');
  if (scoreEl) scoreEl.textContent = score;
  if (timeEl) timeEl.textContent = time;
}
*/

import { getBestScores } from "./features/core/storage.js";

// views.js
/*export class Views {
  constructor(root) {
    this.root = root;
  }

  async loadHtml(path, isErrorPage = false) {
    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error();
      }

      const html = await response.text();
      this.root.innerHTML = html;

    } catch (_) {
      // Si ya estamos intentando cargar error.html, no volvemos a intentarlo
      if (!isErrorPage) {
        this.showError();
      }
    }
  }

  showLoading() {
    this.loadHtml("./pages/loading.html");
  }

  showError() {
    this.loadHtml("./pages/error.html", true);
  }
}*/

// views.js

export class Views {
  constructor(root) {
    if (!(root instanceof HTMLElement)) {
      throw new Error("Views requiere un elemento <main> válido");
    }
    this.root = root;
  }

  async loadFragment(path) {
    const response = await fetch(path, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`No se pudo cargar la vista: ${path}`);
    }

    const html = await response.text();
    this.root.innerHTML = html;
  }

  async showLoading() {
    await this.loadFragment("./pages/loading.html");
  }
}
