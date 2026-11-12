import React from 'react';
import { Link } from 'react-router-dom';
import { Users as UsersIcon, Trash2, LogOut } from 'lucide-react';

export default function ProfileMenu({
  user,
  isAdmin,
  closeMenu,
  onOpenDeleteModal,
  onLogout
}) {
  return (
    <div
      className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-none shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
      onMouseLeave={closeMenu}
    >
      <div className="px-3 py-2 border-b border-slate-800 text-xs">
        <span className="text-slate-400 block text-[11px]">Conectado como</span>
        <span className="font-bold text-slate-200 block truncate">{user?.username}</span>
        <span className="text-[10px] text-emerald-400 font-mono">
          Rol: {isAdmin ? 'Administrador Total' : 'Usuario'}
        </span>
      </div>

      <Link
        to="/users"
        onClick={closeMenu}
        className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-none transition-colors"
      >
        <UsersIcon className="w-3.5 h-3.5 text-blue-400" />
        <span>Panel de Usuarios</span>
      </Link>

      {user?.username !== 'admin' && (
        <button
          type="button"
          onClick={onOpenDeleteModal}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-rose-400 hover:text-white hover:bg-rose-600 rounded-none transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Eliminar mi cuenta</span>
        </button>
      )}

      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-none transition-colors cursor-pointer border-t border-slate-800/60 mt-1"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
}
