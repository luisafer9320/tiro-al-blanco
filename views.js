// Actualiza el HUD (puntos/reloj) en el DOM

export function updateHUD(score, time) {
  const scoreEl = document.querySelector('#score');
  const timeEl = document.querySelector('#time');
  if (scoreEl) scoreEl.textContent = score;
  if (timeEl) timeEl.textContent = time;
}


// Botones de DIFICULTAD
document.querySelectorAll('.btn-difficulty').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Quitar active de todos
        document.querySelectorAll('.btn-difficulty').forEach(b => {
            b.classList.remove('active');
        });
        // Agregar active al clickeado
        e.target.classList.add('active');
    });
});
