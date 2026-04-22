import { getDailyWinner } from "../features/core/storage.js";

export const updateDailyWinnerView = () => {
    const winner = getDailyWinner();

    const nameEl = document.getElementById("dailyWinnerName");
    const scoreEl = document.getElementById("dailyWinnerScore");

    if (!nameEl || !scoreEl) return;

    if (!winner) {
        nameEl.textContent = "@NoPlayersYet";
        scoreEl.textContent = "0 Hits";
        return;
    }

    const username = `Player_L${winner.level}`;

    nameEl.textContent = username;
    scoreEl.textContent = `${winner.score} Hits`;
};
