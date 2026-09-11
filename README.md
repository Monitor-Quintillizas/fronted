# Proyecto de Servicio Social: Monitor Quintillizas

## Sistema de Monitoreo y Telemetría de Infraestructura - Módulo Frontend

Documentación técnica del desarrollo de la interfaz de usuario para el sistema de monitoreo distribuido, desarrollada en el marco del programa de Servicio Social Universitario.

---

## 1. Descripción del Proyecto

El presente proyecto consiste en el diseño e implementación de una aplicación web tipo Single Page Application (SPA) orientada a la supervisión, visualización y análisis del estado operativo de servidores e infraestructura de red. La plataforma permite la consulta de métricas en tiempo real (uso de procesador, memoria, tráfico de red y latencia), la administración de alertas y la inspección del historial de eventos.

La solución se encuentra desarrollada con el ecosistema moderno de JavaScript, empleando **React 19** como biblioteca base de componentes, **Vite** como entorno de compilación optimizado, **React Router DOM** para la navegación declarativa y **Axios** para el consumo de servicios web RESTful.

---

## 2. Tecnologías Empleadas

- **Lenguaje y Entorno**: JavaScript (ES Modules), Node.js (v20+ / v24 LTS).
- **Biblioteca de Interfaz**: React 19 (react, react-dom).
- **Herramienta de Construcción y Empaquetado**: Vite 8.
- **Enrutamiento y Control de Navegación**: React Router DOM 7.
- **Cliente HTTP y Comunicación con APIs**: Axios 1.20.
- **Visualización de Datos**: Recharts 3.
- **Calidad de Código y Análisis Estático**: Oxlint.
- **Contenedorización y Despliegue**: Docker, Docker Compose y servidor HTTP Nginx Alpine.

---

## 3. Estructura del Código Fuente

La arquitectura del proyecto sigue un patrón modular por capas de responsabilidad dentro del directorio `src/`, facilitando el mantenimiento, la escalabilidad y el desacoplamiento de componentes:

```text
fronted/
├── public/                     # Recursos y activos estáticos de acceso público
├── src/
│   ├── components/             # Componentes modulares y reutilizables de UI
│   │   ├── HostSelector.jsx    # Selector de nodos e interfaces de infraestructura
│   │   ├── MetricCard.jsx      # Bloques visuales para métricas cuantitativas
│   │   ├── MetricChart.jsx     # Gráficas de telemetría y series de tiempo
│   │   └── ProtectedRoute.jsx  # Componente de control de acceso por autenticación
│   ├── context/
│   │   └── AuthContext.jsx     # Proveedor de estado global de sesión y credenciales
│   ├── hooks/
│   │   └── useMetrics.js       # Hook personalizado para consumo y gestión de métricas
│   ├── pages/                  # Vistas principales asociadas a rutas
│   │   ├── Alerts.jsx          # Panel de visualización de eventos de alerta
│   │   ├── Dashboard.jsx       # Panel de control de monitoreo general
│   │   ├── History.jsx         # Registro histórico de actividad de nodos
│   │   └── Login.jsx           # Formulario de inicio de sesión de operadores
│   ├── services/               # Capa de integración y comunicación con APIs REST
│   │   ├── api.js              # Instancia configurada de Axios e interceptores HTTP
│   │   ├── authService.js      # Servicios de autenticación y manejo de tokens
│   │   └── metricsService.js   # Peticiones al backend de telemetría
│   ├── styles/                 # Hojas de estilo y reglas de diseño
│   ├── App.jsx                 # Declaración de rutas y jerarquía de componentes
│   └── main.jsx                # Inicialización del Virtual DOM de React
├── .dockerignore               # Criterios de exclusión de contexto para Docker
├── .env.example                # Especificación de variables de entorno requeridas
├── .gitignore                  # Reglas de exclusión para control de versiones
├── Dockerfile                  # Manifiesto de construcción en etapas para producción
├── Dockerfile.dev              # Configuración para entorno de desarrollo en contenedor
├── docker-compose.yml          # Especificación de orquestación de servicios
├── index.html                  # Plantilla base HTML5
├── nginx.conf                  # Configuración de proxy y rutas SPA en servidor Nginx
├── package.json                # Manifiesto de dependencias y scripts de ejecución
└── vite.config.js              # Configuración del servidor de desarrollo y compilación
```

---

