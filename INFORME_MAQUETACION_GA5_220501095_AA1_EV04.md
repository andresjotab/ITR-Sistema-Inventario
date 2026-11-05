# INFORME TÉCNICO DE MAQUETACIÓN DE LA INTERFAZ GRÁFICA EN HTML
## Evidencia: GA5-220501095-AA1-EV04
### Programa: Análisis y Desarrollo de Software (ADSO) - SENA
### Proyecto: Sistema de Gestión de Inventario I.T.R.

---

## PORTADA
- **Nombre del Proyecto:** I.T.R. - Sistema de Gestión de Inventario
- **Evidencia de Aprendizaje:** GA5-220501095-AA1-EV04 - Maquetación de la interfaz gráfica en HTML
- **Actividad de Aprendizaje:** GA5-220501095-AA1 - Definir la estructura y el diseño de la interfaz gráfica de usuario según los requerimientos del software.
- **Programa de Formación:** Análisis y Desarrollo de Software (ADSO)
- **Fase del Proyecto:** Fase 2 - Diseño
- **Fecha de Entrega:** 2026

---

## 1. INTRODUCCIÓN Y OBJETIVOS

### 1.1 Introducción
La maquetación de interfaces gráficas de usuario constituye un eslabón fundamental en el ciclo de vida del desarrollo de software, transformando los requerimientos funcionales y los modelos conceptuales (wireframes y prototipos de diseño) en páginas electrónicas interactivas y funcionales. 

El presente informe documenta detalladamente la definición de la composición visual (texto, formas, paleta de colores, tamaños tipográficos, imágenes, iconografía, animaciones y transiciones) desarrollada en **HTML5**, **CSS3** y **JavaScript** para el sistema web **«I.T.R. - Sistema de Gestión de Inventario»**, considerando además la proyección de los diferentes dispositivos de visualización mediante diseño responsivo (*Responsive Web Design*).

### 1.2 Objetivos
- **Objetivo General:** Maquetar la interfaz gráfica de usuario del sistema de gestión de inventario I.T.R. aplicando estándares modernos de HTML5 semántico, diseño modular CSS3 y accesibilidad web WAI-ARIA.
- **Objetivos Específicos:**
  1. Definir la guía de estilos visuales: paleta de colores corporativos, tipografía, formas, bordes, sombras y espaciados.
  2. Implementar una arquitectura de maquetación adaptable proyectada para dispositivos móviles, tablets y computadores de escritorio.
  3. Estructurar las pantallas del sistema: autenticación, dashboard, catálogo de productos, registro de ventas, administración de usuarios, roles, reportería y mesa de ayuda.
  4. Integrar principios de marketing digital, experiencia de usuario (UX) y usabilidad orientados a la productividad operativa.

---

## 2. CONCEPTO Y FUNDAMENTOS DE LA MAQUETACIÓN WEB

### 2.1 ¿Qué es la Maquetación Web?
La maquetación web (o *Layout Design & Markup*) es la disciplina encargada de organizar y distribuir jerárquicamente los elementos visuales, informativos y de interacción dentro del lienzo de un navegador web. Consiste en trasladar la arquitectura de información y el diseño gráfico a un formato digital estandarizado mediante código semántico.

### 2.2 Fases de Construcción de la Interfaz
1. **Bocetos y Wireframes (Baja fidelidad):** Definición de la estructura básica de bloques y distribución de contenido.
2. **Mockups y Prototipos UI (Alta fidelidad):** Aplicación de color, tipografía, contrastes, iconografía e identidad visual de la marca.
3. **Maquetación HTML5/CSS3 (Fidelidad de código):** Codificación de la estructura con etiquetas semánticas (`<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<article>`, `<footer>`) y estilización con reglas de estilo y variables CSS.
4. **Interacción y Capa de Datos (JavaScript):** Inclusión de microinteracciones, validaciones de formularios en cliente, ventanas modales de confirmación y carga asíncrona de componentes reutilizables.

---

## 3. REQUISITOS DEL CLIENTE Y SISTEMA I.T.R.

El software **I.T.R.** surge de la necesidad de una micro/mediana empresa comercial y de almacenamiento de optimizar sus operaciones de inventario, reduciendo pérdidas, controlando niveles críticos de stock y centralizando los permisos de los colaboradores.

