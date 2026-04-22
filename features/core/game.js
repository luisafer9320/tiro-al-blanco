// game.js
import { updateHUD, showGameOver } from '../../views.js';
import { getLevel } from '../../data/levels.js';
import { playSound } from '../../Sound/sound.js'; // Importamos el sistema de sonido
import { saveScore } from './storage.js';
import { updateDailyWinnerView } from './score.js';

export const game = {
    score: 0,
    time: 0,
    currentLevel: 1,
    isPlaying: false,
    timerInterval: null,
    spawnInterval: null,
    hits: 0,
    shots: 0,

    // Iniciar nuevo juego
    startGame(level) {
        this.stopIntervals();

        this.currentLevel = level;
        const levelConfig = getLevel(level);

        this.isPlaying = true;
        this.score = 0;
        this.hits = 0;
        this.shots = 0;
        this.time = levelConfig.time;

        this.clearCanvas();
        updateHUD(this.score, this.time);

        this.startTimer();
        this.spawnDuck();
        this.startSpawning();
    },

    clearCanvas() {
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) return;

        canvas.querySelectorAll('.duck').forEach(duck => duck.remove());
    },

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.time--;
            updateHUD(this.score, this.time);

            if (this.time <= 0) {
                this.endGame();
            }
        }, 1000);
    },

    startSpawning() {
        const levelConfig = getLevel(this.currentLevel);
        this.spawnInterval = setInterval(() => {
            this.spawnDuck();
        }, levelConfig.spawnInterval);
    },

    spawnDuck() {
        if (!this.isPlaying) return;

        const canvas = document.getElementById('gameCanvas');
        if (!canvas) return;

        const levelConfig = getLevel(this.currentLevel);

        const duck = document.createElement('div');
        duck.className = 'duck';

        const goRight = Math.random() > 0.5;
        duck.classList.add(goRight ? 'animate-right' : 'animate-left');
        duck.style.left = goRight ? '-70px' : '100%';

        const baseSpeed = 5;
        const speed = baseSpeed / levelConfig.speed;
        duck.style.animationDuration = `${speed}s`;

        const topPos = 20 + Math.random() * 40;
        duck.style.top = `${topPos}%`;

        duck.innerHTML = '<div class="eye"></div><div class="beak"></div><div class="wing"></div>';

        canvas.appendChild(duck);

        duck.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!this.isPlaying) return;

            playSound('hit');

            this.hits++;
            this.shots++;
            this.score += levelConfig.pointsPerHit;

            duck.classList.add('hit');
            updateHUD(this.score, this.time);

            setTimeout(() => {
                if (duck.parentNode) duck.remove();
            }, 300);
        });

        setTimeout(() => {
            if (duck.parentNode && !duck.classList.contains('hit')) {
                this.shots++;
                duck.remove();
            }
        }, speed * 1000);
    },

    endGame() {
        this.isPlaying = false;
        this.stopIntervals();

        saveScore(this.currentLevel, this.score);

        updateDailyWinnerView();

        const accuracy = this.shots > 0 ? Math.round((this.hits / this.shots) * 100) : 0;

        showGameOver(this.score, this.hits, accuracy);
        
    },

    pauseGame() {
        this.isPlaying = false;
        this.stopIntervals();
    },

    resumeGame() {
        this.isPlaying = true;
        this.startTimer();
        this.startSpawning();
    },

    restart() {
        this.startGame(this.currentLevel);
    },

    stopIntervals() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
    }
};