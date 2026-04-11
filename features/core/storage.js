// Guardado en LocalStorage

/*export function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}*/
const STORAGE_KEY = "tiro-al-blanco-scores";

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

console.log(getBestScores());