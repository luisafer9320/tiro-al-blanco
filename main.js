// Punto de entrada principal del juego

/*import { startGame } from './features/core/game.js';*/


/*document.addEventListener('DOMContentLoaded', () => {
  startGame();
});*/

/*const root = document.querySelector("main");
const view = new Views(root);

view.showLoading();

console.log(root);*/

/*const root = document.querySelector("main");
const view = new Views(root);

view.showLoading();*/

// main.js

//import { Views } from "./views.js";

// main.js

// Captura errores globales ANTES de cargar nada
// main.js

/*(async function bootstrap() {
  const path = location.pathname;
  const isRoot = path === "/" || path.endsWith("/index.html");
  const isErrorPage = path.endsWith("/pages/error.html");

  if (!isRoot && !isErrorPage) {
    location.replace("/index.html");
    return;
  }

  try {
    const { Views } = await import("./views.js");

    const root = document.querySelector("main");
    const views = new Views(root);

    await views.showLoading();

    try {
      const gameModule = await import("./game.js");

      if (typeof gameModule.initGame === "function") {
        await gameModule.initGame({ root, views });
      } else {
        throw new Error("initGame() no existe en game.js");
      }

    } catch (gameError) {
      console.warn("Error en el juego:", gameError);
      await views.showLoading();
      return;
    }

  } catch (criticalError) {
    console.error("Error crítico:", criticalError);

    if (!isErrorPage) {
      location.href = "./pages/error.html";
    }
  }
})();

*/

//await import ("./views.js");
//import { updateDailyWinnerView }  from './script/UI/score.js';


// Punto de entrada de la aplicación
//import { initViewListeners } from './views.js';

// Gestión de APIs
/*const APIManager = {
    async getLocation() {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
                    () => resolve({ latitude: null, longitude: null })
                );
            } else {
                resolve({ latitude: null, longitude: null });
            }
        });
    },

    async getCountryInfo(lat, lon) {
        if (!lat || !lon) return null;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            return await response.json();
        } catch {
            return null;
        }
    }
};

// Cargar datos de ubicación del usuario
async function loadLocationData() {
    const { latitude, longitude } = await APIManager.getLocation();
    
    if (latitude && longitude) {
        const locationData = await APIManager.getCountryInfo(latitude, longitude);
        if (locationData?.address) {
            const city = locationData.address.city || locationData.address.town || "Ubicación desconocida";
            const country = locationData.address.country || "";
            const locEl = document.querySelector('.location-top span');
            if (locEl) locEl.textContent = `${city.toUpperCase()}, ${country.substring(0,2).toUpperCase()}`;
        }
    }
}

// Inicialización centralizada al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initViewListeners();
    loadLocationData();
    // cargarNoticias();  <-- ASEGÚRATE DE QUE ESTO ESTÉ COMENTADO O BORRADO
});
*/


import { game } from "./script/features/core/game.js";
import { updateDailyWinnerView } from './script/UI/score.js';
import { initViewListeners } from './views.js';



document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------
    // 1. Selección de nivel
    // ------------------------------
    const levelButtons = document.querySelectorAll(".level-btn");
    const startBtn = document.getElementById("startBtn");

    let selectedLevel = null;

    levelButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            selectedLevel = Number(btn.dataset.level);

            levelButtons.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");

            startBtn.disabled = false;
        });
    });

    // ------------------------------
    // 2. Iniciar juego
    // ------------------------------
    startBtn.addEventListener("click", () => {
        if (!selectedLevel) return;

        document.getElementById("startScreen").classList.remove("active");
        document.getElementById("gameScreen").classList.add("active");

        game.startGame(selectedLevel);
    });

    // ------------------------------
    // 3. Inicializar listeners de UI
    // (pausa, reanudar, salir, reiniciar)
    // ------------------------------
    initViewListeners();

    // ------------------------------
    // 4. Actualizar ranking/daily winner
    // ------------------------------
    updateDailyWinnerView();
});