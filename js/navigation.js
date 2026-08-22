/**
 * Navegación principal I.T.R.
 *
 * Responsabilidad:
 * - Controlar apertura y cierre del Sidebar.
 * - Controlar el overlay móvil.
 * - Gestionar accesibilidad del menú.
 * - Cerrar el Sidebar mediante acciones del usuario.
 */

function initializeNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebar =
        document.getElementById("sidebar");


    if (!menuToggle || !sidebar) {

        console.error(
            "No se encontró el botón de menú o el Sidebar."
        );

        return;
    }


    /* =========================================
       CREAR OVERLAY
       ========================================= */

    let overlay =
        document.getElementById("sidebarOverlay");


    if (!overlay) {

        overlay =
            document.createElement("div");

        overlay.id = "sidebarOverlay";

        overlay.className =
            "sidebar-overlay";

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.appendChild(overlay);
    }


    /* =========================================
       ABRIR SIDEBAR
       ========================================= */

    function openSidebar() {

        sidebar.classList.add("open");

        overlay.classList.add("active");

        document.body.classList.add(
            "sidebar-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Cerrar menú de navegación"
        );


        overlay.setAttribute(
            "aria-hidden",
            "false"
        );


        console.log(
            "Sidebar abierto"
        );
    }


    /* =========================================
       CERRAR SIDEBAR
       ========================================= */

    function closeSidebar() {

        sidebar.classList.remove("open");

        overlay.classList.remove("active");

        document.body.classList.remove(
            "sidebar-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Abrir menú de navegación"
        );


        overlay.setAttribute(
            "aria-hidden",
            "true"
        );


        console.log(
            "Sidebar cerrado"
        );
    }


    /* =========================================
       BOTÓN MENÚ
       ========================================= */

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                sidebar.classList.contains("open");


            if (isOpen) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );


    /* =========================================
       CLICK EN OVERLAY
       ========================================= */

    overlay.addEventListener(
        "click",
        () => {

            closeSidebar();

        }
    );


    /* =========================================
       TECLA ESC
       ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                sidebar.classList.contains("open")
            ) {

                closeSidebar();

                menuToggle.focus();
            }

        }
    );


    /* =========================================
       ENLACES DEL SIDEBAR
       ========================================= */

    const sidebarLinks =
        sidebar.querySelectorAll(
            ".sidebar-link"
        );
    /* =========================================
   NAVEGACIÓN ACTIVA
   ========================================= */

    const currentPage =
        document.body.dataset.page;


    if (currentPage) {

        sidebarLinks.forEach(
            (link) => {

                const linkPage =
                    link.dataset.page;


                link.classList.toggle(
                    "active",
                    linkPage === currentPage
                );

            }
        );

    }

    sidebarLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    /*
                     * En dispositivos móviles
                     * cerramos el Sidebar después
                     * de seleccionar una opción.
                     */

                    if (
                        window.innerWidth <= 767
                    ) {

                        closeSidebar();
                    }

                }
            );

        }
    );

    /* =========================================
       MENÚ DEL USUARIO
       ========================================= */

    const userButton =
       document.querySelector(".user-button");

    let userDropdown =
       document.getElementById("userDropdown");

    let logoutButton =
       document.getElementById("logoutButton");

    if (userButton && !userDropdown) {
       const userMenu = userButton.closest(".user-menu");

       if (userMenu) {
           userDropdown = document.createElement("div");
           userDropdown.id = "userDropdown";
           userDropdown.className = "user-dropdown";
           userDropdown.setAttribute("role", "menu");
           userDropdown.setAttribute("aria-label", "Menú del usuario");
           userDropdown.setAttribute("hidden", "hidden");

           logoutButton = document.createElement("button");
           logoutButton.id = "logoutButton";
           logoutButton.type = "button";
           logoutButton.className = "user-menu-item";
           logoutButton.setAttribute("role", "menuitem");
           logoutButton.textContent = "Cerrar sesión";

           userDropdown.appendChild(logoutButton);
           userMenu.appendChild(userDropdown);
       }
    }

    if (userButton && userDropdown && logoutButton) {

       const closeUserMenu = () => {
           userDropdown.setAttribute("hidden", "hidden");
           userButton.setAttribute("aria-expanded", "false");
       };

       const openUserMenu = () => {
           userDropdown.removeAttribute("hidden");
           userButton.setAttribute("aria-expanded", "true");
       };

       userButton.setAttribute("aria-controls", "userDropdown");

       userButton.addEventListener("click", (event) => {
           event.stopPropagation();

           if (userDropdown.hasAttribute("hidden")) {
               openUserMenu();
           } else {
               closeUserMenu();
           }
       });

       logoutButton.addEventListener("click", (event) => {
           event.preventDefault();
           event.stopPropagation();
           closeUserMenu();
           window.location.assign("../../index.html");
       });

       document.addEventListener("click", (event) => {
           const clickedInsideMenu =
               event.target.closest(".user-menu");

           if (!clickedInsideMenu) {
               closeUserMenu();
           }
       });
    }


    /* =========================================
       CAMBIO DE TAMAÑO DE PANTALLA
       ========================================= */

    window.addEventListener(
        "resize",
        () => {

            /*
             * Si pasamos de móvil a PC,
             * limpiamos el estado móvil.
             */

            if (
                window.innerWidth > 767
            ) {

                closeSidebar();
            }

        }
    );

}