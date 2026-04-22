import { game } from './features/core/game.js';
import { updateDailyWinnerView } from './features/core/score.js';
import { savePlayerName, getPlayerName } from './features/core/storage.js';

export function initUsernameFlow() {
  const nameScreen  = document.getElementById('nameScreen');
  const startScreen = document.getElementById('startScreen');
  const nameInput   = document.getElementById('playerNameInput');
  const nameForm    = document.getElementById('nameForm');
  const nameError   = document.getElementById('nameError');

  // If already named, go straight to start
  if (getPlayerName()) {
    nameScreen?.classList.remove('active');
    startScreen?.classList.add('active');
    return;
  }

  // Show name screen
  nameScreen?.classList.add('active');
  startScreen?.classList.remove('active');
  nameInput?.focus();

  nameForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = nameInput?.value.trim() ?? '';

    if (value.length < 2) {
      if (nameError) nameError.textContent = 'El nombre debe tener al menos 2 caracteres.';
      nameInput?.focus();
      return;
    }

    savePlayerName(value);
    nameScreen?.classList.remove('active');
    startScreen?.classList.add('active');
    updateDailyWinnerView();
  });
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
    // Verificar que los elementos existen
    const startScreen = document.getElementById('startScreen');
    const levelButtons = document.querySelectorAll('.level-btn');
    const startBtn = document.getElementById('startBtn');
    
    console.log('startScreen:', startScreen ? 'existe' : 'NO EXISTE');
    console.log('Botones de nivel encontrados:', levelButtons.length);
    console.log('startBtn:', startBtn ? 'existe' : 'NO EXISTE');
    
    if (levelButtons.length === 0) {
        console.error('ERROR: No se encontraron botones de nivel');
        return;
    }
    
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