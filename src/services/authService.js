import api from './api';

/**
 * Servicio de Autenticación y Gestión de Usuarios / Cuentas.
 */
export const authService = {
  /**
   * Registra una nueva cuenta de usuario
   */
  register: async (username, email, password) => {
    const response = await api.post('?action=register', { username, email, password });
    return response.data;
  },

  /**
   * Inicia sesión con usuario y contraseña
   */
  login: async (username, password) => {
    const response = await api.post('?action=login', { username, password });
    const data = response.data;

    if (data.ok && data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    }
    return data;
  },

  /**
   * Cierra sesión
   */
  logout: async () => {
    try {
      await api.get('?action=logout');
    } catch (e) {
      // Ignorar errores de red en logout
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Elimina la propia cuenta del usuario autenticado
   */
  deleteMyAccount: async () => {
    const response = await api.post('?action=delete_account');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  },

  /**
   * Admin: Elimina un usuario por su ID
   */
  adminDeleteUser: async (userId) => {
    const response = await api.post('?action=admin_delete_user', { user_id: userId });
    return response.data;
  },

  /**
   * Admin / General: Obtiene la lista y desempeño en vivo de todas las cuentas
   */
  getAllUsersPerformance: async () => {
    const response = await api.get('?action=get_all_users_performance');
    return response.data;
  },

  /**
   * Obtiene el usuario almacenado localmente
   */
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  /**
   * Verifica el estado de la sesión con el servidor
   */
  checkSession: async () => {
    const response = await api.get('?action=check_session');
    return response.data;
  }
};