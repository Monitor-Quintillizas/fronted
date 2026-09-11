# Monitor Quintillizas - Frontend

Interfaz web para el sistema **Monitor Quintillizas**, desarrollada con **React 19**, **Vite**, **React Router DOM** y **Axios**.

---

## 📁 Estructura del Proyecto

El código fuente está organizado de forma modular dentro del directorio `src/`:

```text
fronted/
├── public/                     # Archivos estáticos públicos
├── src/
│   ├── components/             # Componentes reutilizables de UI
│   │   ├── HostSelector.jsx    # Selector de servidores/hosts a monitorear
│   │   ├── MetricCard.jsx      # Tarjetas de visualización de métricas
│   │   ├── MetricChart.jsx     # Componente de gráficos para telemetría
│   │   └── ProtectedRoute.jsx  # Guardia de rutas autenticadas
│   ├── context/
│   │   └── AuthContext.jsx     # Contexto global de autenticación y sesión
│   ├── hooks/
│   │   └── useMetrics.js       # Custom Hook para gestión y consumo de métricas
│   ├── pages/                  # Vistas principales de la aplicación
│   │   ├── Alerts.jsx          # Vista de alertas del sistema
│   │   ├── Dashboard.jsx       # Panel de control y monitoreo principal
│   │   ├── History.jsx         # Historial de eventos y registros
│   │   └── Login.jsx           # Formulario de inicio de sesión
│   ├── services/               # Comunicación con APIs y servicios externos
│   │   ├── api.js              # Instancia base de Axios con interceptor de tokens
│   │   ├── authService.js      # Métodos de autenticación (login, logout, usuario actual)
│   │   └── metricsService.js   # Peticiones al backend de métricas
│   ├── styles/                 # Hojas de estilo y temas CSS
│   ├── App.jsx                 # Configuración del enrutador principal
│   └── main.jsx                # Punto de entrada de la aplicación React
├── .dockerignore               # Archivos excluidos en el contexto Docker
├── .env.example                # Plantilla de variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── Dockerfile                  # Construcción multi-stage para producción (Node + Nginx)
├── Dockerfile.dev              # Configuración de contenedor para desarrollo
├── docker-compose.yml          # Orquestación de contenedores
├── index.html                  # HTML base del proyecto
├── nginx.conf                  # Configuración del servidor Nginx (soporte para SPA)
├── package.json                # Dependencias y scripts del proyecto
└── vite.config.js              # Configuración de Vite y plugins
```

---

## 🔐 Arquitectura de Autenticación y API

1. **`api.js` (`src/services/api.js`)**:
   - Crea una instancia centralizada de **Axios** utilizando la variable de entorno `VITE_API_URL`.
   - Incorpora un **interceptor de peticiones** que inyecta automáticamente el encabezado `Authorization: Bearer <token>` si existe una sesión activa en `localStorage`.

2. **`authService.js` (`src/services/authService.js`)**:
   - Encapsula las llamadas HTTP de inicio de sesión (`/login`).
   - Gestiona el almacenamiento y limpieza del token y datos de usuario en `localStorage`.

3. **`AuthContext.jsx` (`src/context/AuthContext.jsx`)**:
   - Provee un contexto React (`AuthProvider` y hook `useAuth`) para compartir el estado del usuario logueado en toda la aplicación.
   - Restaura automáticamente la sesión al recargar la página si ya existe un usuario en `localStorage`.

4. **`ProtectedRoute.jsx` (`src/components/ProtectedRoute.jsx`)**:
   - Envuelve las rutas privadas (`/`, `/history`, `/alerts`).
   - Si no existe un usuario autenticado, redirige automáticamente a la pantalla de `/login`.

---

## 🚦 Rutas de la Aplicación (`src/App.jsx`)

| Ruta | Componente | Acceso | Descripción |
| :--- | :--- | :---: | :--- |
| `/login` | `Login` | Público | Pantalla de autenticación de usuarios. |
| `/` | `Dashboard` | Protegido | Panel principal de monitoreo en tiempo real. |
| `/history` | `History` | Protegido | Consulta de historial de métricas y eventos. |
| `/alerts` | `Alerts` | Protegido | Gestión y visualización de alertas del sistema. |

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- **Node.js**: v20.x o superior (recomendado v24 LTS).
- **npm**: v10+ o superior.

### 1. Clonar el repositorio
```bash
git clone https://github.com/Monitor-Quintillizas/fronted.git
cd fronted
```

### 2. Configurar variables de entorno
Crea tu archivo `.env` basado en la plantilla:
```bash
cp .env.example .env
```
Configura la URL de tu backend en `VITE_API_URL`:
```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
```
La aplicación estará accesible en: `http://localhost:5173/`

### 5. Compilar para producción
```bash
npm run build
```
Generará los archivos optimizados dentro de la carpeta `dist/`.

---

## 🐳 Despliegue con Docker

El proyecto incluye soporte para contenedores Docker con compilación multi-etapa y servidor web **Nginx**:

### Iniciar con Docker Compose
```bash
docker compose up -d --build
```
La aplicación se compilará y estará disponible en el puerto `8080`: `http://localhost:8080/`.

---

## 🛠️ Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo con recarga rápida (HMR).
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Previsualiza localmente el paquete generado en `dist/`.
- `npm run lint`: Ejecuta el análisis estático de código con [Oxlint](https://oxc.rs).
