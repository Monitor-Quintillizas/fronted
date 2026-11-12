# Módulo Frontend - Monitor Quintillizas

## Single Page Application (SPA) en React 19 + Vite + Tailwind CSS
**Carrera:** Ingeniería en Sistemas Computacionales (5to Semestre)  
**Asignatura:** Programación Web / Sistemas Distribuidos  
**Proyecto:** Monitor Quintillizas (Panel Web de Monitoreo y Telemetría en Tiempo Real)  
**Repositorio Oficial:** [https://github.com/Monitor-Quintillizas/fronted](https://github.com/Monitor-Quintillizas/fronted)

---

## 1. Descripción del Módulo Frontend

El frontend es la capa de presentación interactiva con la que interactúa el operador. Desarrollada como una Single Page Application (SPA) con **React 19** y **Vite**, se comunica con el backend PHP mediante servicios centralizados de **Redux Toolkit / RTK Query** y **Axios**, garantizando que toda la información provenga de la API sin datos simulados o fijos en el código.

La interfaz implementa un diseño profesional y minimalista de bordes cuadrados (`rounded-none`) inspirado en el **Administrador de Tareas de Windows 11**, integrando fondos temáticos de telemetría de alta resolución con desenfoque de fondo y paletas de color especializadas (Rojo para CPU, Azul para Memoria, Verde para Almacenamiento, Ámbar para Red y Púrpura para GPU).

---

## 2. Tecnologías y Herramientas Empleadas

- **Librería UI:** React 19 (`react`, `react-dom`).
- **Gestión de Estado Global y Caché:** Redux Toolkit & RTK Query (`@reduxjs/toolkit`, `react-redux`).
- **Entorno de Construcción y Servidor Dev:** Vite 8 (HMR ultrarrápido).
- **Linter de Alto Rendimiento:** Oxlint.
- **Enrutador Declarativo:** React Router DOM 7.
- **Cliente HTTP Centralizado:** Axios y endpoints declarativos con RTK Query.
- **Librería de Gráficas de Series Temporales:** Recharts (Áreas con degradados neón e interpolación fluida).
- **Iconografía:** Lucide React Icons.
- **Estilos:** Tailwind CSS v4 con tokens minimalistas de alto contraste.
- **Contenedorización:** Docker multi-etapa con servidor web Nginx Alpine.

---

## 3. Estructura del Código Fuente

```text
front/
├── public/
│   ├── backgrounds/            # Wallpapers de alta resolución en segundo plano
│   │   ├── quintuplets_master.jpg
│   │   ├── itsuki_cpu.jpg
│   │   ├── miku_ram.jpg
│   │   ├── yotsuba_disk.jpg
│   │   ├── ichika_net.jpg
│   │   └── nino_gpu.jpg
│   ├── favicon.svg             # Favicon del sistema
│   └── icons.svg
├── src/
│   ├── Alerts/                 # Módulo de Alertas (Issue #5)
│   │   ├── components/         # Solo JSX: ThresholdTable, ThresholdModal, DeleteThresholdModal, StatusMessage
│   │   ├── containers/         # AlertsContainer.jsx (orquesta lógica con presentación)
│   │   ├── utils/              # useAlerts.js (RTK Query, estado de formularios y handlers)
│   │   └── styles/
│   ├── app/                    # Store centralizado de Redux Toolkit
│   │   └── store.js
│   ├── components/             # Componentes compartidos del sistema
│   │   └── ProtectedRoute.jsx  # Guardia de autenticación para rutas privadas
│   ├── context/
│   │   └── AuthContext.jsx     # Contexto global de sesión, usuario autenticado y login/logout
│   ├── Dashboard/              # Módulo de Rendimiento / Dashboard (Issue #4)
│   │   ├── components/         # Solo JSX: AlertBanner, DashboardHeader, ComponentList, ComponentDetail,
│   │   │                       # ComponentChart, ComponentSpecs, MetricCard, CardsView, WallpaperBackground
│   │   ├── containers/         # DashboardContainer.jsx (orquesta telemetría y vistas)
│   │   ├── utils/              # useDashboard.js, useMetrics.js, componentsConfig.js, formatUptime.js,
│   │   │                       # specsConfig.js, metricHelpers.js
│   │   └── styles/
│   ├── features/               # Slices de Redux
│   │   └── authSlice.js
│   ├── History/                # Módulo de Historial (Issue #4)
│   │   ├── components/         # Solo JSX: HistoryFilters, HistoryKpis, HistoryChart, HistoryTable, HistoryEmpty
│   │   ├── containers/         # HistoryContainer.jsx (orquesta consultas cronológicas)
│   │   ├── utils/              # useHistory.js, historyHelpers.js (fechas por defecto, formateo y KPIs)
│   │   └── styles/
│   ├── Login/                  # Módulo de Inicio de Sesión y Registro (Issue #3)
│   │   ├── components/         # Solo JSX: LoginForm, RegisterForm, ModeSelector, FormMessage, LoginHeader, LoginFooter
│   │   ├── containers/         # LoginContainer.jsx (orquesta formulario dual y autenticación)
│   │   ├── utils/              # useLogin.js, useRegister.js, useLoginMode.js, validaciones.js
│   │   └── styles/
│   ├── Navbar/                 # Módulo de Barra de Navegación (Issue #5)
│   │   ├── components/         # Solo JSX: Navbar, HostSelector, ProfileMenu, DeleteAccountModal
│   │   ├── containers/         # NavbarContainer.jsx (conecta sesión, rutas y selector de hosts)
│   │   ├── utils/              # useNavbar.js, useHostSelector.js
│   │   └── styles/
│   ├── services/               # Endpoints RTK Query y servicios HTTP
│   │   ├── api.js              # Instancia base de Axios con interceptor
│   │   ├── authApi.js          # RTK Query para auth, usuarios y eliminación
│   │   ├── authService.js      # Servicios auxiliares de autenticación
│   │   ├── metricsApi.js       # RTK Query para telemetría y hosts
│   │   ├── metricsService.js   # Servicios de métricas
│   │   ├── thresholdsApi.js    # RTK Query para CRUD de umbrales
│   │   └── thresholdsService.js# Servicios de umbrales
│   ├── Users/                  # Módulo de Cuentas y Rendimiento (Issue #5)
│   │   ├── components/         # Solo JSX: UsersSummary, UsersTable, UserRow, UsersNotifications, DeleteUserModal
│   │   ├── containers/         # UsersContainer.jsx (orquesta telemetría de cuentas y modales)
│   │   ├── utils/              # useUsers.js (RTK Query, cálculo de barras CPU/RAM y handlers)
│   │   └── styles/
│   ├── App.jsx                 # Declaración y distribución de rutas SPA
│   ├── main.jsx                # Punto de entrada y montaje en el DOM con Provider de Redux
│   └── index.css               # Estilos globales y utilidades de Tailwind CSS
├── .env                        # Variables de entorno activas
├── .env.example                # Plantilla de variables de entorno requeridas
├── .gitignore                  # Exclusión de node_modules y artefactos de compilación
├── Dockerfile                  # Manifiesto de compilación multi-etapa para producción
├── nginx.conf                  # Servidor Nginx para enrutamiento SPA
├── package.json                # Dependencias y scripts de construcción
└── vite.config.js              # Configuración de compilación Vite con plugin Tailwind
```

---

## 4. Reorganización Modular y Arquitectura de Componentes (Issues #3, #4 y #5)

El frontend ha sido completamente refactorizado bajo el patrón **Contenedor / Presentacional (Container / Presentational Pattern)** en tres fases incrementales. Las carpetas `src/pages/` y `src/hooks/` fueron eliminadas por completo, centralizando cada funcionalidad en su propio módulo independiente.

### Principios Fundamentales de Diseño:
1. **Ningún archivo `.jsx` contiene lógica de negocio:** Ningún componente visual utiliza `useState`, `useEffect`, `useCallback`, hooks de RTK Query, `useAuth`, `useNavigate` ni validaciones. Los componentes visuales reciben exclusivamente datos por `props` y emiten eventos a través de callbacks.
2. **Ningún archivo `.js` contiene JSX:** Los custom hooks y utilidades concentran el estado, las consultas reactivas y los cálculos matemáticos, retornando objetos planos de JavaScript sin etiquetas ni Virtual DOM.
3. **Límite estricto de tamaño:** Ningún componente nuevo del Dashboard excede las 120 líneas de código, garantizando alta legibilidad y modularidad.
4. **Cálculos fuera de la vista:** Operaciones de derivación de datos (porcentajes de barras de CPU/RAM, tiempo de actividad formateado, configuración de pestañas) se ejecutan en los hooks/utilidades antes de renderizar.

---

### Resumen de las 3 Actividades Implementadas:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA DE FLUJO DE DATOS DEL FRONTEND              │
│                                                                             │
│    Backend PHP (API)  <───  RTK Query / Redux Store                         │
│                                      │                                      │
│                                      ▼                                      │
│               [ utils/use*.js ]  (Lógica pura en JS)                        │
│               - Estados (useState, useEffect, useCallback)                  │
│               - Consultas y Mutaciones RTK Query                            │
│               - Handlers, Validaciones y Cálculos                           │
│                                      │                                      │
│                                      ▼                                      │
│            [ containers/*Container.jsx ]  (Orquestador)                     │
│            - Invoca los hooks de utils/                                     │
│            - Conecta la sesión / navegación                                  │
│            - Distribuye props a los componentes                             │
│                                      │                                      │
│               ┌──────────────────────┴──────────────────────┐               │
│               ▼                                             ▼               │
│     [ components/ComponentA.jsx ]                 [ components/Modal.jsx ]  │
│     (Solo JSX presentacional)                     (Solo JSX presentacional) │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Actividad 1 (Issue #3) – Inicio de Sesión y Registro (`src/Login/`)
- **Problema previo:** `Login.jsx` (406 líneas) concentraba inicio de sesión y registro, 10 estados de React, validaciones y peticiones en un solo archivo.
- **Solución implementada:**
  - `src/Login/utils/`: `validaciones.js` (validaciones reutilizables), `useLogin.js` (formulario de login), `useRegister.js` (formulario de registro con RTK Query) y `useLoginMode.js` (alternancia entre pestañas).
  - `src/Login/components/`: `LoginForm.jsx`, `RegisterForm.jsx`, `ModeSelector.jsx`, `FormMessage.jsx`, `LoginHeader.jsx`, `LoginFooter.jsx`.
  - `src/Login/containers/LoginContainer.jsx`: Orquestador montado en `/login`.

#### Actividad 2 (Issue #4) – Dashboard e Historial (`src/Dashboard/` y `src/History/`)
- **Problema previo:** `Dashboard.jsx` (653 líneas) y `History.jsx` (340 líneas) acumulaban consultas en tiempo real, buffers de telemetría, gráficas Recharts y tablas sin separación de capas.
- **Solución implementada para Dashboard:**
  - `src/Dashboard/utils/`: `useDashboard.js` (estado de vista, pestaña activa y host), `useMetrics.js` (buffer de telemetría de 30 puntos), `componentsConfig.js` (configuración de hardware), `formatUptime.js` (formato de tiempo activo), `specsConfig.js` (especificaciones técnicas), `metricHelpers.js` (validación de porcentajes y temas).
  - `src/Dashboard/components/`: `AlertBanner.jsx` (44 lín.), `CardsView.jsx` (53 lín.), `ComponentChart.jsx` (61 lín.), `ComponentDetail.jsx` (53 lín.), `ComponentList.jsx` (82 lín.), `ComponentSpecs.jsx` (26 lín.), `DashboardHeader.jsx` (73 lín.), `MetricCard.jsx` (92 lín.), `WallpaperBackground.jsx` (15 lín.).
  - `src/Dashboard/containers/DashboardContainer.jsx`: Montado en `/`.
- **Solución implementada para Historial:**
  - `src/History/utils/`: `useHistory.js` (consulta RTK Query, validación cronológica y estados), `historyHelpers.js` (rango de fechas por defecto, formateo de curvas y KPIs).
  - `src/History/components/`: `HistoryFilters.jsx`, `HistoryKpis.jsx`, `HistoryChart.jsx`, `HistoryTable.jsx`, `HistoryEmpty.jsx`.
  - `src/History/containers/HistoryContainer.jsx`: Montado en `/history`.
  - Eliminación de `MetricChart.jsx` sin uso.

#### Actividad 3 (Issue #5) – Alertas, Usuarios y Barra de Navegación (`src/Alerts/`, `src/Users/`, `src/Navbar/`)
- **Problema previo:** `Alerts.jsx` (496 líneas) y `Users.jsx` (412 líneas) gestionaban modales, mutaciones destructivas y cálculos de barras dentro de JSX. `Navbar.jsx` y `HostSelector.jsx` mezclaban navegación y consultas.
- **Solución implementada para Navbar:**
  - `src/Navbar/utils/`: `useNavbar.js` (sesión, menú de perfil y auto-eliminación), `useHostSelector.js` (consulta de hosts y selector).
  - `src/Navbar/components/`: `Navbar.jsx`, `HostSelector.jsx`, `ProfileMenu.jsx`, `DeleteAccountModal.jsx`.
  - `src/Navbar/containers/NavbarContainer.jsx`: Consumido por todos los contenedores.
- **Solución implementada para Alertas:**
  - `src/Alerts/utils/useAlerts.js`: RTK Query con 4 operaciones CRUD y tags de invalidación de caché.
  - `src/Alerts/components/`: `ThresholdTable.jsx`, `ThresholdModal.jsx`, `DeleteThresholdModal.jsx`, `StatusMessage.jsx`.
  - `src/Alerts/containers/AlertsContainer.jsx`: Montado en `/alerts`.
- **Solución implementada para Usuarios:**
  - `src/Users/utils/useUsers.js`: Sondeo de telemetría por usuario cada 4s, cálculo previo de porcentajes y clases de barras de CPU y RAM (`Math.min(100, ...)`).
  - `src/Users/components/`: `UsersSummary.jsx`, `UsersTable.jsx`, `UserRow.jsx`, `UsersNotifications.jsx`, `DeleteUserModal.jsx`.
  - `src/Users/containers/UsersContainer.jsx`: Montado en `/users`.
- **Limpieza final:** Eliminación de `src/pages/`, `src/hooks/`, `src/App.css`, `src/styles/App.css`, `src/styles/quintillizas.css` e `src/components/Icons.jsx`.

---

## 5. Pantallas del Sistema y Funcionalidades

### 1. Pantalla de Inicio de Sesión (`src/Login/containers/LoginContainer.jsx`)
- Formulario dual para *Iniciar Sesión* y *Crear Cuenta*.
- Validación previa de longitud mínima y campos obligatorios.
- Redirección automática tras autenticación exitosa.

### 2. Pantalla Principal / Rendimiento (`src/Dashboard/containers/DashboardContainer.jsx`)
- Telemetría en tiempo real de CPU, Memoria RAM, Almacenamiento, Ethernet y GPU.
- Gráfica móvil de 60 segundos con Recharts.
- Alternancia fluida entre vista de Administrador de Tareas y vista de Tarjetas.
- Fondo y acentos visuales dinámicos según el componente activo.

### 3. Pantalla de Historial (`src/History/containers/HistoryContainer.jsx`)
- Filtros cronológicos validados (la fecha inicial debe ser estrictamente anterior a la final).
- Tarjetas KPI con pico de CPU, promedio de RAM y volumen total de muestras.
- Gráfica de curvas históricas con selección de métrica y tabla detallada de registros.

### 4. Pantalla de Gestión de Alertas y Umbrales (`src/Alerts/containers/AlertsContainer.jsx`)
- Consulta reactiva de la tabla `THRESHOLDS` con actualización automática por invalidación de caché.
- Modales interactivos para creación, edición y eliminación confirmada de umbrales.

### 5. Panel de Cuentas y Rendimiento (`src/Users/containers/UsersContainer.jsx`)
- Supervisión periódica de cuentas activas, roles y consumo de CPU/RAM.
- Barras de progreso calculadas en la capa de lógica sin cómputo en el JSX.
- Eliminación segura de cuentas con validación de privilegios de administrador.

---

## 6. Procedimiento de Ejecución Local

### Prerrequisitos:
- Node.js versión 20.x o 22.x LTS.
- npm versión 10.x+.

### Pasos:
1. Navega al directorio del frontend:
   ```bash
   cd front
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo Vite:
   ```bash
   npm run dev
   ```
4. Abre tu navegador web en: `http://localhost:5173/`.

### Verificación de Calidad y Compilación para Producción:
```bash
# Análisis estático de código
npm run lint

# Compilación optimizada para producción
npm run build
```

---

## 7. Banco de Preguntas y Respuestas (Frontend)

1. **¿Qué es el patrón Contenedor / Presentacional y qué ventaja aporta al proyecto?**  
   *Respuesta:* Es un patrón de diseño que divide los componentes en dos categorías: los **Contenedores** (`containers/`), que se encargan de invocar hooks, conectar con el store o servicios y manejar la lógica; y los **Componentes Presentacionales** (`components/`), que solo se preocupan por cómo se ve la interfaz, recibiendo datos y funciones por props. Esto hace que las vistas sean completamente reutilizables, fáciles de probar y desacopladas de las llamadas a la red.

2. **¿Por qué ningún archivo `.jsx` debe tener llamadas directas a RTK Query o estados lógicos en esta arquitectura?**  
   *Respuesta:* Para respetar el principio de **Responsabilidad Única**. Si un componente JSX realiza consultas a la base de datos, valida datos y a la vez dibuja la interfaz, se convierte en un archivo monolítico difícil de mantener y depurar. Al sacar la lógica a hooks en `utils/`, el componente visual se vuelve declarativo y predecible.

3. **¿Qué es un componente y en qué se diferencia de una función normal?**  
   *Respuesta:* Un componente es una función reutilizable que retorna elementos de interfaz en formato JSX y participa en el ciclo de vida reactivo de React. A diferencia de una función ordinaria de JavaScript que solo ejecuta instrucciones o cálculos matemáticos, un componente se enlaza al Virtual DOM para proyectar y actualizar la interfaz visual de forma declarativa.

4. **¿Qué es el estado (`useState`) y por qué no se utiliza una variable común?**  
   *Respuesta:* Las variables estándar de JavaScript se destruyen y re-inicializan cada vez que la función del componente se ejecuta, y modificarlas no le notifica al motor de React que debe re-dibujar la pantalla. `useState` preserva el dato en memoria entre renderizados y, cuando se invoca su función modificadora (`setState`), React agenda un nuevo renderizado para actualizar la vista con el nuevo valor.

5. **¿Qué diferencia existe entre las *props* y el *estado*?**  
   *Respuesta:* Las *props* son parámetros inmutables de solo lectura enviados desde un componente padre hacia un componente hijo (flujo de datos unidireccional descendente). El *estado* es interno, mutable y administrado por el propio componente que lo declara.

6. **¿Qué es `useEffect` y para qué sirve su arreglo de dependencias?**  
   *Respuesta:* Es un Hook para ejecutar efectos secundarios (peticiones HTTP, temporizadores, suscripciones) tras la renderización del componente. Su arreglo de dependencias controla el momento de ejecución: si está vacío (`[]`), se ejecuta solo una vez al montarse el componente; si contiene variables (`[hostId]`), se vuelve a disparar cada vez que alguna de esas variables cambie de valor.

7. **¿Qué hace el `return` que se coloca dentro de un `useEffect`?**  
   *Respuesta:* Es la **función de limpieza (*cleanup function*)**. Se ejecuta inmediatamente antes de que el componente sea desmontado del DOM o antes de re-ejecutar el efecto. En el hook `useMetrics.js`, se usa `clearInterval(timer)` para apagar las peticiones periódicas y evitar fugas de memoria (*memory leaks*) en el navegador.

8. **¿Qué es una promesa y qué hace `async/await`?**  
   *Respuesta:* Una promesa es un objeto que representa la eventual finalización (exitosa o con error) de una operación asíncrona. La sintaxis `async/await` es azúcar sintáctico sobre las promesas que permite escribir código asíncrono con estructura secuencial y legible, facilitando el manejo de errores mediante bloques `try/catch`.

9. **¿Por qué las peticiones se realizan desde servicios / RTK Query y no directo en el componente?**  
   *Respuesta:* Aplica el principio de **Separación de Responsabilidades**. Centraliza la configuración de red (baseURL, cabeceras de autorización Bearer, timeouts), desacopla la capa de presentación visual de la capa de comunicación, optimiza el consumo de red mediante almacenamiento en caché reactivo y facilita el mantenimiento y escalabilidad del código.
