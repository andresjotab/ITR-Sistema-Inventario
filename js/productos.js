/* =========================================
   PRODUCTOS I.T.R.
   js/productos.js
   Paginación: 6 productos por página
   Consume los datos desde DataService (js/data.js)
   ========================================= */

const PRODUCTOS_POR_PAGINA = 6;

let paginaActual = 1;
let productosVisibles = [];
let productoAEliminar = null;
/* Renderiza la tabla con los productos de la página actual */
function renderProductos() {
    const tbody = document.getElementById('productos-tbody');
    if (!tbody) return;

    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const fin = Math.min(inicio + PRODUCTOS_POR_PAGINA, productosVisibles.length);
    const paginaProductos = productosVisibles.slice(inicio, fin);

    tbody.innerHTML = paginaProductos.map(p => `
        <tr>
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>${p.stock}</td>
            <td>${p.precio}</td>
            <td><span class="badge ${badgeEstado(p.estado)}">${p.estado}</span></td>
            <td>
                <a href="editar_producto.html" class="btn btn-warning btn-sm" aria-label="Editar producto">✏️</a>
                <button type="button" class="btn btn-danger btn-sm"
                    data-accion="eliminar"
                    data-id="${p.codigo}"
                    data-nombre="${p.nombre}"
                    aria-label="Eliminar producto">🗑️</button>
            </td>
        </tr>
    `).join('');

    const total = productosVisibles.length;
    const info = document.getElementById('paginacion-info');
    if (info) {
        info.textContent = total === 0
            ? 'Mostrando 0-0 de 0'
            : `Mostrando ${inicio + 1}-${fin} de ${total}`;
    }

    renderPaginacion();
}

/* Badge según estado */
function badgeEstado(estado) {
    if (estado === 'Activo')  return 'success';
    if (estado === 'Agotado') return 'danger';
    return 'warning';
}

/* Genera los botones de paginación */
function renderPaginacion() {
    const totalPaginas = Math.max(1, Math.ceil(productosVisibles.length / PRODUCTOS_POR_PAGINA));
    const contenedor = document.getElementById('paginacion-botones');
    if (!contenedor) return;

    let html = `<button class="btn btn-sm" data-pagina="${paginaActual - 1}" ${paginaActual === 1 ? 'disabled' : ''}>◄</button>`;

    for (let i = 1; i <= totalPaginas; i++) {
        html += `<button class="btn btn-sm ${i === paginaActual ? 'active' : ''}" data-pagina="${i}">${i}</button>`;
    }

    html += `<button class="btn btn-sm" data-pagina="${paginaActual + 1}" ${paginaActual === totalPaginas ? 'disabled' : ''}>►</button>`;

    contenedor.innerHTML = html;
}

/* Cambia a la página indicada */
function cambiarPagina(pagina) {
    const totalPaginas = Math.max(1, Math.ceil(productosVisibles.length / PRODUCTOS_POR_PAGINA));
    if (pagina < 1 || pagina > totalPaginas) return;
    paginaActual = pagina;
    renderProductos();
}

/* Filtra los productos por el término de búsqueda */
function buscarProductos() {
    const input = document.getElementById('buscar-input');
    if (!input) return;

    const termino = input.value.trim().toLowerCase();
    const todos = DataService.getProductos();

    productosVisibles = termino
        ? todos.filter(p =>
            p.nombre.toLowerCase().includes(termino) ||
            p.codigo.toLowerCase().includes(termino))
        : todos;
    paginaActual = 1;
    renderProductos();
}

/* Modal de confirmación de eliminación */
function abrirModalProducto(id, nombre) {
    productoAEliminar = id;
    const codigoEl = document.getElementById('codigoProducto');
    const nombreEl = document.getElementById('nombreProducto');
    if (codigoEl) codigoEl.textContent = id;
    if (nombreEl) nombreEl.textContent = nombre;
    const modal = document.getElementById('modalEliminar');
    if (modal) modal.classList.add('active');
}

function cerrarModalProducto() {
    const modal = document.getElementById('modalEliminar');
    if (modal) modal.classList.remove('active');
    productoAEliminar = null;
}

function confirmarEliminarProducto() {
    if (!productoAEliminar) return;

    const todos = DataService.getProductos();
    const index = todos.findIndex(p => p.codigo === productoAEliminar);
    if (index !== -1) {
        todos.splice(index, 1);
    }

    const inputBuscar = document.getElementById('buscar-input');
    const termino = inputBuscar ? inputBuscar.value.trim().toLowerCase() : '';
    productosVisibles = termino
        ? todos.filter(p =>
            p.nombre.toLowerCase().includes(termino) ||
            p.codigo.toLowerCase().includes(termino))
        : todos;

    const totalPaginas = Math.max(1, Math.ceil(productosVisibles.length / PRODUCTOS_POR_PAGINA));
    if (paginaActual > totalPaginas) {
        paginaActual = totalPaginas;
    }

    renderProductos();
    cerrarModalProducto();
}

/* Inicialización */
document.addEventListener('DOMContentLoaded', () => {
    productosVisibles = DataService.getProductos();
    renderProductos();

    /* Delegación de eventos: paginación */
    const contenedorPag = document.getElementById('paginacion-botones');
    if (contenedorPag) {
        contenedorPag.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-pagina]');
            if (btn && !btn.disabled) cambiarPagina(Number(btn.dataset.pagina));
        });
    }

    /* Delegación de eventos: botones eliminar */
    const tbody = document.getElementById('productos-tbody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-accion="eliminar"]');
            if (btn) abrirModalProducto(btn.dataset.id, btn.dataset.nombre);
        });
    }

    /* Búsqueda en tiempo real */
    const inputBuscar = document.getElementById('buscar-input');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', buscarProductos);
    }

    /* Modal: cerrar con overlay, botones y tecla ESC */
    const modal = document.getElementById('modalEliminar');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModalProducto();
        });
        modal.querySelectorAll('[data-cerrar-modal]')
            .forEach(btn => btn.addEventListener('click', cerrarModalProducto));
    }

    /* Confirmar eliminación */
    const btnConfirmar = document.getElementById('btnConfirmarEliminar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', confirmarEliminarProducto);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModalProducto();
    });
});
