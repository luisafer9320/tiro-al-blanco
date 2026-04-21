// Punto de entrada de la aplicación
import { initViewListeners } from './views.js';

// Gestión de APIs de geolocalización
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

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initViewListeners();
    loadLocationData();
});