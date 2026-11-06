import React from 'react';
import { Cpu } from 'lucide-react';

export default function LoginHeader() {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-none bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-3 shadow-sm">
        <Cpu className="w-5 h-5" />
      </div>
      <h1 className="text-xl font-bold text-white tracking-tight">Administrador de Telemetría</h1>
      <p className="text-xs text-slate-400 mt-1">
        Plataforma de Monitoreo de Recursos & Servidores
      </p>
    </div>
  );
}
