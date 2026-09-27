import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import {
  Cpu,
  User,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowRight,
  UserPlus,
  LogIn,
  ShieldCheck
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState('login');

  // Estados de Login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Estados de Registro
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setErrorMessage("Por favor, ingresa tanto el usuario como la contraseña.");
      return;
    }

    setLoading(true);

    try {
      const data = await login(loginUsername.trim(), loginPassword);
      if (data && data.ok) {
        navigate('/');
      } else {
        setErrorMessage(data?.mensaje || "Credenciales incorrectas.");
      }
    } catch (err) {
      console.error("Error en login:", err);
      const serverMsg = err.response?.data?.Error?.Description || err.response?.data?.mensaje;
      setErrorMessage(serverMsg || "No se pudo conectar con el servidor backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regUsername.trim()) {
      setErrorMessage("El nombre de usuario es obligatorio.");
      return;
    }
    if (regUsername.trim().length < 3) {
      setErrorMessage("El nombre de usuario debe tener al menos 3 caracteres.");
      return;
    }
    if (!regPassword.trim()) {
      setErrorMessage("La contraseña es obligatoria.");
      return;
    }
    if (regPassword.length < 4) {
      setErrorMessage("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const res = await authService.register(
        regUsername.trim(),
        regEmail.trim() || `${regUsername.trim().toLowerCase()}@monitor.local`,
        regPassword
      );

      if (res && res.ok) {
        setSuccessMessage("¡Cuenta creada exitosamente! Iniciando sesión...");
        setTimeout(async () => {
          try {
            await login(regUsername.trim(), regPassword);
            navigate('/');
          } catch {
            setMode('login');
            setLoginUsername(regUsername.trim());
            setSuccessMessage("Cuenta creada. Por favor ingresa tu contraseña para iniciar sesión.");
          }
        }, 1200);
      } else {
        setErrorMessage(res?.mensaje || "No se pudo crear la cuenta.");
      }
    } catch (err) {
      console.error("Error en registro:", err);
      const serverMsg = err.response?.data?.Error?.Description || err.response?.data?.mensaje;
      setErrorMessage(serverMsg || "Error al procesar el registro en el backend.");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Encabezado e Identidad */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-none bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-3 shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Administrador de Telemetría</h1>
          <p className="text-xs text-slate-400 mt-1">
            Plataforma de Monitoreo de Recursos & Servidores
          </p>
        </div>

        {/* Pestañas: Iniciar Sesión / Crear Cuenta */}
        <div className="flex bg-slate-950 p-1 border border-slate-800 mb-5 rounded-none">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-none transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Iniciar Sesión</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-none transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Crear Cuenta</span>
          </button>
        </div>

        {/* Mensaje de Error */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-semibold block text-rose-300">Aviso</span>
              {errorMessage}
            </div>
          </div>
        )}

        {/* Mensaje de Éxito */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-semibold block text-emerald-300">¡Correcto!</span>
              {successMessage}
            </div>
          </div>
        )}

        {/* Formulario de Iniciar Sesión */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Usuario o Correo
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-500 pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="ej. admin"
                  disabled={loading}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-600 outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-500 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-600 outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-none text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
              >
                ¿No tienes cuenta? <span className="text-blue-400 font-semibold underline">Regístrate</span>
              </button>
            </div>
          </form>
        ) : (
          /* Formulario de Crear Cuenta */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Nombre de Usuario <span className="text-rose-400">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-500 pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="ej. adrian_sistemas"
                  disabled={loading}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-600 outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Correo Electrónico
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-500 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="ej. usuario@itesi.edu.mx"
                  disabled={loading}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-600 outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Contraseña <span className="text-rose-400">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-500 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                  disabled={loading}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-600 outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Confirmar Contraseña <span className="text-rose-400">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-slate-500 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
                  disabled={loading}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-600 outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-none text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Crear Cuenta</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
              >
                ¿Ya tienes cuenta? <span className="text-blue-400 font-semibold underline">Inicia sesión</span>
              </button>
            </div>
          </form>
        )}

        <div className="mt-5 pt-3 border-t border-slate-800/80 text-center text-xs text-slate-400">
          <div className="flex items-center justify-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Credenciales por defecto: <strong>admin</strong> / <strong>1234</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