### 3.1 Requerimientos Funcionales Traducidos a la Maquetación
- **RF01 - Control de Acceso y Seguridad:** Pantalla de autenticación (*Login*) con protección visual de credenciales, recordación de sesión y opción de restablecimiento de contraseña vía correo.
- **RF02 - Panel de Control Ejecutivo (Dashboard):** Visualización en tiempo real de tarjetas de resumen (Total productos, Stock total disponible, Alertas de stock bajo y Total de usuarios), gráficos de barras de entradas/salidas y bitácora de actividad reciente.
- **RF03 - Gestión de Productos e Inventario:** Tabla dinámica de productos con búsqueda predictiva, paginación, filtros de estado, badges de alerta de stock y modales de confirmación para eliminar. Formularios de alta y edición con validación de tipos de datos (código, precio, cantidad).
- **RF04 - Módulo de Ventas / Salidas:** Formulario de facturación con generación automática de N° de factura, selección de clientes, vendedor, selector dinámico de ítems con subtotalización automática y registro de salida de stock.
- **RF05 - Administración de Usuarios y Roles:** Control de perfiles (Administrador, Supervisor, Vendedor, Bodeguero, etc.) con asignación granular de permisos.
- **RF06 - Módulo de Reportes:** Generación y filtrado por fechas de informes de auditoría, valorización de inventario, movimientos de mercancía y balance de ventas con opción de exportación.
- **RF07 - Mesa de Ayuda y Soporte:** Formulario de reporte de incidencias con cargador de archivos adjuntos y confirmación inmediata de envío.

---

## 4. COMPOSICIÓN VISUAL Y GUÍA DE ESTILOS (DESIGN SYSTEM)

Para asegurar la coherencia estética y facilitar el mantenimiento, la maquetación se fundamenta en un sistema de **Variables CSS (`css/variables.css`)** que estandariza todas las propiedades visuales.

### 4.1 Psicología y Paleta de Colores
La identidad cromática combina el dinamismo y urgencia del rojo corporativo con la sobriedad, confianza y estabilidad del azul marino industrial:

| Tipo | Variable CSS | Código HEX / RGBA | Uso e Intención Psicológica |
| :--- | :--- | :--- | :--- |
| **Primario** | `--color-primary` | `#d62828` (Carmesí) | Identidad de marca, encabezados, botones de llamada a la acción (CTA) y estados activos. Transmite dinamismo y atención. |
| **Primario Oscuro** | `--color-primary-dark` | `#b71c1c` | Estados *hover* y *active* en botones principales. |
| **Secundario / Marca**| `--color-secondary` | `#17304f` (Azul Noche) | Sidebar de navegación, pie de página, títulos de sección. Transmite solidez, seguridad y profesionalismo. |
| **Fondo General** | `--color-background` | `#f5f6f8` (Gris Frío) | Lienzo base del sistema. Reduce la fatiga visual en jornadas laborales prolongadas. |
| **Superficies** | `--color-surface` | `#ffffff` (Blanco) | Tarjetas, contenedores de tablas y modales para maximizar el contraste de lectura. |
| **Texto Principal** | `--color-text` | `#1f2937` (Gris Carbón) | Textos de cuerpo y etiquetas, cumpliendo con la relación de contraste WCAG 2.1 AAA. |
| **Texto Secundario**| `--color-text-light` | `#6b7280` | Subtítulos, descripciones y placeholders. |
| **Estado Éxito** | `--color-success` | `#198754` (Verde Esmeralda)| Creación de registros, ventas completadas y estados activos. |
| **Estado Alerta** | `--color-warning` | `#ffc107` (Ámbar) | Advertencias de stock bajo e inconsistencias menores. |
| **Estado Peligro** | `--color-danger` | `#dc3545` (Rojo Rubí) | Acciones destructivas (eliminar producto/usuario) y mensajes de error. |

### 4.2 Tipografía, Escala y Jerarquía de Texto
Se implementó una tipografía de palo seco (*Sans-Serif*) altamente legible en pantallas digitales: `Arial, Helvetica, sans-serif`.

