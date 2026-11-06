import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

export default function ModeSelector({ mode, onSelectMode }) {
  return (
    <div className="flex bg-slate-950 p-1 border border-slate-800 mb-5 rounded-none">
      <button
        type="button"
        onClick={() => onSelectMode('login')}
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
        onClick={() => onSelectMode('register')}
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
  );
}
