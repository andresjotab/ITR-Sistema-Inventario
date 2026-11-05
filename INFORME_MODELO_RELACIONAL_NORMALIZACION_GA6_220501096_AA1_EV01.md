# INFORME TÉCNICO: RESOLUCIÓN DE PROBLEMAS APLICANDO EL MODELO RELACIONAL, CARDINALIDAD Y NORMALIZACIÓN
## Evidencia: GA6-220501096-AA1-EV01
### Programa: Análisis y Desarrollo de Software (ADSO) - SENA
### Proyecto: Sistema de Gestión de Inventario para Tienda de Ropa (I.T.R. - Moda & Estilo)

---

## PORTADA
- **Nombre del Proyecto:** Sistema de Gestión de Inventario para Tienda de Ropa (I.T.R. - Moda & Estilo)
- **Evidencia de Aprendizaje:** GA6-220501096-AA1-EV01 - Resolución de problemas aplicando el modelo relacional, cardinalidad y normalización.
- **Actividad de Aprendizaje:** GA6-220501096-AA1 - Diseñar el modelo relacional de la base de datos a partir de requerimientos del sistema y aplicación de formas normales.
- **Programa de Formación:** Análisis y Desarrollo de Software (ADSO)
- **Fase del Proyecto:** Fase 2 - Diseño / Estructuración de Datos
- **Regional / Centro:** SENA - Centro de Servicios y Gestión Empresarial / Formación Profesional Integral
- **Fecha:** 2026

---
## 1. INTRODUCCIÓN Y OBJETIVOS

### 1.1 Introducción
En el ciclo de vida del desarrollo de software, la estructuración de la capa de persistencia de datos representa uno de los pilares más críticos para garantizar la integridad, escalabilidad, eficiencia operativa y confiabilidad del sistema de información. Un diseño de base de datos deficiente conlleva redundancia incontrolada, inconsistencias en los registros, anomalías de inserción, actualización o borrado, y una degradación severa en el rendimiento de las consultas transaccionales.

El presente documento expone la resolución técnica y metodológica aplicada en el diseño de la base de datos relacional para el **Sistema de Gestión de Inventario de Tienda de Ropa (I.T.R.)**. El negocio de prendas de vestir y confección posee particularidades operativas de alta complejidad: los productos se diferencian por variantes de talla (S, M, L, XL, etc.), color, género, categoría y colección; las ventas se asocian a clientes y vendedores específicos; y el inventario requiere abastecimiento continuo mediante órdenes de compra a proveedores y auditorías de stock en bodegas o sucursales.

A través de la aplicación rigurosa de los conceptos del **Modelo Relacional de Edgar F. Codd**, la definición formal de **cardinalidades y relaciones**, y el proceso de **Normalización de Bases de Datos (Primera, Segunda y Tercera Forma Normal - 1FN, 2FN, 3FN)**, este informe transforma una estructura plana y desnormalizada inicial (con anomalías operativas) en un esquema relacional normalizado, robusto y preparado para su implementación en Sistemas Gestores de Bases de Datos Relacionales (RDBMS) como PostgreSQL o MySQL.

### 1.2 Objetivos

#### 1.2.1 Objetivo General
Diseñar el modelo relacional de datos para el sistema de inventario y facturación de la tienda de ropa I.T.R., aplicando los principios de modelado de entidades, cardinalidad, integridad referencial y las reglas de normalización (1FN, 2FN y 3FN), asegurando una persistencia libre de anomalías y optimizada para el negocio textil.

