// ====================================
// 📰 SERVICIO DE NOTICIAS
// ====================================

// Tu API KEY de NewsAPI
const API_KEY = '8f9a9e507cc04d8698cf33110d526052';
const API_URL = 'https://newsapi.org/v2/top-headlines';

/**
 * Obtiene las noticias de la API
 * @returns {Promise<Array>} Array de artículos de noticias
 */
async function obtenerNoticias() {
    try {
        // Parámetros de la petición
        const parametros = {
            country: 'es',      // Noticias de España
            apiKey: API_KEY,
            pageSize: 5         // Solo 5 noticias
        };

        // Construir la URL con los parámetros
        const urlFinal = `${API_URL}?${new URLSearchParams(parametros).toString()}`;
        
        console.log('📡 Pidiendo noticias...');
        
        // Hacer la petición
        const respuesta = await fetch(urlFinal);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        // Convertir a JSON
        const datos = await respuesta.json();
        console.log('✅ Noticias recibidas:', datos);
        
        return datos.articles || [];

    } catch (error) {
        console.error('❌ Error al obtener noticias:', error);
        return [];
    }
}

/**
 * Muestra las noticias en el contenedor del HTML
 * @param {Array} articulos - Array de artículos a mostrar
 */
function mostrarNoticias(articulos) {
    console.log('🔍 Buscando contenedor #news-container...');
    const contenedor = document.getElementById('news-container');
    
    if (!contenedor) {
        console.error('❌ NO SE ENCONTRÓ el contenedor #news-container en el HTML');
        console.log('📋 IDs disponibles:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
        return;
    }

    console.log('✅ Contenedor encontrado');

    // Limpiar contenido anterior
    contenedor.innerHTML = '';

    if (articulos.length === 0) {
        console.warn('⚠️ No hay artículos para mostrar');
        contenedor.innerHTML = '<p style="font-size: 0.9rem; color: #999;">No hay noticias disponibles</p>';
        return;
    }

    console.log(`📄 Mostrando ${articulos.length} noticias`);

    // Crear una noticia por cada artículo
    articulos.forEach((articulo, index) => {
        console.log(`  ${index + 1}. ${articulo.title}`);
        const noticiaHTML = document.createElement('div');
        noticiaHTML.className = 'noticia-item';
        noticiaHTML.innerHTML = `
            <h4>${articulo.title}</h4>
            <p>${articulo.description || 'Sin descripción'}</p>
        `;
        contenedor.appendChild(noticiaHTML);
    });
}

/**
 * Función principal que carga y muestra las noticias
 */
async function cargarNoticias() {
    console.log('🚀 Iniciando cargarNoticias...');
    
    // Esperar a que el DOM esté completamente listo
    if (document.readyState === 'loading') {
        console.log('⏳ Esperando a que el DOM esté listo...');
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
    }
    
    // Pequeño delay adicional para asegurar que los scripts anteriores han corrido
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('🌐 Obteniendo noticias...');
    const articulos = await obtenerNoticias();
    console.log(`📰 Se obtuvieron ${articulos.length} artículos`);
    mostrarNoticias(articulos);
}

// Exportar las funciones para usarlas desde otros archivos
export { cargarNoticias, obtenerNoticias, mostrarNoticias };
