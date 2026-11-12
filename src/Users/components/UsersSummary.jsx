import React from 'react';
import { Users as UsersIcon, Activity, Shield } from 'lucide-react';

export default function UsersSummary({
  totalUsers,
  onlineUsers,
  currentUser,
  isAdmin
}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-none p-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">Total de Cuentas</span>
          <span className="text-2xl font-bold font-mono text-white mt-0.5 block">
            {totalUsers}
          </span>
        </div>
        <div className="w-9 h-9 rounded-none bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
          <UsersIcon className="w-4 h-4" />
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-none p-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">Cuentas en Línea</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-2xl font-bold font-mono text-emerald-400">
              {onlineUsers}
            </span>
            <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
          </div>
        </div>
        <div className="w-9 h-9 rounded-none bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Activity className="w-4 h-4" />
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-none p-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">Mi Sesión</span>
          <span className="text-sm font-bold text-slate-200 mt-0.5 block">
            {currentUser?.username} ({isAdmin ? 'Administrador' : 'Usuario'})
          </span>
        </div>
        <div className="w-9 h-9 rounded-none bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Shield className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
