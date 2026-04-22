// game.js — Lógica principal del juego de tiro al blanco

import { updateHUD, showGameOver } from '../../../views.js';
import { getLevel } from '../data/levels.js';
import { GamePage } from '../../UI/gamepage.js';

// Estado del juego
/*class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        this.score = 0;
        this.time = 0;
        this.currentLevel = 1;
        this.isPlaying = false;
        this.hits = 0;
        this.shots = 0;
        this.timerInterval = null;
        this.spawnInterval = null;
    }
}

// Lógica principal del juego
class DuckHuntGame {
    constructor() {
        this.state = new GameState();
    }

    // Iniciar nuevo juego
    startGame(level) {
        this.stopIntervals();
        this.state.reset();

        this.state.currentLevel = level;
        const config = this.getLevelConfig();

        this.state.isPlaying = true;
        this.state.time = config.time;

        GamePage.clearCanvasPreservingPause();
        updateHUD(this.state.score, this.state.time);

        this.startTimer();
        this.spawnDuck();
        this.startSpawning();
    }

    getLevelConfig() {
        return getLevel(this.state.currentLevel);
    }

    // Temporizador
    startTimer() {
        this.state.timerInterval = setInterval(() => {
            this.state.time--;
            updateHUD(this.state.score, this.state.time);

            if (this.state.time <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    // Generación de patos
    startSpawning() {
        const { spawnInterval } = this.getLevelConfig();

        this.state.spawnInterval = setInterval(() => {
            this.spawnDuck();
        }, spawnInterval);
    }

    spawnDuck() {
        if (!this.state.isPlaying) return;

        const canvas = GamePage.getCanvas();
        if (!canvas) return;

        const config = this.getLevelConfig();

        const goRight = Math.random() > 0.5;
        const speed = 5 / config.speed;
        const topPos = 20 + Math.random() * 40;

        const duck = GamePage.createDuckElement({ goRight, speed, topPos });
        canvas.appendChild(duck);

        this.attachDuckEvents(duck, config);
        this.scheduleDuckRemoval(duck, speed);
    }

    attachDuckEvents(duck, config) {
        duck.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!this.state.isPlaying) return;

            this.state.hits++;
            this.state.shots++;
            this.state.score += config.pointsPerHit;

            duck.classList.add('hit');
            updateHUD(this.state.score, this.state.time);

            setTimeout(() => {
                if (duck.parentNode) duck.remove();
            }, 300);
        });
    }

    scheduleDuckRemoval(duck, speed) {
        setTimeout(() => {
            if (duck.parentNode && !duck.classList.contains('hit')) {
                this.state.shots++;
                duck.remove();
            }
        }, speed * 1000);
    }

    // Terminar el juego
    endGame() {
        this.state.isPlaying = false;
        this.stopIntervals();

        const accuracy = this.state.shots > 0
            ? Math.round((this.state.hits / this.state.shots) * 100)
            : 0;

        // Guardar mejor puntaje del nivel
        saveScore(this.state.currentLevel, this.state.score);

        showGameOver(this.state.score, this.state.hits, accuracy);
    }


    // Pausar
    pauseGame() {
        this.state.isPlaying = false;
        this.stopIntervals();
    }

    // Reanudar
    resumeGame() {
        this.state.isPlaying = true;
        this.startTimer();
        this.startSpawning();
    }

    // Reiniciar
    restart() {
        this.startGame(this.state.currentLevel);
    }

    // Detener intervalos
    stopIntervals() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
        if (this.state.spawnInterval) {
            clearInterval(this.state.spawnInterval);
            this.state.spawnInterval = null;
        }
    }
}

// Export instancia única
export const game = new DuckHuntGame();*/
// game.js — versión refactorizada y funcional como senior

export const game = {
    level: 1,
    score: 0,
    hits: 0,
    totalShots: 0,
    timeLeft: 45,
    isPaused: false,
    duckInterval: null,
    timerInterval: null,

    startGame(level) {
        this.level = level;
        this.score = 0;
        this.hits = 0;
        this.totalShots = 0;
        this.timeLeft = 45;
        this.isPaused = false;

        document.getElementById("score").innerText = 0;
        document.getElementById("time").innerText = 45;

        GamePage.clearCanvasPreservingPause();

        this.startTimer();
        this.startDuckSpawner();
    },

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.isPaused) return;

            this.timeLeft--;
            document.getElementById("time").innerText = this.timeLeft;

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    },

    startDuckSpawner() {
        const spawnRate = this.level === 1 ? 2000 :
                          this.level === 2 ? 1500 : 1000;

        this.duckInterval = setInterval(() => {
            if (!this.isPaused) this.spawnDuck();
        }, spawnRate);
    },

    spawnDuck() {
        const canvas = GamePage.getCanvas();
        if (!canvas) return;

        const duck = GamePage.createDuckElement({
            goRight: Math.random() > 0.5,
            speed: this.level === 1 ? 4 : this.level === 2 ? 3 : 2,
            topPos: Math.random() * 70
        });

        duck.addEventListener("click", () => this.hitDuck(duck));

        canvas.appendChild(duck);

        setTimeout(() => {
            if (duck && duck.parentNode) duck.remove();
        }, 5000);
    },

    hitDuck(duck) {
        this.hits++;
        this.score += 10;
        this.totalShots++;

        document.getElementById("score").innerText = this.score;

        duck.classList.add("hit");

        setTimeout(() => duck.remove(), 300);
    },

    pauseGame() {
        this.isPaused = true;
        document.getElementById("pauseScreen").classList.add("active");
    },

    resumeGame() {
        this.isPaused = false;
        document.getElementById("pauseScreen").classList.remove("active");
    },

    endGame() {
        clearInterval(this.duckInterval);
        clearInterval(this.timerInterval);

        const precision = this.totalShots === 0
            ? 0
            : Math.round((this.hits / this.totalShots) * 100);

        document.getElementById("finalScore").innerText = this.score;
        document.getElementById("finalHits").innerText = this.hits;
        document.getElementById("finalPrecision").innerText = precision + "%";

        document.getElementById("gameOverScreen").classList.add("active");
    }
};
