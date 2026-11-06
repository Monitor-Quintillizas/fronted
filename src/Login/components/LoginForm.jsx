import React from 'react';
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginForm({
  username,
  onChangeUsername,
  password,
  onChangePassword,
  loading,
  onSubmit,
  onSwitchToRegister
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
            value={username}
            onChange={(e) => onChangeUsername(e.target.value)}
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
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
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
          onClick={onSwitchToRegister}
          className="text-xs text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
        >
          ¿No tienes cuenta? <span className="text-blue-400 font-semibold underline">Regístrate</span>
        </button>
      </div>
    </form>
  );
}
