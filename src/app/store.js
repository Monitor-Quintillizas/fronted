import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../services/api';
import authReducer from '../features/auth/authSlice';

// Cargar inyecciones de endpoints en la API central
import '../services/authApi';
import '../services/metricsApi';
import '../services/thresholdsApi';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Reducer generado por createApi
    auth: authReducer,              // Reducer de autenticación y sesión
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Habilita refetchOnFocus y refetchOnReconnect
setupListeners(store.dispatch);

export default store;
