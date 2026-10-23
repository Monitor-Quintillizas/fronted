import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loggedOut } from '../features/auth/authSlice';

/**
 * BaseQuery central con fetchBaseQuery de RTK Query.
 * Configura baseUrl, timeout, credenciales y prepareHeaders con Bearer token.
 */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/services.php',
  credentials: 'include', // Equivale a withCredentials: true de axios
  timeout: 10000,         // Equivale al timeout de 10s de axios
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token || localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Wrapper de BaseQuery que replica el interceptor de respuesta de Axios:
 * Si el servidor responde 401 (no autorizado / sesión expirada),
 * limpia la sesión en el store y el caché de RTK Query (a menos que estemos en /login).
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const isLoginEndpoint = typeof args === 'object' && args?.params?.action === 'login';
    if (!isLoginEndpoint && window.location.pathname !== '/login') {
      api.dispatch(loggedOut());
      api.dispatch(api.util.resetApiState());
    }
  }

  return result;
};

/**
 * Instancia central de createApi según la propuesta de integración RTK Query.
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Host', 'Threshold', 'Alert', 'Metric', 'User'],
  endpoints: () => ({}),
});

export default api;
