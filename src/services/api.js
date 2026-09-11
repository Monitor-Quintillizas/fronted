import axios from "axios";

const api = axios.create({
    baseURL: axios.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

//Interceptor para inyectar token en cada peticion si existe sesion
api.interceptors.response.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
