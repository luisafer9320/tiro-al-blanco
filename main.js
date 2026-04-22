// Punto de entrada de la aplicación
import { initViewListeners } from './views.js';
// IMPORTANTE: Ruta corregida apuntando a la carpeta /Sound/
import { playSound, playBackgroundMusic, pauseBackgroundMusic, toggleMute } from './Sound/sound.js';
// Importar la función de noticias
import { cargarNoticias } from './features/api/noticias.js';

// Gestión de APIs
const APIManager = {
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
    cargarNoticias();  // 📰 Cargar las noticias

    // --- LÓGICA DE AUDIO (con comprobación de seguridad) ---
    
    // 1. Mute Button
    const muteBtn = document.getElementById('muteBtn');
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            const isMuted = toggleMute();
            const muteIcon = document.getElementById('muteIcon');
            if (muteIcon) {
                muteIcon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }
        });
    }

    // 2. Start Game (Inicia música)
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            playBackgroundMusic();
        });
    }

    // 3. Pause Game
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            pauseBackgroundMusic();
        });
    }

    // 4. Resume Game
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            playBackgroundMusic();
        });
    }
});