## 4. Arquitectura de Seguridad y Flujo de Autenticación

El sistema implementa un esquema de autenticación basado en tokens JWT (JSON Web Tokens):

1. **Cliente HTTP Centralizado (`src/services/api.js`)**:
   - Inicializa una instancia de Axios parametrizada con la variable de entorno `VITE_API_URL`.
   - Incorpora un interceptor en la fase de petición (*request interceptor*) que recupera el token de sesión almacenado en `localStorage` y lo adjunta de manera transparente en la cabecera `Authorization: Bearer <token>`.

2. **Servicio de Autenticación (`src/services/authService.js`)**:
   - Provee los métodos para procesar el inicio de sesión (`login`), cierre de sesión (`logout`) y verificación de persistencia local del usuario (`getCurrentUser`).

3. **Contexto de Estado Global (`src/context/AuthContext.jsx`)**:
   - Administra el estado reactivo del usuario en memoria y expone el hook `useAuth()`.
   - Garantiza la persistencia de la sesión activa entre recargas del navegador.

4. **Guardia de Rutas (`src/components/ProtectedRoute.jsx`)**:
   - Evalúa el estado de autenticación antes de renderizar vistas operativas.
   - En caso de no existir una sesión válida, efectúa una redirección inmediata hacia la ruta `/login`.

---

## 5. Catálogo de Rutas

La navegación declarativa se gestiona en `src/App.jsx` conforme a la siguiente distribución:

| Ruta | Componente | Nivel de Acceso | Finalidad |
| :--- | :--- | :---: | :--- |
| `/login` | `Login` | Público | Autenticación y acceso de operadores al sistema. |
| `/` | `Dashboard` | Restringido | Panel central con telemetría de nodos en tiempo real. |
| `/history` | `History` | Restringido | Consulta de registros históricos y eventos de infraestructura. |
| `/alerts` | `Alerts` | Restringido | Notificación y administración de anomalías detectadas. |

---

## 6. Procedimiento de Instalación y Ejecución Local

### Prerrequisitos del Sistema
- Node.js versión 20.x o superior (recomendado canal LTS).
- Administrador de paquetes npm versión 10.x o superior.
- Git para la sincronización del repositorio.

### Paso 1: Obtención del Código
```bash
git clone https://github.com/Monitor-Quintillizas/fronted.git
cd fronted
```

### Paso 2: Configuración de Variables de Entorno
Copiar la plantilla de configuración de variables de entorno:
```bash
cp .env.example .env
```
Definir en el archivo `.env` el punto de enlace (*endpoint*) del backend:
```env
VITE_API_URL=http://localhost:3000/api
```

### Paso 3: Instalación de Dependencias
```bash
npm install
```

### Paso 4: Ejecución en Modo Desarrollo
```bash
npm run dev
```
El servidor local iniciará en la dirección: `http://localhost:5173/`.

### Paso 5: Compilación para Producción
```bash
npm run build
```
Los artefactos estáticos optimizados y minificados se generarán en el directorio `dist/`.

---

## 7. Despliegue con Contenedores Docker

El módulo cuenta con soporte para despliegue automatizado mediante contenedores:

- **Estrategia Multi-Etapa (`Dockerfile`)**:
  1. *Etapa de Construcción*: Emplea una imagen `node:20-alpine` para la instalación limpia de dependencias (`npm ci`) y la generación del empaquetado de producción (`npm run build`).
  2. *Etapa de Publicación*: Emplea `nginx:alpine` para servir exclusivamente los archivos estáticos generados, minimizando el tamaño final de la imagen y reduciendo la superficie de vulnerabilidad.
- **Configuración Nginx (`nginx.conf`)**:
  - Implementa la directiva `try_files $uri $uri/ /index.html;` para asegurar la correcta resolución de rutas manejadas por el enrutador del cliente (SPA) ante recargas de página.

### Ejecución del Servicio Docker
```bash
docker compose up -d --build
```
La aplicación será expuesta a través del puerto configurado: `http://localhost:8080/`.

---

## 8. Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga rápida de módulos (HMR). |
| `npm run build` | Ejecuta la compilación de optimización para despliegue en producción. |
| `npm run preview` | Levanta un servidor local para verificar el resultado del empaquetado `dist/`. |
| `npm run lint` | Ejecuta el análisis estático de sintaxis y buenas prácticas mediante Oxlint. |
