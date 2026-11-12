import React from 'react';
import { Trash2, Server } from 'lucide-react';

export default function UserRow({ user, onDeleteClick }) {
  const {
    isMe,
    isUserAdmin,
    isPrimaryAdmin,
    canDelete,
    username,
    email,
    is_online,
    current_host,
    last_cpu,
    cpuPercentage,
    cpuBarColor,
    last_ram,
    ramPercentage,
    ramBarColor,
    lastActivity,
    initials
  } = user;

  return (
    <tr
      className={`hover:bg-slate-800/40 transition-colors ${
        isMe ? 'bg-blue-500/5' : ''
      }`}
    >
      {/* Usuario */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-none flex items-center justify-center text-xs font-bold font-mono ${
              isUserAdmin
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-100">{username}</span>
              {isMe && (
                <span className="text-[9px] px-1 py-0.2 rounded-none bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Tú
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block">{email}</span>
          </div>
        </div>
      </td>

      {/* Estado */}
      <td className="py-3 px-4">
        {is_online ? (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
            En línea
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-none bg-slate-500" />
            Inactivo
          </span>
        )}
      </td>

      {/* Rol */}
      <td className="py-3 px-4">
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-none ${
            isUserAdmin
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
              : 'bg-slate-800 text-slate-300'
          }`}
        >
          {isUserAdmin ? 'Administrador' : 'Usuario'}
        </span>
      </td>

      {/* Equipo */}
      <td className="py-3 px-4 font-mono text-slate-300 text-[11px]">
        <div className="flex items-center gap-1.5">
          <Server className="w-3 h-3 text-slate-500" />
          <span>{current_host || 'Mi Computadora'}</span>
        </div>
      </td>

      {/* CPU */}
      <td className="py-3 px-4">
        <div className="w-24 space-y-1">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-slate-400">CPU</span>
            <span className="text-slate-200 font-bold">{last_cpu}%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-none overflow-hidden">
            <div
              className={`h-full ${cpuBarColor}`}
              style={{ width: `${cpuPercentage}%` }}
            />
          </div>
        </div>
      </td>

      {/* RAM */}
      <td className="py-3 px-4">
        <div className="w-24 space-y-1">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-slate-400">RAM</span>
            <span className="text-slate-200 font-bold">{last_ram}%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-none overflow-hidden">
            <div
              className={`h-full ${ramBarColor}`}
              style={{ width: `${ramPercentage}%` }}
            />
          </div>
        </div>
      </td>

      {/* Última Actividad */}
      <td className="py-3 px-4 font-mono text-slate-400 text-[10px]">
        {lastActivity}
      </td>

      {/* Acciones */}
      <td className="py-3 px-4 text-right">
        {isPrimaryAdmin ? (
          <span className="text-[10px] text-slate-500 italic">Admin Principal</span>
        ) : canDelete ? (
          <button
            type="button"
            onClick={() => onDeleteClick(user)}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 rounded-none transition-all cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>{isMe ? 'Eliminar cuenta' : 'Eliminar'}</span>
          </button>
        ) : (
          <span className="text-slate-600">-</span>
        )}
      </td>
    </tr>
  );
}
