import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validarLogin } from './validaciones';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setErrorMessage('');

    const error = validarLogin({ username, password });
    if (error) {
      setErrorMessage(error);
      return;
    }

    setLoading(true);

    try {
      const data = await login(username.trim(), password);
      if (data && data.ok) {
        navigate('/');
      } else {
        setErrorMessage(data?.mensaje || 'Credenciales incorrectas.');
      }
    } catch (err) {
      console.error('Error en login:', err);
      const serverMsg =
        err.data?.Error?.Description ||
        err.data?.mensaje ||
        err.response?.data?.mensaje;
      setErrorMessage(serverMsg || 'No se pudo conectar con el servidor backend.');
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    errorMessage,
    setErrorMessage,
    handleSubmit
  };
};
