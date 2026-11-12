import React from 'react';
import UserRow from './UserRow';

export default function UsersTable({ usersList, onDeleteClick }) {
  return (
    <section className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-none overflow-hidden shadow-xl">
      <div className="p-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <h3 className="text-xs font-bold text-white flex items-center gap-2">
          <span>Cuentas de Usuario Activas</span>
        </h3>
        <span className="text-[11px] text-slate-400 font-mono">
          Base de Datos: <span className="text-emerald-400">Conectada</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-4">Usuario</th>
              <th className="py-2.5 px-4">Estado</th>
              <th className="py-2.5 px-4">Rol</th>
              <th className="py-2.5 px-4">Equipo Monitoreado</th>
              <th className="py-2.5 px-4">Carga CPU</th>
              <th className="py-2.5 px-4">Carga RAM</th>
              <th className="py-2.5 px-4">Última Actividad</th>
              <th className="py-2.5 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {usersList.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-6 text-center text-slate-500">
                  No se encontraron cuentas registradas.
                </td>
              </tr>
            ) : (
              usersList.map((user) => (
                <UserRow
                  key={user.user_id}
                  user={user}
                  onDeleteClick={onDeleteClick}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