#### 1.2.2 Objetivos Específicos
1. Identificar y describir los requerimientos del software y las reglas de negocio específicas del sector de confección y venta de ropa.
2. Formular la tabla universal no normalizada (0FN) que represente el escenario inicial de captura de datos de inventario y ventas con sus respectivas deficiencias operativas.
3. Aplicar secuencialmente la **Primera Forma Normal (1FN)**, eliminando grupos repetitivos, garantizando la atomicidad de atributos y definiendo claves primarias.
4. Aplicar la **Segunda Forma Normal (2FN)**, eliminando dependencias funcionales parciales respecto a claves primarias compuestas.
5. Aplicar la **Tercera Forma Normal (3FN)**, eliminando dependencias transitivas entre atributos no clave.
6. Construir el **Esquema Relacional Final** detallando tablas, columnas, tipos de datos, restricciones de no nulidad, claves primarias (PK) y foráneas (FK).
7. Definir y justificar la **matriz de cardinalidad** de todas las relaciones del sistema (1:1, 1:N, N:M) y modelar el diagrama relacional en sintaxis Mermaid y texto estructurado.
8. Proveer el **Diccionario de Datos** exhaustivo y el script **DDL en SQL estándar** para su inmediata ejecución y verificación en motor de bases de datos.

---
## 2. MARCO CONCEPTUAL: MODELO RELACIONAL, CARDINALIDAD Y NORMALIZACIÓN

### 2.1 El Modelo Relacional
Propuesto originalmente por Edgar F. Codd en 1970 en los laboratorios de IBM, el Modelo Relacional organiza los datos en tablas bidimensionales compuestas por:
- **Relación / Tabla:** Estructura que agrupa información sobre un conjunto de entidades del mismo tipo.
- **Tupla / Registro / Fila:** Instancia única de datos perteneciente a la relación.
- **Atributo / Campo / Columna:** Propiedad o característica de la entidad que toma valores de un dominio específico.
- **Clave Primaria (*Primary Key - PK*):** Atributo o conjunto mínimo de atributos que identifica unívocamente a cada tupla en una tabla. No permite valores nulos (`NOT NULL`) ni duplicados.
- **Clave Foránea (*Foreign Key - FK*):** Atributo en una tabla cuyos valores deben coincidir con la clave primaria de otra tabla, garantizando la **integridad referencial**.

### 2.2 Cardinalidad y Grado de las Relaciones
La cardinalidad expresa el número de ocurrencias de una entidad que pueden o deben estar asociadas con ocurrencias de otra entidad. En el diseño de software para inventario se presentan tres tipos fundamentales:
1. **Relación Uno a Uno (1:1):** Cada registro de la Entidad A se asocia exactamente con un registro de la Entidad B. *(Ejemplo: Un Empleado tiene un único Perfil de Seguridad extendido).*
2. **Relación Uno a Muchos (1:N o 1:*):** Un registro de la Entidad A puede asociarse con varios registros de la Entidad B, pero un registro de B solo pertenece a un registro de A. *(Ejemplo: Una Categoría agrupa muchas Prendas de Ropa; un Proveedor emite muchas Órdenes de Compra).*
3. **Relación Muchos a Muchos (N:M o *:*):** Múltiples registros de A pueden asociarse con múltiples registros de B. En el modelo relacional físico, esta relación **debe descomponerse** en dos relaciones 1:N mediante una **tabla intermedia o asociativa**. *(Ejemplo: Una Venta contiene muchos Productos, y un Producto puede venderse en muchas Ventas $\rightarrow$ Tabla asociativa `detalle_venta`).*

### 2.3 Proceso y Reglas de Normalización
La normalización es una técnica formal y sistemática de diseño de bases de datos que analiza las dependencias funcionales entre los atributos para minimizar la redundancia de datos y prevenir anomalías durante operaciones DML (Insert, Update, Delete).

```
   [ Tabla No Normalizada (0FN) ]
                 │
                 ▼  (Eliminar grupos repetitivos y asegurar atomicidad)
   [ Primera Forma Normal (1FN) ]
                 │
                 ▼  (Eliminar dependencias parciales en PK compuestas)
   [ Segunda Forma Normal (2FN) ]
                 │
                 ▼  (Eliminar dependencias transitivas entre no-claves)
   [ Tercera Forma Normal (3FN) ]
```

