/*import { getDailyWinner } from '../features/core/storage.js';

export function updateDailyWinnerView() {
    const winner = getDailyWinner();

    const nameEl = document.getElementById('dailyWinnerName');
    const scoreEl = document.getElementById('dailyWinnerScore');

    if (!nameEl || !scoreEl) return;

    if (!winner) {
        nameEl.textContent = '@Unknown';
        scoreEl.textContent = '0 pts';
        return;
    }

    nameEl.textContent = winner.name;
    scoreEl.textContent = `${winner.score} pts`;
}
*/
import { getDailyWinner } from '../features/core/storage.js';

export function updateDailyWinnerView() {
    const winner = getDailyWinner();

    const nameEl = document.getElementById('dailyWinnerName');
    const scoreEl = document.getElementById('dailyWinnerScore');

    if (!nameEl || !scoreEl) return;

    if (!winner) {
        nameEl.textContent = '@Unknown';
        scoreEl.textContent = '0 pts';
        return;
    }

    nameEl.textContent = winner.name;
    scoreEl.textContent = `${winner.score} pts`;
}