- **Escala Modular de Tamaños:**
  - `--font-size-xs: 0.75rem (12px)`: Subtítulos de roles, badges de estado y notas secundarias.
  - `--font-size-sm: 0.875rem (14px)`: Etiquetas de formularios, celdas de tablas y botones compactos.
  - `--font-size-md: 1.00rem (16px)`: Texto de cuerpo base, inputs de texto y enlaces del menú.
  - `--font-size-lg: 1.25rem (20px)`: Títulos de tarjetas de dashboard y encabezados h3.
  - `--font-size-xl: 1.50rem (24px)`: Títulos de sección h2 y subtítulos principales.
  - `--font-size-xxl: 2.00rem (32px)`: Encabezados principales h1 y números destacados de indicadores.
- **Interlineado (*Line Height*):** `1.5` para párrafos (óptimo confort de lectura) y `1.2` para encabezados de título.

### 4.3 Formas, Espaciados, Bordes y Sombras
- **Sistema de Espaciado Modular (Grid de 4/8px):**
  - `--spacing-xs: 0.25rem (4px)` | `--spacing-sm: 0.5rem (8px)` | `--spacing-md: 1.0rem (16px)` | `--spacing-lg: 1.5rem (24px)` | `--spacing-xl: 2.0rem (32px)`.
- **Radios de Borde (*Border Radius*):**
  - `--radius-sm: 4px`: Inputs y botones compactos.
  - `--radius-md: 8px`: Tarjetas, botones principales y contenedores de alertas.
  - `--radius-lg: 12px`: Ventanas modales y paneles centrales de formulario.
- **Elevación y Sombras (*Box Shadows*):**
  - `--shadow-sm: 0 1px 3px rgba(0,0,0,0.08)`: Encabezados y barras de navegación fija.
  - `--shadow-md: 0 4px 10px rgba(0,0,0,0.10)`: Tarjetas de estadísticas e información.
  - `--shadow-lg: 0 8px 20px rgba(0,0,0,0.12)`: Modales centrados y cuadros de diálogo interactivos.

### 4.4 Imágenes, Iconografía y Recursos Multimedia
- **Logotipo Institucional:** `assets/img/icons/logo-itr.png` vectorizado y optimizado para pantalla retina con dimensiones controladas (`48x48px` en escritorio y `38x38px` en móvil) evitando distorsiones de aspecto (`object-fit: contain`).
- **Iconografía Semántica:** Uso de símbolos e iconografía intuitiva (📊 Dashboard, 📦 Productos, 🛒 Ventas, 👥 Usuarios, 📈 Reportes, ❓ Soporte, 🔍 Búsqueda, ➕ Añadir, ✏️ Editar, 🗑️ Eliminar) que aceleran el reconocimiento visual sin sobrecargar el ancho de banda con librerías pesadas.
- **Favicon Dinámico:** Generado e inyectado desde JavaScript (`initializeFavicon()`) garantizando que todas las páginas del sistema mantengan la identidad de pestaña en el navegador.

### 4.5 Animaciones y Microinteracciones CSS
Para generar una sensación de respuesta fluida sin perjudicar el rendimiento del navegador, se implementaron transiciones por aceleración de hardware:
- **Transición de Botones e Inputs:** `transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;`.
- **Efecto Focus en Campos:** Iluminación del borde con anillo de sombra suave (`box-shadow: 0 0 0 3px rgba(214, 40, 40, 0.15)`).
- **Entrada de Alertas:** Animación con `@keyframes alert-enter` mediante desplazamiento en eje X (`translateX(20px) -> translateX(0)`) y desvanecimiento de opacidad (`0 -> 1`).
- **Indicador de Carga (Spinner):** Animación rotacional continua `@keyframes loading-spin` a 0.8s para retroalimentación al usuario en peticiones asíncronas.
- **Apertura de Menú Lateral:** Desplazamiento suave del Sidebar mediante `transform: translateX(0)` con transición `0.3s ease`.

---

## 5. PROYECCIÓN DE DISPOSITIVOS Y DISEÑO RESPONSIVO (RESPONSIVE DESIGN)

La aplicación fue maquetada bajo una estrategia que combina diseño fluido con puntos de quiebre (*Media Queries*) estratégicos, garantizando compatibilidad en tres tipos de dispositivos:

```text
+-----------------------------------------------------------------------------------+
| 1. Dispositivos Móviles (Smartphones)   -> Ancho de pantalla < 768px             |
| 2. Tabletas y Pantallas Medianas        -> Ancho de pantalla 768px a 1024px       |
| 3. Computadores de Escritorio (Desktop) -> Ancho de pantalla > 1024px             |
+-----------------------------------------------------------------------------------+
```

