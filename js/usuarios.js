/**
 * ============================================================
 *  USUARIOS I.T.R.
 *  js/usuarios.js
 *  ------------------------------------------------------------
 *  Capa de presentación de la gestión de usuarios.
 *  Consume los datos desde DataService (js/data.js).
 *  Cuando exista backend, solo cambiará DataService.
 * ============================================================
 */

const USUARIOS_POR_PAGINA = 6;

let usuariosVisibles = [];
let paginaActualUsuarios = 1;
let usuarioAEliminar = null;

/* ------------------------------------------------------------
 *  RENDERIZADO DE LA TABLA
 * ------------------------------------------------------------ */
function renderUsuarios() {

    const tbody = document.getElementById('usuarios-tbody');

    if (!tbody) return;

    const inicio = (paginaActualUsuarios - 1) * USUARIOS_POR_PAGINA;
    const fin = Math.min(inicio + USUARIOS_POR_PAGINA, usuariosVisibles.length);
    const paginaUsuarios = usuariosVisibles.slice(inicio, fin);

    tbody.innerHTML = paginaUsuarios.map(usuario => `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.rol}</td>
            <td><span class="badge ${badgeEstado(usuario.estado)}">${usuario.estado}</span></td>
            <td>${usuario.creado}</td>
            <td>
                <a href="editar_usuario.html" class="btn btn-warning btn-sm" aria-label="Editar usuario">✏️</a>
                <button type="button" class="btn btn-secondary btn-sm"
                    data-accion="clave"
                    data-id="${usuario.id}"
                    data-nombre="${usuario.nombre}"
                    aria-label="Cambiar contraseña">🔑</button>
                <button type="button" class="btn btn-danger btn-sm"
                    data-accion="eliminar"
                    data-id="${usuario.id}"
                    data-nombre="${usuario.nombre}"
                    aria-label="Eliminar usuario">🗑️</button>
            </td>
        </tr>
    `).join('');

    const total = usuariosVisibles.length;
    const info = document.getElementById('paginacion-info-usuarios');
    if (info) {
        info.textContent = total === 0
            ? 'Mostrando 0-0 de 0'
            : `Mostrando ${inicio + 1}-${fin} de ${total}`;
    }

    renderPaginacionUsuarios();
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
function renderPaginacionUsuarios() {

    const contenedor = document.getElementById('paginacion-botones-usuarios');

    if (!contenedor) return;

    const totalPaginas = Math.max(1, Math.ceil(usuariosVisibles.length / USUARIOS_POR_PAGINA));

    let html = `<button class="btn btn-sm" data-pagina="${paginaActualUsuarios - 1}" ${paginaActualUsuarios === 1 ? 'disabled' : ''}>◄</button>`;

    for (let i = 1; i <= totalPaginas; i++) {
        html += `<button class="btn btn-sm ${i === paginaActualUsuarios ? 'active' : ''}" data-pagina="${i}">${i}</button>`;
    }

    html += `<button class="btn btn-sm" data-pagina="${paginaActualUsuarios + 1}" ${paginaActualUsuarios === totalPaginas ? 'disabled' : ''}>►</button>`;

    contenedor.innerHTML = html;
}

function cambiarPaginaUsuarios(pagina) {
    const totalPaginas = Math.max(1, Math.ceil(usuariosVisibles.length / USUARIOS_POR_PAGINA));
    if (pagina < 1 || pagina > totalPaginas) return;
    paginaActualUsuarios = pagina;
    renderUsuarios();
}

/* ------------------------------------------------------------
 *  BÚSQUEDA
 * ------------------------------------------------------------ */
function buscarUsuarios() {

    const input = document.getElementById('buscar-usuarios');

    if (!input) return;

    const termino = input.value.trim().toLowerCase();

    const todos = DataService.getUsuarios();

    usuariosVisibles = termino
        ? todos.filter(usuario =>
            usuario.nombre.toLowerCase().includes(termino) ||
            usuario.correo.toLowerCase().includes(termino) ||
            usuario.rol.toLowerCase().includes(termino) ||
            usuario.id.toLowerCase().includes(termino))
        : todos;

    paginaActualUsuarios = 1;
    renderUsuarios();
}

/* ------------------------------------------------------------
 *  MODAL ELIMINAR
 * ------------------------------------------------------------ */
function abrirModalUsuario(id, nombre) {
    usuarioAEliminar = id;
    const modal = document.getElementById('modalEliminar');
    const codigoEl = document.getElementById('codigoUsuario');
    const nombreEl = document.getElementById('nombreUsuario');
    if (codigoEl) codigoEl.textContent = id;
    if (nombreEl) nombreEl.textContent = nombre;
    if (modal) modal.classList.add('active');
}

function cerrarModalUsuario() {
    const modal = document.getElementById('modalEliminar');
    if (modal) modal.classList.remove('active');
    usuarioAEliminar = null;
}

function confirmarEliminarUsuario() {
    if (!usuarioAEliminar) return;

    const todos = DataService.getUsuarios();
    const index = todos.findIndex(u => u.id === usuarioAEliminar);
    if (index !== -1) {
        todos.splice(index, 1);
    }

    const input = document.getElementById('buscar-usuarios');
    const termino = input ? input.value.trim().toLowerCase() : '';
    usuariosVisibles = termino
        ? todos.filter(usuario =>
            usuario.nombre.toLowerCase().includes(termino) ||
            usuario.correo.toLowerCase().includes(termino) ||
            usuario.rol.toLowerCase().includes(termino) ||
            usuario.id.toLowerCase().includes(termino))
        : todos;

    const totalPaginas = Math.max(1, Math.ceil(usuariosVisibles.length / USUARIOS_POR_PAGINA));
    if (paginaActualUsuarios > totalPaginas) {
        paginaActualUsuarios = totalPaginas;
    }

    renderUsuarios();
    cerrarModalUsuario();
}

/* ------------------------------------------------------------
 *  MODAL CAMBIAR CONTRASEÑA
 * ------------------------------------------------------------ */
function abrirModalClave(id, nombre) {
    const modal = document.getElementById('modalClave');
    const nombreEl = document.getElementById('nombreClave');
    if (nombreEl) nombreEl.textContent = nombre + ' (' + id + ')';
    if (modal) modal.classList.add('active');
}

function cerrarModalClave() {
    const modal = document.getElementById('modalClave');
    if (modal) modal.classList.remove('active');
}

/* ------------------------------------------------------------
 *  INICIALIZACIÓN
 * ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {

    usuariosVisibles = DataService.getUsuarios();
    renderUsuarios();

    /* Delegación de eventos: paginación */
    const contenedorPag = document.getElementById('paginacion-botones-usuarios');
    if (contenedorPag) {
        contenedorPag.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-pagina]');
            if (btn && !btn.disabled) cambiarPaginaUsuarios(Number(btn.dataset.pagina));
        });
    }

    /* Delegación de eventos: acciones de fila */
    const tbody = document.getElementById('usuarios-tbody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-accion]');
            if (!btn) return;
            if (btn.dataset.accion === 'eliminar') {
                abrirModalUsuario(btn.dataset.id, btn.dataset.nombre);
            } else if (btn.dataset.accion === 'clave') {
                abrirModalClave(btn.dataset.id, btn.dataset.nombre);
            }
        });
    }

    /* Delegación de eventos: búsqueda */
    const inputBuscar = document.getElementById('buscar-usuarios');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', buscarUsuarios);
    }

    /* Modal eliminar: cerrar con overlay, botón y ESC */
    const modal = document.getElementById('modalEliminar');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModalUsuario();
        });
        const cerrarBtns = modal.querySelectorAll('[data-cerrar-modal]');
        cerrarBtns.forEach(btn => btn.addEventListener('click', cerrarModalUsuario));
    }

    const btnConfirmar = document.getElementById('btnConfirmarEliminarUsuario');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', confirmarEliminarUsuario);
    }

    /* Modal clave: cerrar con overlay, botón y ESC */
    const modalClave = document.getElementById('modalClave');
    if (modalClave) {
        modalClave.addEventListener('click', (e) => {
            if (e.target === modalClave) cerrarModalClave();
        });
        const cerrarBtns = modalClave.querySelectorAll('[data-cerrar-modal]');
        cerrarBtns.forEach(btn => btn.addEventListener('click', cerrarModalClave));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarModalUsuario();
            cerrarModalClave();
        }
    });
});
