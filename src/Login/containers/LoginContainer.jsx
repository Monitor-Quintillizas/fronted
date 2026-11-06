import React from 'react';
import { useLoginMode } from '../utils/useLoginMode';
import { useLogin } from '../utils/useLogin';
import { useRegister } from '../utils/useRegister';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';
import ModeSelector from '../components/ModeSelector';
import FormMessage from '../components/FormMessage';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function LoginContainer() {
  const { mode, setMode } = useLoginMode('login');
  const login = useLogin();

  const handleAutoLoginFallback = (registeredUsername) => {
    setMode('login');
    login.setUsername(registeredUsername);
  };

  const register = useRegister({ onAutoLoginFailed: handleAutoLoginFallback });

  const handleSelectMode = (newMode) => {
    setMode(newMode);
    login.setErrorMessage('');
    register.setErrorMessage('');
    register.setSuccessMessage('');
  };

  const activeErrorMessage =
    mode === 'login' ? login.errorMessage : register.errorMessage;
  const activeSuccessMessage =
    mode === 'login' ? '' : register.successMessage;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo con Wallpaper de Pantalla */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/backgrounds/quintuplets_master.jpg"
          alt="Wallpaper"
          className="w-full h-full object-cover opacity-25 filter blur-[1px] scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" />
      </div>

      {/* Tarjeta Central Cuadrada Minimalista */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-none p-8 shadow-2xl relative z-10">
        <LoginHeader />

        <ModeSelector mode={mode} onSelectMode={handleSelectMode} />

        <FormMessage type="error" message={activeErrorMessage} />
        <FormMessage type="success" message={activeSuccessMessage} />

        {mode === 'login' ? (
          <LoginForm
            username={login.username}
            onChangeUsername={login.setUsername}
            password={login.password}
            onChangePassword={login.setPassword}
            loading={login.loading}
            onSubmit={login.handleSubmit}
            onSwitchToRegister={() => handleSelectMode('register')}
          />
        ) : (
          <RegisterForm
            username={register.regUsername}
            onChangeUsername={register.setRegUsername}
            email={register.regEmail}
            onChangeEmail={register.setRegEmail}
            password={register.regPassword}
            onChangePassword={register.setRegPassword}
            confirmPassword={register.regConfirmPassword}
            onChangeConfirmPassword={register.setRegConfirmPassword}
            loading={register.loading}
            onSubmit={register.handleSubmit}
            onSwitchToLogin={() => handleSelectMode('login')}
          />
        )}

        <LoginFooter />
      </div>
    </div>
  );
}
