import { useState } from 'react';

export const useLoginMode = (initialMode = 'login') => {
  const [mode, setMode] = useState(initialMode);

  const switchToLogin = () => setMode('login');
  const switchToRegister = () => setMode('register');

  return {
    mode,
    setMode,
    switchToLogin,
    switchToRegister
  };
};
