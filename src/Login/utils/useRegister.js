import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRegisterMutation } from '../../services/authApi';
import { validarRegistro } from './validaciones';

export const useRegister = ({ onAutoLoginFailed } = {}) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [registerMutation] = useRegisterMutation();

  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const error = validarRegistro({
      username: regUsername,
      password: regPassword,
      confirmPassword: regConfirmPassword
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    setLoading(true);

    try {
      const res = await registerMutation({
        username: regUsername.trim(),
        email: regEmail.trim() || `${regUsername.trim().toLowerCase()}@monitor.local`,
        password: regPassword
      }).unwrap();

      if (res && res.ok) {
        setSuccessMessage('¡Cuenta creada exitosamente! Iniciando sesión...');
        setTimeout(async () => {
          try {
            await login(regUsername.trim(), regPassword);
            navigate('/');
          } catch {
            if (onAutoLoginFailed) {
              onAutoLoginFailed(regUsername.trim());
            }
            setSuccessMessage(
              'Cuenta creada. Por favor ingresa tu contraseña para iniciar sesión.'
            );
          }
        }, 1200);
      } else {
        setErrorMessage(res?.mensaje || 'No se pudo crear la cuenta.');
      }
    } catch (err) {
      console.error('Error en registro:', err);
      const serverMsg =
        err.data?.Error?.Description ||
        err.data?.mensaje ||
        err.response?.data?.mensaje;
      setErrorMessage(serverMsg || 'Error al procesar el registro en el backend.');
    } finally {
      setLoading(false);
    }
  };

  return {
    regUsername,
    setRegUsername,
    regEmail,
    setRegEmail,
    regPassword,
    setRegPassword,
    regConfirmPassword,
    setRegConfirmPassword,
    loading,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    handleSubmit
  };
};
