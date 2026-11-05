/**
 * ============================================================
 *  CAPA DE DATOS (Data Layer)
 *  js/data.js
 *  ------------------------------------------------------------
 *  Única fuente de verdad de los datos de ejemplo del sistema.
 *  Las capas superiores (js/roles.js, js/usuarios.js,
 *  js/productos.js) consumen estos datos a través de
 *  DataService, nunca directamente.
 * ============================================================
 */

const DataService = (function () {

    /* --------------------------------------------------------
     *  DATOS DE ROLES
     * -------------------------------------------------------- */
    const roles = [
        { id: '01', nombre: 'Admin', descripcion: 'Control total', estado: 'Activo', creado: '14/08/2025' },
        { id: '02', nombre: 'Supervisor', descripcion: 'Gestión de inventario', estado: 'Inactivo', creado: '13/08/2025' },
        { id: '03', nombre: 'Vendedor', descripcion: 'Ventas y facturación', estado: 'Activo', creado: '12/08/2025' },
        { id: '04', nombre: 'Invitado', descripcion: 'Solo lectura', estado: 'Eliminado', creado: '11/08/2025' },
        { id: '05', nombre: 'Bodeguero', descripcion: 'Recepción y despacho de mercancía', estado: 'Activo', creado: '10/08/2025' },
        { id: '06', nombre: 'Contador', descripcion: 'Gestión financiera y reportes', estado: 'Activo', creado: '09/08/2025' },
        { id: '07', nombre: 'Auditor', descripcion: 'Revisión de inventario', estado: 'Inactivo', creado: '08/08/2025' },
        { id: '08', nombre: 'Cajero', descripcion: 'Punto de venta', estado: 'Activo', creado: '07/08/2025' },
        { id: '09', nombre: 'Compras', descripcion: 'Gestión de proveedores', estado: 'Activo', creado: '06/08/2025' },
        { id: '10', nombre: 'Soporte', descripcion: 'Mesa de ayuda', estado: 'Inactivo', creado: '05/08/2025' },
        { id: '11', nombre: 'Gerente', descripcion: 'Control general', estado: 'Activo', creado: '04/08/2025' },
        { id: '12', nombre: 'Practicante', descripcion: 'Apoyo operativo', estado: 'Eliminado', creado: '03/08/2025' }
    ];

    /* --------------------------------------------------------
     *  DATOS DE USUARIOS
     * -------------------------------------------------------- */
    const usuarios = [
        { id: '01', nombre: 'Carlos Pérez', correo: 'carlos@itr.com', rol: 'Admin', estado: 'Activo', creado: '14/08/2025' },
        { id: '02', nombre: 'Ana Gómez', correo: 'ana@itr.com', rol: 'Supervisor', estado: 'Inactivo', creado: '13/08/2025' },
        { id: '03', nombre: 'Luis Mora', correo: 'luis@itr.com', rol: 'Vendedor', estado: 'Activo', creado: '12/08/2025' },
        { id: '04', nombre: 'Invitado', correo: 'invitado@itr.com', rol: 'Invitado', estado: 'Eliminado', creado: '11/08/2025' },
        { id: '05', nombre: 'María Torres', correo: 'maria@itr.com', rol: 'Bodeguero', estado: 'Activo', creado: '10/08/2025' },
        { id: '06', nombre: 'Jorge Ruiz', correo: 'jorge@itr.com', rol: 'Contador', estado: 'Activo', creado: '09/08/2025' },
        { id: '07', nombre: 'Diana Ríos', correo: 'diana@itr.com', rol: 'Auditor', estado: 'Inactivo', creado: '08/08/2025' },
        { id: '08', nombre: 'Pedro Salas', correo: 'pedro@itr.com', rol: 'Cajero', estado: 'Activo', creado: '07/08/2025' },
        { id: '09', nombre: 'Laura Vega', correo: 'laura@itr.com', rol: 'Compras', estado: 'Activo', creado: '06/08/2025' },
        { id: '10', nombre: 'Andrés Cruz', correo: 'andres@itr.com', rol: 'Soporte', estado: 'Inactivo', creado: '05/08/2025' },
        { id: '11', nombre: 'Sofía León', correo: 'sofia@itr.com', rol: 'Gerente', estado: 'Activo', creado: '04/08/2025' },
        { id: '12', nombre: 'Camilo Díaz', correo: 'camilo@itr.com', rol: 'Practicante', estado: 'Eliminado', creado: '03/08/2025' }
    ];

    /* --------------------------------------------------------
     *  DATOS DE PRODUCTOS
     * -------------------------------------------------------- */
    const productos = [
        { codigo: 'P001', nombre: 'Laptop HP', stock: 12, precio: 2500000, estado: 'Activo' },
        { codigo: 'P002', nombre: 'Mouse USB', stock: 45, precio: 25000, estado: 'Activo' },
        { codigo: 'P003', nombre: 'Teclado Mecánico', stock: 8, precio: 180000, estado: 'Inactivo' },
        { codigo: 'P004', nombre: 'Monitor 24"', stock: 15, precio: 850000, estado: 'Activo' },
        { codigo: 'P005', nombre: 'Impresora', stock: 0, precio: 650000, estado: 'Eliminado' },
        { codigo: 'P006', nombre: 'Audífonos', stock: 30, precio: 120000, estado: 'Activo' },
        { codigo: 'P007', nombre: 'Webcam HD', stock: 20, precio: 95000, estado: 'Activo' },
        { codigo: 'P008', nombre: 'Parlantes', stock: 14, precio: 150000, estado: 'Activo' },
        { codigo: 'P009', nombre: 'Disco SSD 512GB', stock: 25, precio: 320000, estado: 'Activo' },
        { codigo: 'P010', nombre: 'Router WiFi', stock: 9, precio: 210000, estado: 'Inactivo' },
        { codigo: 'P011', nombre: 'Cable HDMI', stock: 60, precio: 18000, estado: 'Activo' },
        { codigo: 'P012', nombre: 'UPS 650VA', stock: 5, precio: 420000, estado: 'Eliminado' }
    ];

    /* --------------------------------------------------------
     *  API PÚBLICA
     * -------------------------------------------------------- */
    return {
        getRoles: function () { return roles; },
        getUsuarios: function () { return usuarios; },
        getProductos: function () { return productos; }
    };

})();
