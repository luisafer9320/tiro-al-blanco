import { game } from './features/core/game.js';

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
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            selectedLevel = parseInt(e.currentTarget.dataset.level);
            elements.startBtn.disabled = false;
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