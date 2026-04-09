// Guardado en LocalStorage

export function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
