import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loggedOut } from '../features/auth/authSlice';
import { useLoginMutation, useLogoutMutation } from '../services/authApi';

const AuthContext = createContext(null);

/**
 * Proveedor de Compatibilidad de Autenticación respaldado por Redux Toolkit y RTK Query.
 * Conecta el estado global de auth en el store de Redux con los componentes existentes
 * (ProtectedRoute, Navbar, Users, etc.), manteniendo su interfaz intacta.
 */
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = async (username, password) => {
    const data = await loginMutation({ username, password }).unwrap();
    return data;
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // Ignorar errores de red en logout
    } finally {
      dispatch(loggedOut());
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};