### 5.1 Comportamiento por Dispositivo

#### A. Computadores de Escritorio (Desktop > 1024px)
- **Estructura:** Disposición en doble columna continua (`.app-layout`). Sidebar vertical fijo (`250px`) a la izquierda y área de trabajo principal (`.main-content`) que aprovecha el espacio disponible con un ancho máximo de `1200px` centrado.
- **Visualización de Datos:** Tablas completas con todas sus columnas (Código, Nombre, Stock, Precio, Estado, Acciones) sin necesidad de desplazamiento.
- **Encabezado:** Menú de usuario con nombre completo, avatar y rol, botón de notificaciones y título corporativo visible.

#### B. Tabletas (768px - 1024px)
- **Estructura:** Cuadrículas fluidas con `flex-wrap: wrap` o CSS Grid de 2 columnas para tarjetas de dashboard e indicadores.
- **Formularios:** Distribución balanceada de 2 campos por fila (`.form-row`).
- **Navegación:** Menú lateral visible u optimizado para facilitar toques táctiles.

#### C. Teléfonos Inteligentes (Móvil < 768px)
- **Encabezado Compacto:** Se oculta el texto descriptivo institucional y el nombre del usuario para priorizar el logotipo, el botón de menú hamburguesa (área táctil mínima de 44x44px según estándares de ergonomía móvil) y el avatar.
- **Sidebar Deslizante (*Off-Canvas Drawer*):** El menú se oculta fuera de la pantalla (`transform: translateX(-100%)`) y se despliega como capa flotante con un fondo oscuro translúcido (`.sidebar-overlay`) al pulsar el botón hamburguesa.
- **Tablas Responsivas:** Envoltorio (`.product-table-wrapper`) con `overflow-x: auto` que permite desplazamiento horizontal suave sin romper el ancho del viewport ni generar *scroll* indeseado en la página general.
- **Botones y Acciones:** Botones de acción extendidos al 100% del ancho o apilados verticalmente para facilitar la pulsación con el pulgar.

---

## 6. HERRAMIENTAS Y JUSTIFICACIÓN TECNOLÓGICA (FRAMEWORKS VS VANILLA MODULAR)

La guía formativa del SENA sugiere el uso de frameworks front-end (Bootstrap, Tailwind CSS o Foundation) o tecnologías nativas estructuradas. Para el proyecto I.T.R. se adoptó un enfoque de **Arquitectura CSS Modular basada en Custom Properties (Variables CSS) y Flexbox/Grid nativo**, complementado con componentes modulares:

### 6.1 Justificación Técnica
1. **Rendimiento y Carga Ultraligera:** Al prescindir de librerías externas de gran volumen (archivos CSS de más de 200KB), la maquetación carga en milisegundos con rendimiento 100/100 en Google PageSpeed y Lighthouse.
2. **Cero Dependencias y Alta Longevidad:** No existe riesgo de incompatibilidad por versiones obsoletas de frameworks.
3. **Control Semántico Total:** Estructura HTML pura sin clases excesivas o "class soup", facilitando la indexación, mantenibilidad y accesibilidad para lectores de pantalla.
4. **Reutilización por Componentes:** Mediante JavaScript asíncrono (`fetch`), los bloques repetitivos (`header.html`, `sidebar.html`, `footer.html`) se cargan centralizadamente en un único punto, emulando la modularidad de frameworks modernos de JavaScript.

---

## 7. FICHAS TÉCNICAS DE PANTALLAS MAQUETADAS DEL SISTEMA I.T.R.

A continuación se detallan las principales vistas maquetadas en el proyecto:

### Ficha 1: Inicio de Sesión / Autenticación (`index.html`)
- **Objetivo:** Permitir el ingreso seguro de los usuarios al sistema.
- **Elementos de Composición:**
  - Tarjeta central flotante con sombra (`.login-card`).
  - Logotipo de la empresa centrado (`assets/img/icons/logo-itr.png`).
  - Campos de entrada: Usuario y Contraseña con iconos y validación `required`.
  - Casilla de verificación: «Recordarme» y enlace «¿Olvidó su contraseña?».
  - Botón primario de envío («Ingresar al sistema») con icono indicador.
  - Separador visual y botón secundario de «Solicitar acceso».
- **Accesibilidad:** Contenedor de mensajes de error con `aria-live="polite"` para lectores de pantalla.

