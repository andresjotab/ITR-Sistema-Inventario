/**
 * Autenticación I.T.R.
 * Gestión de componentes y formulario de inicio de sesión.
 */

const rememberedUserKey = "itr-auth-remembered-username";


/* =========================================
   COMPONENTES
   ========================================= */

async function loadComponent(id, path) {

    const container = document.getElementById(id);

    if (!container) return;

    try {

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        container.innerHTML = await response.text();

        if (id === "auth-header-container") {
            configureAuthHeader(container);
        }

    } catch (error) {

        console.error(`Error cargando ${path}:`, error);

        container.innerHTML = `
            <p class="component-error">
                No se pudo cargar el componente.
            </p>
        `;
    }
}


async function initializeAuthComponents() {

    // DETECTOR: ¿Estamos en GitHub Pages o en Localhost?
    const isGitHub = window.location.hostname.includes('github.io');

    // DEFINICIÓN DE RUTA: Si es GitHub, usa la ruta absoluta. Si es Local, usa la relativa.
    const basePath = isGitHub ? '/ITR-Sistema-Inventario' : '../..';

    await Promise.all([

        loadComponent(
            "auth-header-container",
            `${basePath}/components/header.html`
        ),

        loadComponent(
            "auth-footer-container",
            `${basePath}/components/footer.html`
        )

    ]);
}


/* =========================================
   HEADER
   ========================================= */

function configureAuthHeader(container) {

    const right = container.querySelector(".header-right");
    const menu = container.querySelector(".menu-toggle");

    if (right) {
        right.style.display = "none";
    }

    if (menu) {
        menu.style.display = "none";
    }
}


/* =========================================
   MENSAJES
   ========================================= */

function showMessage(message, type = "error") {

    const element =
        document.getElementById("authMessage");

    if (!element) return;

    element.textContent = message;

    element.className =
        `form-message form-message--${type}`;

    element.hidden = false;
}


function hideMessage() {

    const element =
        document.getElementById("authMessage");

    if (!element) return;

    element.hidden = true;
    element.textContent = "";
}


/* =========================================
   USUARIO RECORDADO
   ========================================= */

function loadRememberedUser() {

    const username =
        localStorage.getItem(rememberedUserKey);

    const input =
        document.getElementById("username");

    const checkbox =
        document.getElementById("remember");

    if (username && input && checkbox) {

        input.value = username;
        checkbox.checked = true;
    }
}


function saveRememberedUser(username, remember) {

    if (remember && username) {

        localStorage.setItem(
            rememberedUserKey,
            username
        );

    } else {

        localStorage.removeItem(
            rememberedUserKey
        );
    }
}


function handleLogin(event) {

    event.preventDefault();

    const username =
        document.getElementById("username");

    const remember =
        document.getElementById("remember");


    const user =
        username.value.trim();


    /* =========================================
       USUARIO RECORDADO
       ========================================= */

    saveRememberedUser(
        user,
        remember.checked
    );


    /* =========================================
       NAVEGACIÓN TEMPORAL
       ========================================= */

    window.location.href =
        "/pages/dashboard/dashboard.html";
}

/* =========================================
   ACCIONES
   ========================================= */

function initializeLoginActions() {

    const form =
        document.getElementById("loginForm");

    const requestAccess =
        document.getElementById("requestAccessButton");


    if (form) {

        form.addEventListener(
            "submit",
            handleLogin
        );

        form.querySelectorAll(".form-input")
            .forEach(input => {

                input.addEventListener(
                    "input",
                    hideMessage
                );
            });
    }


    if (requestAccess) {

        requestAccess.addEventListener(
            "click",
            () => {

                showMessage(
                    "Solicitar acceso requiere autorización administrativa. Envíe una solicitud al equipo de TI.",
                    "info"
                );
            }
        );
    }
}


/* =========================================
   INICIALIZACIÓN
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await initializeAuthComponents();

        initializeLoginActions();

        loadRememberedUser();

    }
);