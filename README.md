# Módulo Frontend - Monitor Quintillizas

## Single Page Application (SPA) en React 19 + Vite + Tailwind CSS
**Carrera:** Ingeniería en Sistemas Computacionales (5to Semestre)  
**Asignatura:** Programación Web / Sistemas Distribuidos  
**Proyecto:** Monitor Quintillizas (Panel Web de Monitoreo y Telemetría en Tiempo Real)  
**Repositorio Oficial:** [https://github.com/Monitor-Quintillizas/fronted](https://github.com/Monitor-Quintillizas/fronted)

---

## 1. Descripción del Módulo Frontend

El frontend es la capa de presentación interactiva con la que interactúa el operador. Desarrollada como una Single Page Application (SPA) con **React 19** y **Vite**, se comunica exclusivamente con el backend PHP mediante servicios centralizados de **Axios**, garantizando que toda la información provenga de la API sin datos simulados o fijos en el código.

La interfaz implementa un diseño profesional y minimalista de bordes cuadrados (`rounded-none`) inspirado en el **Administrador de Tareas de Windows 11**, integrando fondos temáticos de telemetría de alta resolución con desenfoque de fondo y paletas de color especializadas (Rojo para CPU, Azul para Memoria, Verde para Almacenamiento, Ámbar para Red y Púrpura para GPU).

---

## 2. Tecnologías y Herramientas Empleadas

- **Librería UI:** React 19 (`react`, `react-dom`).
- **Entorno de Construcción y Servidor Dev:** Vite 8 (HMR ultrarrápido).
- **Enrutador Declarativo:** React Router DOM 7.
- **Cliente HTTP Centralizado:** Axios (con interceptores y variables de entorno).
- **Librería de Gráficas de Series Temporales:** Recharts (Áreas con degradados neón e interpolación fluida).
- **Iconografía:** Lucide React Icons.
- **Estilos:** Tailwind CSS con tokens minimalistas de alto contraste.
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
│   ├── components/             # Componentes modulares y reutilizables de UI
│   │   ├── HostSelector.jsx    # Selector desplegable de hosts/equipos registrados
│   │   ├── MetricCard.jsx      # Tarjeta de métrica con barra de progreso y micro-gráfica
│   │   ├── MetricChart.jsx     # Contenedor de gráfica de serie temporal
│   │   ├── Navbar.jsx          # Barra de navegación superior con perfil y reloj de sincronización
│   │   └── ProtectedRoute.jsx  # Guardia de autenticación para rutas privadas
│   ├── context/
│   │   └── AuthContext.jsx     # Contexto global de sesión, usuario autenticado y login/logout
│   ├── hooks/
│   │   └── useMetrics.js       # Hook personalizado para polling periódico y gestión de estado
│   ├── pages/                  # Vistas principales de la aplicación
│   │   ├── Login.jsx           # Formulario de inicio de sesión y creación de cuenta
│   │   ├── Dashboard.jsx       # Panel de rendimiento (CPU, RAM, Disco, Ethernet, GPU)
│   │   ├── History.jsx         # Consulta histórica con filtros cronológicos y gráficas
│   │   ├── Alerts.jsx          # Configuración y administración de reglas de umbrales
│   │   └── Users.jsx           # Panel de supervisión de cuentas activas y telemetría por usuario
│   ├── services/               # Capa de abstracción de red y consumo de APIs
│   │   ├── api.js              # Instancia centralizada de Axios con interceptor de Bearer Token
│   │   ├── authService.js      # Peticiones de login, registro, logout y eliminación de cuentas
│   │   ├── metricsService.js   # Peticiones de métricas en vivo, hosts e historial
│   │   └── thresholdsService.js# Peticiones CRUD para reglas de umbrales
│   ├── styles/                 # Hojas de estilo y reglas CSS
│   ├── App.jsx                 # Declaración y distribución de rutas SPA
│   ├── main.jsx                # Punto de entrada y montaje en el DOM
│   └── index.css               # Estilos globales y utilidades de Tailwind CSS
├── .env                        # Variables de entorno activas
├── .env.example                # Plantilla de variables de entorno requeridas
├── .gitignore                  # Exclusión de node_modules y artefactos de compilación
├── Dockerfile                  # Manifiesto de compilación multi-etapa para producción
├── nginx.conf                  # Servidor Nginx para enrutamiento SPA
└── vite.config.js              # Configuración de compilación Vite
```

---

## 4. Pantallas Requeridas y Funcionalidades

### 1. Pantalla de Inicio de Sesión (`Login.jsx`)
- **Formulario Dual:** Pestañas para *Iniciar Sesión* y *Crear Cuenta*.
- **Validación de Entradas:** Comprobación estricta de campos vacíos y longitud mínima antes de emitir la petición HTTP.
- **Feedback Visual:** Mensajes de error claros cuando las credenciales son incorrectas (`401`) e indicadores de carga (`Loader2 animate-spin`) mientras se espera la respuesta del servidor.
- **Redirección Automática:** Redirige al Dashboard (`/`) tras una autenticación exitosa.
- **Guardia de Rutas (`ProtectedRoute.jsx`):** Bloquea el acceso a todas las demás pantallas cuando no existe una sesión válida activa.

### 2. Pantalla Principal / Rendimiento (`Dashboard.jsx`)
- **Selector de Equipo:** Selector desplegable para alternar entre los diferentes hosts monitoreados.
- **Métricas en Tiempo Real:** Carga de CPU (%), memoria RAM ocupada y total, uso de disco duro (%), interfaces de red (Ethernet) y acelerador gráfico (GPU).
- **Gráfica Dinámica en Vivo:** Ventana móvil de 60 segundos construida con Recharts que se actualiza periódicamente de forma automática.
- **Fondo y Paleta Dinámica:** Cambia el wallpaper de fondo y la iluminación de acento según la pestaña activa (CPU, RAM, Disco, Ethernet, GPU).
- **Barra Superior:** Visualización de la hora de última sincronización recibida, nombre del usuario autenticado y botón para cerrar sesión.
- **Banner de Alerta Visual:** Alerta prominente en pantalla si alguna métrica rebasa los límites configurados en la base de datos.
- **Limpieza de Temporizadores:** El hook `useMetrics.js` implementa la función de retorno (`return () => clearInterval(intervalId)`) para cancelar las peticiones cuando el componente se desmonta.

### 3. Pantalla de Historial (`History.jsx`)
- **Filtro Cronológico:** Selectores de fecha y hora inicial y final (`datetime-local`).
- **Validación de Rango:** Validación visual que exige que la fecha inicial sea estrictamente anterior a la fecha final.
- **Gráfica de Series Históricas:** Gráfica interactiva con selector de métrica (CPU, RAM, Disco o Todas).
- **Manejo de Estados:** Indicador de carga durante la consulta a la BD y mensaje explícito cuando no existen registros en el periodo solicitado.
- **Tabla de Muestras:** Registro tabular de cada muestra individual almacenada en la base de datos.

### 4. Pantalla de Gestión de Alertas y Umbrales (`Alerts.jsx`)
- **Listado de Reglas:** Muestra todos los umbrales configurados para el equipo seleccionado desde la tabla `THRESHOLDS`.
- **Formulario de Creación:** Modal para dar de alta una nueva regla (Métrica, Operador `>`, `<`, `>=`, `<=`, `=`, Porcentaje Límite).
- **Modificación:** Modal para editar valores y activar/desactivar reglas existentes.
- **Eliminación Segura:** Opción para eliminar umbrales con modal de confirmación antes de ejecutar la baja en la base de datos.

### 5. Panel de Cuentas y Rendimiento (`Users.jsx`)
- **Supervisión de Cuentas:** Lista de usuarios registrados, estado de conexión (en línea/inactivo), rol (`admin` / `user`) y telemetría de consumo de recursos por cuenta.
- **Eliminación de Cuentas:** Capacidad de auto-eliminar la propia cuenta o gestión de operadores por parte del administrador.

---

## 5. Cumplimiento Estricto de Reglas de Desarrollo

1. **Configuración por Variable de Entorno:** La URL base del backend se define en `.env` (`VITE_API_URL=http://localhost:8000/services.php`) y se consume únicamente desde `src/services/api.js`.
2. **Cero Datos Hardcodeados:** Todos los valores de CPU, memoria total, capacidad de disco y núcleos se obtienen dinámicamente de las respuestas del backend.
3. **Arquitectura por Servicios:** Los componentes nunca realizan llamadas `axios` o `fetch` directas; todas pasan por los módulos en `src/services/`.
4. **Desacoplamiento de `App.jsx`:** `App.jsx` solo define la jerarquía de rutas y el proveedor de contexto; la lógica reside en sus respectivos componentes y páginas.
5. **Manejo Visual de Errores y Carga:** Si el backend no responde, la sesión expira o una petición falla, la interfaz muestra notificaciones claras sin pantallas en blanco.
6. **Exclusión de `node_modules`:** El archivo `.gitignore` excluye `node_modules` y `.env` para garantizar un repositorio limpio.

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

### Compilación para Producción:
```bash
npm run build
```
Genera la compilación minificada y optimizada en la carpeta `dist/`.

---

## 7. Banco de Preguntas y Respuestas (Frontend)

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