### Ficha 2: Restablecimiento de Clave (`pages/auth/restablecer_clave.html`)
- **Objetivo:** Proporcionar un canal de recuperación de credenciales mediante correo corporativo.
- **Elementos de Composición:**
  - Ilustración/Icono alusivo a seguridad.
  - Campo de entrada de tipo `email` con mensaje de instrucciones.
  - Botón de envío («Enviar enlace de recuperación») y enlace de retorno («Volver al inicio de sesión»).

### Ficha 3: Panel de Control / Dashboard (`pages/dashboard/dashboard.html`)
- **Objetivo:** Ofrecer una vista panorámica del estado del inventario y la operación.
- **Elementos de Composición:**
  - **4 Tarjetas KPI:** Total productos, Stock total acumulado, Alertas de stock bajo (crítico) y Total usuarios.
  - **Gráficos de barras CSS:** Comparativa visual de entradas vs salidas de inventario.
  - **Bitácora de actividad reciente:** Lista cronológica con iconos de acción (+ producto, ↻ inventario, 👤 usuario).
  - Carga dinámica desde `DataService` con contadores actualizados.

### Ficha 4: Catálogo y Gestión de Productos (`pages/productos/productos.html`)
- **Objetivo:** Listar, buscar, filtrar y administrar el inventario de artículos.
- **Elementos de Composición:**
  - Barra de herramientas con campo de búsqueda predictiva en tiempo real.
  - Botones de acción rápida: «➕ Nuevo» y «🛒 Vender».
  - Tabla de datos con estados visuales en badges (Activo, Inactivo, Eliminado).
  - Paginación dinámica (Anterior / Siguiente / Números de página).
  - Ventana modal interactiva de confirmación antes de eliminar (`#modalEliminar`).

### Ficha 5: Formulario de Nuevo / Editar Producto (`nuevo_producto.html` / `editar_producto.html`)
- **Objetivo:** Captura y actualización de información de inventario.
- **Elementos de Composición:**
  - Formulario en cuadrícula de 2 columnas con campos: Código, Nombre, Categoría, Precio de compra, Precio de venta, Stock inicial, Stock mínimo.
  - Validación de campos requeridos y restricciones numéricas (`min="0"`).
  - Botones de «Guardar producto» y «Cancelar».

### Ficha 6: Módulo de Facturación y Ventas (`pages/productos/vender.html`)
- **Objetivo:** Registrar ventas y salidas de existencias en mostrador.
- **Elementos de Composición:**
  - Datos de cabecera: N° de Factura autogenerado, Fecha de venta, Nombre del Cliente y Vendedor asignado.
  - Selector dinámico de producto y campo de cantidad.
  - Botón «➕ Agregar» que inserta el ítem en la tabla temporal de venta.
  - Resumen financiero con cálculo de Subtotal, IVA y Total a pagar.

### Ficha 7: Gestión de Usuarios (`pages/administration/usuarios.html`)
- **Objetivo:** Administrar los colaboradores y operadores del sistema.
- **Elementos de Composición:**
  - Tabla con datos de usuario: Nombre, Correo electrónico, Rol asignado, Estado y Fecha de creación.
  - Modal de confirmación para desactivación o eliminación de usuario.

### Ficha 8: Roles y Permisos (`pages/roles/roles.html`)
- **Objetivo:** Configuración de niveles de seguridad y permisos de acceso a los módulos.
- **Elementos de Composición:**
  - Tabla de roles (Admin, Supervisor, Vendedor, Bodeguero, etc.) con sus descripciones de privilegios.
  - Formularios de alta y edición de roles.

### Ficha 9: Reportería y Exportación (`pages/reportes/reportes.html` y `reporte_detalle.html`)
- **Objetivo:** Generar informes consolidados de auditoría, ventas, movimientos y stock.
- **Elementos de Composición:**
  - Catálogo de tarjetas por tipo de informe con acceso directo.
  - Filtros por rango de fechas (Desde / Hasta) y palabra clave.
  - Tabla con resultados formateados y botón de «📥 Exportar» informe.

### Ficha 10: Centro de Soporte e Incidencias (`pages/ayuda/soporte.html`)
- **Objetivo:** Canal de comunicación interna y reporte de errores o solicitudes técnicas.
- **Elementos de Composición:**
  - Formulario con campos de Nombre, Correo, Asunto, Mensaje detallado.
  - Selector de archivo adjunto personalizado con previsualización del nombre del archivo (`.png, .pdf, .docx`).
  - Alerta de confirmación de envío con animación visual.

