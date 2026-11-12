# Módulo Frontend - Monitor Quintillizas

## Single Page Application (SPA) en React 19 + Vite + Tailwind CSS
**Carrera:** Ingeniería en Sistemas Computacionales (5to Semestre)  
**Asignatura:** Programación Web / Sistemas Distribuidos  
**Proyecto:** Monitor Quintillizas (Panel Web de Monitoreo y Telemetría en Tiempo Real)  
**Repositorio Oficial:** [https://github.com/Monitor-Quintillizas/fronted](https://github.com/Monitor-Quintillizas/fronted)

---

## 1. Información General y Enlaces de la Organización

Siguiendo la organización modular requerida, el proyecto se encuentra estructurado en repositorios independientes dentro de la organización oficial de GitHub:

- **Organización en GitHub:** [https://github.com/Monitor-Quintillizas](https://github.com/Monitor-Quintillizas) ([Repositorios](https://github.com/orgs/Monitor-Quintillizas/repositories))
- **Repositorio Frontend:** [https://github.com/Monitor-Quintillizas/fronted](https://github.com/Monitor-Quintillizas/fronted)
- **Repositorio Backend:** [https://github.com/Monitor-Quintillizas/backend](https://github.com/Monitor-Quintillizas/backend)
- **Repositorio Base de Datos:** [https://github.com/Monitor-Quintillizas/BD](https://github.com/Monitor-Quintillizas/BD)

---

## 2. Descripción del Módulo Frontend

El frontend es la capa de presentación interactiva con la que interactúa el operador. Desarrollada como una Single Page Application (SPA) con **React 19** y **Vite**, se comunica con el backend PHP mediante servicios centralizados de **Redux Toolkit / RTK Query** y **Axios**, garantizando que toda la información provenga de la API sin datos simulados o fijos en el código.

La interfaz implementa un diseño profesional y minimalista de bordes cuadrados (`rounded-none`) inspirado en el **Administrador de Tareas de Windows 11**, integrando fondos temáticos de telemetría de alta resolución con desenfoque de fondo y paletas de color especializadas (Rojo para CPU, Azul para Memoria, Verde para Almacenamiento, Ámbar para Red y Púrpura para GPU).

---

## 3. Tecnologías y Herramientas Empleadas

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

## 4. Instalación y Configuración del Espacio de Trabajo

### Clonación de los Repositorios de la Organización

Puedes clonar cada módulo dentro de la carpeta principal de trabajo del proyecto:

```bash
# Crear directorio principal del proyecto
mkdir "Monitor Quintillizas"
cd "Monitor Quintillizas"

# Clonar los tres repositorios de la organización
git clone https://github.com/Monitor-Quintillizas/fronted.git front
git clone https://github.com/Monitor-Quintillizas/backend.git back
git clone https://github.com/Monitor-Quintillizas/BD.git bd
```

### Configuración de Variables de Entorno del Frontend (`front/.env`)

```bash
# Copiar plantilla base de variables de entorno
cp front/.env.example front/.env
```

*Contenido de `front/.env`:*
```env
# URL base del endpoint RESTful PHP consumida por la capa de servicios
VITE_API_URL=http://localhost:8000/services.php
```

---

## 5. Estructura del Código Fuente

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
│   ├── features/               # Slices de estado y API centralizada con RTK Query
│   │   ├── api/
│   │   │   └── apiSlice.js     # RTK Query: baseQuery dinámico, tags ('Hosts', 'Metrics', 'History', 'Alerts', 'Users')
│   │   └── auth/
│   │       └── authSlice.js    # Slice de autenticación y estado del operador
│   ├── History/                # Módulo de Historial Cronológico (Issue #4)
│   │   ├── components/         # Solo JSX: HistoryFilters, HistoryKpis, HistoryChart, HistoryTable, HistoryEmpty
│   │   ├── containers/         # HistoryContainer.jsx (orquesta filtros y series temporales)
│   │   ├── utils/              # useHistory.js, historyHelpers.js
│   │   └── styles/
│   ├── Login/                  # Módulo de Autenticación (Issue #3)
│   │   ├── components/         # Solo JSX: LoginForm, RegisterForm, AuthTabs, LoginHeader
│   │   ├── containers/         # LoginContainer.jsx (orquesta flujos de autenticación)
│   │   ├── utils/              # useLogin.js (validaciones, mutaciones y redirección)
│   │   └── styles/
│   ├── Navbar/                 # Módulo de Barra de Navegación y HostSelector (Issue #5)
│   │   ├── components/         # Solo JSX: Navbar, HostSelector, ProfileMenu, DeleteAccountModal
│   │   ├── containers/         # NavbarContainer.jsx (orquesta perfil, host activo y reloj)
│   │   ├── utils/              # useNavbar.js, useHostSelector.js
│   │   └── styles/
│   ├── services/               # Servicios tradicionales centralizados con Axios
│   │   ├── api.js              # Instancia de Axios con interceptor de Bearer Token
│   │   ├── authService.js      # Servicios de login, register, checkSession y deleteAccount
│   │   ├── metricsService.js   # Servicios de hosts, métricas y telemetría de usuarios
│   │   └── thresholdsService.js# Servicios de reglas de umbrales
│   ├── Users/                  # Módulo de Gestión de Usuarios y Telemetría por Cuenta (Issue #5)
│   │   ├── components/         # Solo JSX: UsersSummary, UsersTable, UserRow, UsersNotifications, DeleteUserModal
│   │   ├── containers/         # UsersContainer.jsx (orquesta sondeo y telemetría por usuario)
│   │   ├── utils/              # useUsers.js (cálculos de consumo y mutaciones)
│   │   └── styles/
│   ├── App.jsx                 # Declaración de rutas SPA conectadas a los Containers
│   ├── main.jsx                # Punto de entrada y montaje con Redux Provider y Router
│   └── index.css               # Estilos globales y utilidades de Tailwind CSS v4
├── .env                        # Variables de entorno locales
├── .env.example                # Plantilla de variables de entorno requeridas
├── .gitignore                  # Exclusión de node_modules, .env y dist/
├── index.html                  # HTML base del sistema
├── package.json                # Dependencias y scripts de ejecución
└── vite.config.js              # Configuración de compilación con Vite y Tailwind
```

---

## 6. Reorganización Modular y Arquitectura de Componentes (Issues #3, #4 y #5)

El código fuente del frontend fue sometido a una reestructuración de arquitectura limpia para cumplir con las mejores prácticas de modularidad, mantenibilidad y separación de responsabilidades:

```text
Módulo/
├── components/   # Componentes puramente presentacionales (solo reciben props y retornan JSX)
├── containers/   # Contenedores inteligentes (conectan lógica, estado y despachan a componentes)
├── utils/        # Hooks personalizados (use*.js), helpers de cálculo y configuraciones
└── styles/       # Hojas de estilo o utilidades CSS encapsuladas
```

### Resumen de Refactorizaciones por Issue:

#### Actividad 1 (Issue #3) – Modularización de Login (`src/Login/`)
- **Problema previo:** `Login.jsx` (248 líneas) concentraba estado de formulario, pestañas de login/registro, validaciones de regex, consumo de API y renderizado en un solo archivo monolítico.
- **Solución implementada:**
  - `src/Login/utils/useLogin.js`: Hook para alternar pestaña, validaciones de email/password, llamadas a `authService` y navegación con `useNavigate`.
  - `src/Login/components/`: `LoginHeader.jsx`, `AuthTabs.jsx`, `LoginForm.jsx`, `RegisterForm.jsx`.
  - `src/Login/containers/LoginContainer.jsx`: Orquesta la vista y fue montado en `/login` dentro de `App.jsx`.
  - Eliminación segura del archivo obsoleto `src/pages/Login.jsx`.

#### Actividad 2 (Issue #4) – Dashboard e Historial (`src/Dashboard/` y `src/History/`)
- **Problema previo:** `Dashboard.jsx` (356 líneas) y `History.jsx` (420 líneas) mezclaban temporizadores de sondeo, buffers de telemetría de 60 segundos, cálculos de uptime y formatos de series cronológicas dentro de componentes gigantes.
- **Solución implementada para Dashboard:**
  - `src/Dashboard/utils/`: `useDashboard.js` (gestión de vistas y tabs), `useMetrics.js` (polling cada 2s con buffer rodante), `componentsConfig.js`, `formatUptime.js`, `specsConfig.js`, `metricHelpers.js`.
  - `src/Dashboard/components/`: `AlertBanner.jsx` (44 lín.), `CardsView.jsx` (53 lín.), `ComponentChart.jsx` (61 lín.), `ComponentDetail.jsx` (53 lín.), `ComponentList.jsx` (82 lín.), `ComponentSpecs.jsx` (26 lín.), `DashboardHeader.jsx` (73 lín.), `MetricCard.jsx` (92 lín.), `WallpaperBackground.jsx` (15 lín.).
  - `src/Dashboard/containers/DashboardContainer.jsx`: Montado en `/`.
- **Solución implementada para Historial:**
  - `src/History/utils/`: `useHistory.js` (consulta RTK Query, validación cronológica y estados), `historyHelpers.js` (rango de fechas por defecto, formateo de curvas y KPIs).
  - `src/History/components/`: `HistoryFilters.jsx`, `HistoryKpis.jsx`, `HistoryChart.jsx`, `HistoryTable.jsx`, `HistoryEmpty.jsx`.
  - `src/History/containers/HistoryContainer.jsx`: Montado en `/history`.
  - Eliminación de `MetricChart.jsx` y `pages/History.jsx`.

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

## 7. Pantallas del Sistema y Funcionalidades

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

## 8. Pruebas y Validación con Postman

Se incluye la colección completa y estandarizada en: [`back/Monitor_Postman_Collection.json`](file:///c:/Users/Adrian/OneDrive/Documentos/ITESI/Servicio%20Social/Monitor%20Quintillizas/back/Monitor_Postman_Collection.json).

### Resumen de Casos de Prueba Verificados:
1. `POST ?action=login` con credenciales válidas (`200 OK`, entrega de token y datos de usuario).
2. `POST ?action=login` con contraseña errónea (`401 Unauthorized`).
3. `POST ?action=login` con campos vacíos (`400 Bad Request`).
4. `POST ?action=register` creación exitosa de cuenta (`200 OK`).
5. `GET ?action=check_session` validación de sesión con Bearer Token (`200 OK`).
6. `GET ?action=get_hosts` listado de equipos disponibles (`200 OK`).
7. `GET ?action=get_metrics&host_id=1` lectura en vivo con script Python (`200 OK`).
8. `GET ?action=get_history` consulta en rango de fechas (`200 OK`).
9. `POST ?action=create_threshold` alta de nuevo umbral de advertencia (`200 OK`).
10. `POST ?action=update_threshold` modificación de regla existente (`200 OK`).
11. `POST ?action=delete_threshold` baja de umbral (`200 OK`).
12. `GET ?action=get_all_users_performance` telemetría por usuario para panel admin (`200 OK`).
13. `POST ?action=delete_account` eliminación de cuenta con baja en cascada (`200 OK`).

---

## 9. Consideraciones Especiales y Problemas Conocidos

- **Ejecución Local sin Servidor MySQL:** Si se ejecuta PHP de forma nativa sin MySQL encendido, el sistema incluye un mecanismo de contingencia automática (*local fallback*) que crea y puebla una base SQLite local (`local_monitor.sqlite`) permitiendo realizar pruebas funcionales de manera inmediata.
- **Acceso a Métricas del Host en Contenedores Docker:** En entornos Docker aislados, `psutil` lee los recursos asignados al contenedor. Para producción con métricas del host anfitrión, se mapea el volumen `/proc` y `/sys` del sistema operativo.

---

## 10. Procedimiento de Ejecución Local y Compilación

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

## 11. Banco de Preguntas y Respuestas (Frontend)

1. **¿Qué es un componente y en qué se diferencia de una función normal?**  
   *Respuesta:* Un componente es una función reutilizable que retorna elementos de interfaz en formato JSX y participa en el ciclo de vida reactivo de React. A diferencia de una función ordinaria de JavaScript que solo ejecuta instrucciones o cálculos matemáticos, un componente se enlaza al Virtual DOM para proyectar y actualizar la interfaz visual de forma declarativa.

2. **¿Qué es el estado (`useState`) y por qué no se utiliza una variable común?**  
   *Respuesta:* Las variables estándar de JavaScript se destruyen y re-inicializan cada vez que la función del componente se ejecuta, y modificarlas no le notifica al motor de React que debe re-dibujar la pantalla. `useState` preserva el dato en memoria entre renderizados y, cuando se invoca su función modificadora (`setState`), React agenda un nuevo renderizado para actualizar la vista con el nuevo valor.

3. **¿Qué diferencia existe entre las *props* y el *estado*?**  
   *Respuesta:* Las *props* son parámetros inmutables de solo lectura enviados desde un componente padre hacia un componente hijo (flujo de datos unidireccional descendente). El *estado* es interno, mutable y administrado por el propio componente que lo declara.

4. **¿Qué es `useEffect` y para qué sirve su arreglo de dependencias?**  
   *Respuesta:* Es un Hook para ejecutar efectos secundarios (peticiones HTTP, temporizadores, suscripciones) tras la renderización del componente. Su arreglo de dependencias controla el momento de ejecución: si está vacío (`[]`), se ejecuta solo una vez al montarse el componente; si contiene variables (`[hostId]`), se vuelve a disparar cada vez que alguna de esas variables cambie de valor.

5. **¿Qué hace el `return` que se coloca dentro de un `useEffect`?**  
   *Respuesta:* Es la **función de limpieza (*cleanup function*)**. Se ejecuta inmediatamente antes de que el componente sea desmontado del DOM o antes de re-ejecutar el efecto. En el hook `useMetrics.js`, se usa `clearInterval(timer)` para apagar las peticiones periódicas y evitar fugas de memoria (*memory leaks*) en el navegador.

6. **¿Qué es una promesa y qué hace `async/await`?**  
   *Respuesta:* Una promesa es un objeto que representa la eventual finalización (exitosa o con error) de una operación asíncrona. La sintaxis `async/await` es azúcar sintáctico sobre las promesas que permite escribir código asíncrono con estructura secuencial y legible, facilitando el manejo de errores mediante bloques `try/catch`.

7. **¿Por qué las peticiones se realizan desde la carpeta `services/` y no directo en el componente?**  
   *Respuesta:* Aplica el principio de **Separación de Responsabilidades**. Centraliza la configuración de red (baseURL, cabeceras de autorización Bearer, timeouts), desacopla la capa de presentación visual de la capa de comunicación y facilita el mantenimiento y reutilización del código.
