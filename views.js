// Actualiza el HUD (puntos/reloj) en el DOM

/*export function updateHUD(score, time) {
  const scoreEl = document.querySelector('#score');
  const timeEl = document.querySelector('#time');
  if (scoreEl) scoreEl.textContent = score;
  if (timeEl) timeEl.textContent = time;
}
*/

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

import { game } from './features/core/game.js';
import { getBestScores } from "./features/core/storage.js";

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



// Elementos del DOM cacheados
const screens = {
    start: document.getElementById('startScreen'),
    game: document.getElementById('gameScreen'),
    gameOver: document.getElementById('gameOverScreen'),
    pause: document.getElementById('pauseScreen')
};

const hud = {
    score: document.getElementById('score'),
    time: document.getElementById('time')
};

const elements = {
    startBtn: document.getElementById('startBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    resumeBtn: document.getElementById('resumeBtn'),
    exitPauseBtn: document.getElementById('exitPauseBtn'),
    restartBtn: document.getElementById('restartBtn'),
    finalScore: document.getElementById('finalScore'),
    finalHits: document.getElementById('finalHits'),
    finalPrecision: document.getElementById('finalPrecision')
};

let selectedLevel = 1;

// Cambiar pantalla activa
export function switchScreen(screenKey) {
    Object.values(screens).forEach(s => s?.classList.remove('active'));
    screens[screenKey]?.classList.add('active');
}

// Actualizar HUD del juego
export function updateHUD(score, time) {
    if (hud.score) hud.score.textContent = score;
    if (hud.time) hud.time.textContent = time;
}

// Mostrar pantalla de fin de juego
export function showGameOver(score, hits, accuracy) {
    switchScreen('gameOver');
    elements.finalScore.textContent = score;
    elements.finalHits.textContent = hits;
    elements.finalPrecision.textContent = `${accuracy}%`;
}

// Inicializar todos los eventos de la UI
export function initViewListeners() {
    // Selección de nivel
    const levelButtons = document.querySelectorAll('.level-btn');
    console.log('Botones de nivel encontrados:', levelButtons.length);
    
    levelButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('Click en nivel:', e.currentTarget.dataset.level);
            levelButtons.forEach(b => b.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
            selectedLevel = parseInt(e.currentTarget.dataset.level);
            console.log('Nivel seleccionado:', selectedLevel);
            elements.startBtn.disabled = false;
            console.log('Botón JUGAR habilitado');
        });
    });

    // Botón JUGAR
    elements.startBtn?.addEventListener('click', () => {
        switchScreen('game');
        game.startGame(selectedLevel);
    });

    // Botón PAUSA
    elements.pauseBtn?.addEventListener('click', () => {
        console.log("¡Clic detectado en el botón de pausa!");
        
        if (game.isPlaying) {
            game.pauseGame();
            switchScreen('pause');
        } else {
            console.log("El juego no está en estado 'playing', por eso no se ejecuta la pausa.");
        }
    });

    // Botón REANUDAR
    elements.resumeBtn?.addEventListener('click', () => {
        game.resumeGame();
        switchScreen('game');
    });

    // Botón SALIR de pausa
    elements.exitPauseBtn?.addEventListener('click', () => {
        game.endGame();
        switchScreen('start');
    });

    // Botón JUGAR DE NUEVO
    elements.restartBtn?.addEventListener('click', () => {
        switchScreen('game');
        game.restart();
    });
}