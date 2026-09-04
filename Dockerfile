# Etapa 1: Build de la aplicación con Node.js
FROM node:20-alpine AS build

WORKDIR /app

# Copiar manifiestos e instalar dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el código fuente y construir los archivos estáticos
COPY . .
RUN npm run build

# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:alpine AS production

# Copiar la configuración personalizada de Nginx para soportar react-router-dom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el resultado del build desde la etapa de compilación
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
