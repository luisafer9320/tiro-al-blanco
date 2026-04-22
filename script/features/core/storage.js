// Guardado en LocalStorage

/*export function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}*/
/*const STORAGE_KEY = "tiro-al-blanco-scores";

export const saveScore = (levelId, score) => {
  try{
    const basic = localStorage.getItem(STORAGE_KEY);
    const data = basic ? JSON.parse(basic) : {};
    const current = data[levelId] || 0;
    if (score > current) {
      data[levelId] = score;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  } catch (err) {
    console.warn("No se pudo guardar el puntaje:", err.message);
  }
};

export const getBestScores = () => {
  try {
    const basic = localStorage.getItem(STORAGE_KEY);
    return basic ? JSON.parse(basic) : {};
  } catch {
    return {};
  }
};

saveScore("nivel1", 100);
saveScore("nivel1", 30); 
saveScore("nivel1", 90); 
saveScore("nivel2", 50);
saveScore("nivel2", 70);

console.log(getBestScores());*/

// storage.js — Manejo de mejores puntajes por nivel

const STORAGE_KEY = "tiro-al-blanco-scores";

export const saveScore = (levelId, score) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};

    const previousBest = data[levelId] || 0;

    if (score > previousBest) {
      data[levelId] = score;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (err) {
    console.warn("No se pudo guardar el puntaje:", err.message);
  }
};

export const getBestScores = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

// Devuelve el mejor puntaje global
export const getDailyWinner = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw);

    const entries = Object.entries(data)
      .map(([level, score]) => ({ level: Number(level), score }))
      .sort((a, b) => b.score - a.score);

    return entries.length > 0 ? entries[0] : null;
  } catch {
    return null;
  }
};
