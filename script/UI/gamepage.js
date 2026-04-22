// gamepage.js — Utilidades DOM para el juego

export const GamePage = {
    getCanvas() {
        return document.getElementById('gameCanvas');
    },

    clearCanvasPreservingPause() {
        const canvas = this.getCanvas();
        if (!canvas) return;

        const pauseBtn = canvas.querySelector('.pause-floating');
        canvas.innerHTML = '';
        if (pauseBtn) canvas.appendChild(pauseBtn);
    },

    createDuckElement({ goRight, speed, topPos }) {
        const duck = document.createElement('div');
        duck.className = 'duck';
        duck.classList.add(goRight ? 'animate-right' : 'animate-left');

        duck.style.left = goRight ? '-70px' : '100%';
        duck.style.animationDuration = `${speed}s`;
        duck.style.top = `${topPos}%`;

        duck.innerHTML = `
            <div class="eye"></div>
            <div class="beak"></div>
            <div class="wing"></div>
        `;

        return duck;
    }
};
