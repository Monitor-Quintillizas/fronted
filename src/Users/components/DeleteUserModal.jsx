import React from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

export default function DeleteUserModal({
  userToDelete,
  isDeleting,
  onCancel,
  onConfirm
}) {
  if (!userToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-none max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 text-rose-400">
          <div className="w-9 h-9 rounded-none bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">¿Confirmar Eliminación?</h3>
            <span className="text-xs text-slate-400">Esta acción no se puede deshacer</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-none border border-slate-800">
          Estás a punto de eliminar de la base de datos la cuenta de{' '}
          <strong className="text-rose-400">{userToDelete.username}</strong> ({userToDelete.email}).
        </p>

        <div className="flex justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-3 py-1.5 rounded-none text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-3 py-1.5 rounded-none text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Eliminando...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3 h-3" />
                <span>Eliminar Cuenta</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
