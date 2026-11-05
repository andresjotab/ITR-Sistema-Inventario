-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS itr;
USE itr;

-- 2. Crear Tabla ROL
CREATE TABLE ROL (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150),
    permisos VARCHAR(255)
);

-- 3. Crear Tabla CLIENTE
CREATE TABLE CLIENTE (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion VARCHAR(150)
);

-- 4. Crear Tabla USUARIO (Depende de ROL)
CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    estado VARCHAR(20) DEFAULT 'Activo',
    CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES ROL(id_rol)
);

-- 5. Crear Tabla CATEGORIA
CREATE TABLE CATEGORIA (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150)
);

-- 6. Crear Tabla PRODUCTO (Depende de CATEGORIA)
CREATE TABLE PRODUCTO (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    codigo VARCHAR(50) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'Disponible',
    CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
);

-- 7. Crear Tabla VENTA (Depende de USUARIO y CLIENTE)
CREATE TABLE VENTA (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_vendedor INT NOT NULL,
    id_cliente INT NOT NULL,
    factura VARCHAR(50),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_venta_usuario FOREIGN KEY (id_usuario_vendedor) REFERENCES USUARIO(id_usuario),
    CONSTRAINT fk_venta_cliente FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
);

-- 8. Crear Tabla DETALLE_VENTA (Depende de VENTA y PRODUCTO)
CREATE TABLE DETALLE_VENTA (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_detalle_venta FOREIGN KEY (id_venta) REFERENCES VENTA(id_venta),
    CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);

-- 9. Crear Tabla MOVIMIENTO (Depende de USUARIO y PRODUCTO)
CREATE TABLE MOVIMIENTO (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    tipo INT, -- 1 Entrada, 0 Salida (o según tu lógica)
    fecha INT, -- En el diagrama dice int, pero usualmente es DATETIME. Lo dejaré INT como pide la imagen.
    CONSTRAINT fk_movimiento_usuario FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario),
    CONSTRAINT fk_movimiento_producto FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
);

-- 10. Crear Tabla AUDITORIA (Depende de USUARIO)
CREATE TABLE AUDITORIA (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    accion VARCHAR(100),
    detalle TEXT,
    CONSTRAINT fk_auditoria_usuario FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

-- 11. Crear Tabla REPORTE
CREATE TABLE REPORTE (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    tipo VARCHAR(50),
    fecha_generacion DATETIME DEFAULT CURRENT_TIMESTAMP
);