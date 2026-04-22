
const API_KEY = '739a23dd76ebbf7f80d9769fe00f9dc7'; // Reemplaza con tu llave real
const btnBuscar = document.getElementById('buscar');

btnBuscar.addEventListener('click', () => {
    const ciudad = document.getElementById('ciudad').value;
    if (ciudad) {
        obtenerClima(ciudad);
    }
});

async function obtenerClima(ciudad) {
    // URL de la API: unidades métricas (Celsius) y lenguaje en español
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const respuesta = await fetch(url);
        
        // Si la ciudad no existe o hay error
        if (!respuesta.ok) {
            throw new Error('Ciudad no encontrada');
        }

        const datos = await respuesta.json();
        mostrarClima(datos);
        
    } catch (error) {
        alert(error.message);
    }
}

function mostrarClima(datos) {
    document.getElementById('nombre-ciudad').innerText = `${datos.name}, ${datos.sys.country}`;
    document.getElementById('temp').innerText = `Temperatura: ${datos.main.temp}°C`;
    document.getElementById('desc').innerText = `Cielo: ${datos.weather[0].description}`;
}

function obtenerUbicacionActual() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            const lat = posicion.coords.latitude;
            const lon = posicion.coords.longitude;
            
            // Llamamos a una nueva función que busque por coordenadas
            buscarPorCoordenadas(lat, lon);
        }, error => {
            console.error("Error al obtener ubicación:", error);
            alert("No se pudo acceder a tu ubicación.");
        });
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// 2. Nueva función de búsqueda usando Latitud y Longitud
async function buscarPorCoordenadas(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        mostrarClima(datos);
    } catch (error) {
        console.error("Error al obtener clima por coordenadas:", error);
    }
}

window.onload = obtenerUbicacionActual;


