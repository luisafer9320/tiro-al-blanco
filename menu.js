import { getCountryFlagUrl } from "../service/geolocationService.js";
import { LANDING_URL } from "../constants/urls.js";
import { icon } from "../helpers/icons.js";

function renderLinks(variant = "desktop") {
  const linkClass =
    variant === "desktop" ? "navbar_link" : "navbar_dropdown-link";
  const activeClass =
    variant === "desktop"
      ? "navbar_link navbar_link--active"
      : "navbar_dropdown-link navbar_dropdown-link--active";

  return `
    <a class="${linkClass}" href="${LANDING_URL}">Inicio</a>
    <a class="${activeClass}" href="#">
      ${icon("fist", { size: 14, className: "navbar__link-icon" })}
      <span>Juegos</span>
    </a>
    <a class="${linkClass}" href="#">Acerca de</a>
  `;
}

function renderWeatherPill(weatherData) {
  if (!weatherData || weatherData.error) return "";
  return `
    <div class="navbar__pill" aria-label="Clima actual">
      <img src="${weatherData.iconUrl}" alt="" class="navbar__pill-icon" width="20" height="20" />
      <span class="navbar__pill-text">${weatherData.temperature}°C</span>
    </div>
  `;
}

function renderLocationPill(locationData) {
  if (!locationData || locationData.error) return "";
  const cityShort = (locationData.city || "").slice(0, 3).toUpperCase();
  const flagUrl = getCountryFlagUrl(locationData.countryCode);
  return `
    <div class="navbar__pill" aria-label="Ubicación">
      <img src="${flagUrl}" alt="${locationData.countryCode}" class="navbar__pill-flag" />
      <span class="navbar__pill-text">${cityShort}</span>
    </div>
  `;
}

export function renderNavbar(locationData, weatherData) {
  return `
    <nav class="navbar" aria-label="Principal">
      <a class="navbar__logo" href="${LANDING_URL}">
        <img src="./assets/icon/logo-icon.svg" alt="AZAR logo" class="navbar__logo-icon" />
        <span class="navbar__logo-text">AZARGame</span>
      </a>

      <div class="navbar__links">
        ${renderLinks("desktop")}
      </div>

      <div class="navbar__mobile-extras">
        ${renderWeatherPill(weatherData)}
        ${renderLocationPill(locationData)}
        <button type="button" class="navbar__menu-btn" id="navbar-menu-btn" aria-label="Abrir menú" aria-expanded="false">
          ${icon("menu", { size: 20 })}
        </button>
      </div>

      <button type="button" class="navbar__login">
        ${icon("user", { size: 18 })}
        <span>Iniciar sesión</span>
      </button>
    </nav>

    <div class="navbar__dropdown" id="navbar-dropdown">
      ${renderLinks("mobile")}
    </div>
  `;
}

export function initNavbarInteractions() {
  const btn = document.getElementById("navbar-menu-btn");
  const dropdown = document.getElementById("navbar-dropdown");
  if (!btn || !dropdown) return;

  btn.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("navbar__dropdown--open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    btn.innerHTML = icon(isOpen ? "x" : "menu", { size: 20 });
  });
}