- **Primera Forma Normal (1FN):**
  - Todos los atributos contienen únicamente **valores atómicos e indivisibles** (sin listas, arrays ni valores compuestos).
  - No existen **grupos repetitivos** de columnas (como `producto1`, `producto2`, `producto3`).
  - Cada tabla cuenta con una **clave primaria** definida.
- **Segunda Forma Normal (2FN):**
  - La tabla está en 1FN.
  - Todos los atributos no clave tienen una **dependencia funcional completa** de la clave primaria. No existen dependencias parciales (donde un atributo depende solo de una parte de una clave primaria compuesta).
- **Tercera Forma Normal (3FN):**
  - La tabla está en 2FN.
  - Ningún atributo no clave depende transitivamente de la clave primaria (es decir, $X \rightarrow Y$ y $Y \rightarrow Z$, donde $X$ es PK y $Z$ depende de $Y$ que no es PK). Cada atributo no clave debe depender directa y exclusivamente de la clave primaria.

---
## 3. DESCRIPCIÓN DEL CASO DE ESTUDIO: TIENDA DE ROPA (I.T.R. - MODA & ESTILO)

### 3.1 Contexto del Negocio
La empresa **I.T.R. - Moda & Estilo** se dedica al almacenamiento, distribución y venta de prendas de vestir, calzado y accesorios para damas, caballeros y niños. La empresa cuenta con puntos de venta físicos y bodegas de almacenamiento central.

### 3.2 Reglas del Negocio y Requerimientos de Persistencia
1. **Catálogo y Categorización de Prendas:**
   - Cada prenda de ropa pertenece a una **Categoría** (ej. Camisas, Pantalones, Chaquetas, Calzado, Ropa Interior) y a una **Marca** (ej. Levis, Zara, ITR Basic, Nike, Adidas).
   - Un producto base (ej. "Camiseta Polo Slim Fit") posee un género objetivo (Hombre, Mujer, Unisex, Infantil) y un material/composición.
2. **Variantes de Producto (Talla, Color y SKU):**
   - El inventario físico de una tienda de ropa no se maneja simplemente por "Camiseta Polo", sino por sus variantes exactas: combinación de **Talla** (XS, S, M, L, XL, 32, 38, etc.) y **Color** (Azul Marino, Blanco, Negro, Rojo, etc.).
   - Cada variante posee su propio código de barras / SKU único, precio de venta, costo de adquisición y cantidad en stock disponible en almacén.
3. **Gestión de Proveedores y Abastecimiento:**
   - La tienda adquiere mercancía a través de **Proveedores** registrados (con NIT/RUT, razón social, teléfono, correo y dirección).
   - Las compras se consolidan en una **Orden de Compra / Entrada**, registrando fecha, proveedor, usuario receptor, productos/variantes recibidas, cantidad comprada y costo unitario.
4. **Gestión de Ventas y Facturación:**
   - Los clientes realizan compras en los puntos de venta. Cada cliente se registra con tipo de documento, número de identificación, nombres, apellidos, correo, teléfono y dirección.
   - Cada factura de venta almacena: número consecutivo de factura, fecha y hora, cliente, vendedor/cajero responsable, método de pago (Efectivo, Tarjeta Débito/Crédito, Transferencia), subtotal, valor de IVA y total a pagar.
   - El detalle de la venta contiene una o múltiples líneas con la variante de prenda vendida, cantidad, precio unitario de venta al momento de la transacción y descuento aplicado.
5. **Seguridad y Control de Acceso (Usuarios y Roles):**
   - El sistema es operado por usuarios autenticados (identificados con correo institucional y contraseña encriptada).
   - Cada usuario tiene asignado un **Rol de Seguridad** (Administrador, Supervisor, Vendedor, Bodeguero, Cajero, Auditor) que define sus privilegios dentro de la plataforma.
6. **Movimientos de Inventario y Auditoría:**
   - Toda entrada (por compra o ajuste) o salida (por venta, avería o devolución) queda registrada en una bitácora de **Kardex / Movimientos de Inventario** para trazabilidad total del stock.

---
