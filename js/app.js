/**
 * Aplicación I.T.R.
 * Sistema de Gestión de Inventario
 *
 * Responsabilidad:
 * - Configurar elementos generales de la aplicación.
 * - Configurar el favicon.
 * - Cargar componentes reutilizables.
 * - Inicializar la aplicación.
 */


/* =========================================
   CONFIGURACIÓN GENERAL
   ========================================= */

/**
 * Devuelve la ruta base de la aplicación.
 *
 * En GitHub Pages el proyecto se sirve bajo
 * /ITR-Sistema-Inventario/; en local no hay prefijo.
 *
 * @returns {string}
 */
function getBasePath() {

    const isGitHubPages =
        window.location.hostname === 'andresjotab.github.io';

    return isGitHubPages ? '/ITR-Sistema-Inventario' : '';
}

/**
 * Configura el favicon de la aplicación.
 *
 * Utiliza un único recurso para todas las páginas
 * del sistema I.T.R.
 */
function initializeFavicon() {

    const faviconPath =
        getBasePath() + "/assets/img/icons/logo-itr.png";

    const favicon =
        document.querySelector('link[rel="icon"]');

    if (favicon) {

        favicon.href =
            faviconPath;

        return;
    }

    const newFavicon =
        document.createElement("link");

    newFavicon.rel =
        "icon";

    newFavicon.type =
        "image/png";

    newFavicon.href =
        faviconPath;

    document.head.appendChild(
        newFavicon
    );
}


/* =========================================
   CARGA DE COMPONENTES
   ========================================= */

/**
 * Carga un componente HTML dentro de un contenedor.
 *
 * @param {string} containerId
 * @param {string} componentPath
 */
async function loadComponent(
    containerId,
    componentPath
) {

    const container =
        document.getElementById(containerId);


    if (!container) {

        console.error(
            `No se encontró el contenedor: ${containerId}`
        );

        return;
    }


    try {

        const cacheBuster = `?v=${Date.now()}`;
        const fetchUrl = componentPath.includes("?")
            ? `${componentPath}&v=${Date.now()}`
            : `${componentPath}${cacheBuster}`;

        const response =
            await fetch(fetchUrl);


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status} - ${response.statusText}`
            );
        }


        const html =
            await response.text();


        container.innerHTML =
            html;


    } catch (error) {

        console.error(
            `Error cargando el componente ${componentPath}:`,
            error
        );


        container.innerHTML = `
            <p class="component-error">
                No se pudo cargar este componente.
            </p>
        `;
    }
}


/* =========================================
   INICIALIZACIÓN
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        console.log(
            "Sistema I.T.R. iniciando..."
        );


        /* ================================
           FAVICON
           ================================ */

        initializeFavicon();


        /* ================================
           CARGA DE COMPONENTES
           ================================ */

        // Detectar si estamos en GitHub Pages
        const basePath = getBasePath();

        await Promise.all([

            loadComponent(
                "header-container",
                basePath + "/components/header.html"
            ),

            loadComponent(
                "sidebar-container",
                basePath + "/components/sidebar.html"
            ),

            loadComponent(
                "footer-container",
                basePath + "/components/footer.html"
            )

        ]);


        console.log(
            "Componentes I.T.R. cargados correctamente."
        );


        /* ================================
           NAVEGACIÓN
           ================================ */

        if (typeof initializeNavigation === 'function') {
            initializeNavigation();
            console.log(
                "Navegación I.T.R. inicializada correctamente."
            );
        } else {
            console.warn(
                "La función initializeNavigation no está definida."
            );
        }

    }
);