import api from "./api";

export const authService = {
    login: async (email, password) => {
        // Envia usuario y contraseña al endpoint de login
        const response = await api.post('/login', { email, password });
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}