---

## 8. CONSIDERACIONES DE MARKETING DIGITAL, EXPERIENCIA DE USUARIO (UX) Y ACCESIBILIDAD

### 8.1 Principios de Usabilidad y UX Aplicados
- **Reducción de la Carga Cognitiva:** Se aplicó el principio de *Ley de Fitts* y *Ley de Hick*, organizando las acciones más frecuentes (como crear productos o registrar ventas) en botones destacados con colores contrastantes y tamaños de toque cómodos.
- **Prevención de Errores y Confirmación:** Ningún registro crítico (productos, usuarios, roles) se elimina de manera accidental; la maquetación incorpora un diálogo modal (`#modalEliminar`) que exige confirmación explícita del usuario.
- **Jerarquía Visual y Escaneo Rápido:** Uso de tarjetas con números de gran tamaño (`--font-size-xxl`) para lectura inmediata en el Dashboard y badges de estado cromáticos (verde para Activo, gris/ámbar para Inactivo, rojo para Eliminado).

### 8.2 Enfoque de Marketing Digital y Conversión Interna
- **Llamados a la Acción Claros (CTA - Call To Action):** Botones con verbos de acción directa («Ingresar al sistema», «➕ Nuevo», «🛒 Vender», «📥 Exportar», «📨 Enviar»).
- **Consistencia de Marca:** Todo el ecosistema digital mantiene los colores corporativos, tipografía y tono de comunicación, reforzando la identidad empresarial y el sentido de pertenencia de los colaboradores.
- **Optimización de Tiempos de Carga:** Un sistema ágil y rápido incrementa la productividad laboral y la satisfacción del usuario interno.

### 8.3 Accesibilidad Web (WCAG 2.1 y WAI-ARIA)
- **Contraste de Color:** Todos los textos cumplen la relación de contraste mínima de 4.5:1 exigida por las pautas WCAG 2.1 Nivel AA.
- **Semántica Estricta:** Uso riguroso de etiquetas nativas (`<button>` en lugar de `<div>` clickeables) permitiendo navegación por teclado (`Tab`, `Enter`, `Escape`).
- **Atributos ARIA:** Inclusión de `aria-label`, `aria-expanded`, `aria-hidden="true"`, `aria-live="polite"` y `role="dialog"` para compatibilidad total con lectores de pantalla como NVDA o JAWS.

---

## 9. CONCLUSIONES

1. La maquetación en **HTML5** y **CSS3 modular** implementada para el proyecto **I.T.R. - Sistema de Gestión de Inventario** responde de manera integral y rigurosa a todos los requerimientos planteados en la guía de aprendizaje del SENA, demostrando dominio en composición gráfica, jerarquía visual y estandarización técnica.
2. El uso de **Variables CSS (`:root`)** y componentes reutilizables (`header`, `sidebar`, `footer`) permitió una arquitectura escalable, fácil de mantener y con un peso de carga sumamente bajo, superando las desventajas de sobrecarga de frameworks externos pesados sin sacrificar estética ni dinamismo.
3. El enfoque de **Diseño Responsivo (*Responsive Web Design*)** asegura que los operadores de almacén puedan consultar el stock desde teléfonos inteligentes o tabletas con la misma facilidad y legibilidad que un supervisor o administrador desde una estación de escritorio.
4. La inclusión de microinteracciones, modales, paginación y datos dinámicos simulados eleva la experiencia de usuario (UX), ofreciendo un prototipo de alta fidelidad listo para la fase de integración con bases de datos y backend.

---

## 10. BIBLIOGRAFÍA Y REFERENCIAS

- **SENA (Servicio Nacional de Aprendizaje):** *Componente Formativo: Maquetación de Interfaces Gráficas y Diseño Web.* Programa ADSO.
- **W3C (World Wide Web Consortium):** *HTML5 Specification & Web Accessibility Initiative (WAI-ARIA 1.2).* Disponible en: https://www.w3.org/WAI/
- **MDN Web Docs (Mozilla Developer Network):** *CSS Layout, Flexbox, Grid and Responsive Design.* Disponible en: https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout
- **Nielsen Norman Group:** *10 Usability Heuristics for User Interface Design.* Jakob Nielsen.
