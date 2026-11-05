/**
 * ============================================================
 *  ROLES I.T.R.
 *  js/roles.js
 *  ------------------------------------------------------------
 *  Capa de presentación de la gestión de roles.
 *  Consume los datos desde DataService (js/data.js).
 *  Cuando exista backend, solo cambiará DataService.
 * ============================================================
 */

const ROLES_POR_PAGINA = 6;

let rolesVisibles = [];
let paginaActualRoles = 1;
let rolAEliminar = null;

/* ------------------------------------------------------------
 *  RENDERIZADO DE LA TABLA
 * ------------------------------------------------------------ */
function renderRoles() {

    const tbody = document.getElementById('roles-tbody');

    if (!tbody) return;

    const inicio = (paginaActualRoles - 1) * ROLES_POR_PAGINA;
    const fin = Math.min(inicio + ROLES_POR_PAGINA, rolesVisibles.length);
    const paginaRoles = rolesVisibles.slice(inicio, fin);

    tbody.innerHTML = paginaRoles.map(rol => `
        <tr>
            <td>${rol.id}</td>
            <td>${rol.nombre}</td>
            <td>${rol.descripcion}</td>
            <td><span class="badge ${badgeEstado(rol.estado)}">${rol.estado}</span></td>
            <td>${rol.creado}</td>
            <td>
                <a href="editar_rol.html" class="btn btn-warning btn-sm" aria-label="Editar rol">✏️</a>
                <button type="button" class="btn btn-danger btn-sm"
                    data-accion="eliminar"
                    data-id="${rol.id}"
                    data-nombre="${rol.nombre}"
                    aria-label="Eliminar rol">🗑️</button>
            </td>
        </tr>
    `).join('');

    const total = rolesVisibles.length;
    const info = document.getElementById('paginacion-info-roles');
    if (info) {
        info.textContent = total === 0
            ? 'Mostrando 0-0 de 0'
            : `Mostrando ${inicio + 1}-${fin} de ${total}`;
    }

    renderPaginacionRoles();
}

/* ------------------------------------------------------------
 *  BADGE SEGÚN ESTADO
 * ------------------------------------------------------------ */
function badgeEstado(estado) {
    if (estado === 'Activo') return 'success';
    if (estado === 'Inactivo') return 'warning';
    return 'danger';
}

/* ------------------------------------------------------------
 *  PAGINACIÓN
 * ------------------------------------------------------------ */
function renderPaginacionRoles() {

    const contenedor = document.getElementById('paginacion-botones-roles');

    if (!contenedor) return;

    const totalPaginas = Math.max(1, Math.ceil(rolesVisibles.length / ROLES_POR_PAGINA));

    let html = `<button class="btn btn-sm" data-pagina="${paginaActualRoles - 1}" ${paginaActualRoles === 1 ? 'disabled' : ''}>◄</button>`;

    for (let i = 1; i <= totalPaginas; i++) {
        html += `<button class="btn btn-sm ${i === paginaActualRoles ? 'active' : ''}" data-pagina="${i}">${i}</button>`;
    }

    html += `<button class="btn btn-sm" data-pagina="${paginaActualRoles + 1}" ${paginaActualRoles === totalPaginas ? 'disabled' : ''}>►</button>`;

    contenedor.innerHTML = html;
}

function cambiarPaginaRoles(pagina) {
    const totalPaginas = Math.max(1, Math.ceil(rolesVisibles.length / ROLES_POR_PAGINA));
    if (pagina < 1 || pagina > totalPaginas) return;
    paginaActualRoles = pagina;
    renderRoles();
}

/* ------------------------------------------------------------
 *  BÚSQUEDA
 * ------------------------------------------------------------ */
function buscarRoles() {

    const input = document.getElementById('buscar-roles');

    if (!input) return;

    const termino = input.value.trim().toLowerCase();

    const todos = DataService.getRoles();

    rolesVisibles = termino
        ? todos.filter(rol =>
            rol.nombre.toLowerCase().includes(termino) ||
            rol.descripcion.toLowerCase().includes(termino) ||
            rol.id.toLowerCase().includes(termino))
        : todos;

    paginaActualRoles = 1;
    renderRoles();
}

/* ------------------------------------------------------------
 *  MODAL ELIMINAR
 * ------------------------------------------------------------ */
function abrirModalRol(id, nombre) {
    rolAEliminar = id;
    const modal = document.getElementById('modalEliminar');
    const codigoEl = document.getElementById('codigoRol');
    const nombreEl = document.getElementById('nombreRol');
    if (codigoEl) codigoEl.textContent = id;
    if (nombreEl) nombreEl.textContent = nombre;
    if (modal) modal.classList.add('active');
}

function cerrarModalRol() {
    const modal = document.getElementById('modalEliminar');
    if (modal) modal.classList.remove('active');
    rolAEliminar = null;
}

function confirmarEliminarRol() {
    if (!rolAEliminar) return;

    const todos = DataService.getRoles();
    const index = todos.findIndex(r => r.id === rolAEliminar);
    if (index !== -1) {
        todos.splice(index, 1);
    }

    const input = document.getElementById('buscar-roles');
    const termino = input ? input.value.trim().toLowerCase() : '';
    rolesVisibles = termino
        ? todos.filter(rol =>
            rol.nombre.toLowerCase().includes(termino) ||
            rol.descripcion.toLowerCase().includes(termino) ||
            rol.id.toLowerCase().includes(termino))
        : todos;

    const totalPaginas = Math.max(1, Math.ceil(rolesVisibles.length / ROLES_POR_PAGINA));
    if (paginaActualRoles > totalPaginas) {
        paginaActualRoles = totalPaginas;
    }

    renderRoles();
    cerrarModalRol();
}

/* ------------------------------------------------------------
 *  INICIALIZACIÓN
 * ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {

    rolesVisibles = DataService.getRoles();
    renderRoles();

    /* Delegación de eventos: paginación */
    const contenedorPag = document.getElementById('paginacion-botones-roles');
    if (contenedorPag) {
        contenedorPag.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-pagina]');
            if (btn && !btn.disabled) cambiarPaginaRoles(Number(btn.dataset.pagina));
        });
    }

    /* Delegación de eventos: botones eliminar */
    const tbody = document.getElementById('roles-tbody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-accion="eliminar"]');
            if (btn) abrirModalRol(btn.dataset.id, btn.dataset.nombre);
        });
    }

    /* Delegación de eventos: búsqueda */
    const inputBuscar = document.getElementById('buscar-roles');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', buscarRoles);
    }

    /* Modal: cerrar con overlay, botón y ESC */
    const modal = document.getElementById('modalEliminar');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModalRol();
        });
        const cerrarBtns = modal.querySelectorAll('[data-cerrar-modal]');
        cerrarBtns.forEach(btn => btn.addEventListener('click', cerrarModalRol));
    }

    const btnConfirmar = document.getElementById('btnConfirmarEliminarRol');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', confirmarEliminarRol);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModalRol();
    });
});
