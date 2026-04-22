// storage.js

// 🔥 Ya no dependemos de constants.js
/*const STORAGE_KEY = 'carnival-ducks-storage';
const PLAYER_KEY = 'carnival-ducks-player';

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const write = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('[Storage] Write failed:', err.message);
  }
};

export const saveScore = (levelId, score) => {
  const data    = read();
  const current = data[levelId]?.score ?? 0;

  if (score > current) {
    write({
      ...data,
      [levelId]: { score, name: getPlayerName() ?? 'Player' }
    });
  }
};

export const getBestScores = () => read();

export const getDailyWinner = () => {
  const entries = Object.entries(read()).map(([level, entry]) => ({
    level: Number(level),
    score: typeof entry === 'number' ? entry : entry.score,
    name: typeof entry === 'number' ? 'Player' : entry.name,
  }));

  if (entries.length === 0) return null;

  return entries.sort((a, b) => b.score - a.score)[0];
};

export const savePlayerName = (name) => {
  try {
    localStorage.setItem(PLAYER_KEY, name.trim().slice(0, 20));
  } catch {}
};

/export const getPlayerName = () => {
  try {
    return localStorage.getItem(PLAYER_KEY) || null;
  } catch {
    return null;
  }
};
/
export const getPlayerName = () => {
  try {
    const name = localStorage.getItem(PLAYER_KEY);
    return name && name.trim().length > 0 ? name : null;
  } catch {
    return null;
  }
};
*/

// storage.js

const STORAGE_KEY = 'carnival-ducks-storage';
const PLAYER_KEY = 'carnival-ducks-player';

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const write = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('[Storage] Write failed:', err.message);
  }
};

export const saveScore = (levelId, score) => {
  const data    = read();
  const current = data[levelId]?.score ?? 0;

  if (score > current) {
    write({
      ...data,
      [levelId]: { score, name: getPlayerName() ?? 'Player' }
    });
  }
};

export const getBestScores = () => read();

export const getDailyWinner = () => {
  const entries = Object.entries(read()).map(([level, entry]) => ({
    level: Number(level),
    score: typeof entry === 'number' ? entry : entry.score,
    name: typeof entry === 'number' ? 'Player' : entry.name,
  }));

  if (entries.length === 0) return null;

  return entries.sort((a, b) => b.score - a.score)[0];
};

export const savePlayerName = (name) => {
  try {
    localStorage.setItem(PLAYER_KEY, name.trim().slice(0, 20));
  } catch {}
};

export const getPlayerName = () => {
  try {
    const name = localStorage.getItem(PLAYER_KEY);
    return name && name.trim().length > 0 ? name : null;
  } catch {
    return null;
  }
};
