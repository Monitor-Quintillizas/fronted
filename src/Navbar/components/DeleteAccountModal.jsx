import React from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

export default function DeleteAccountModal({
  isOpen,
  username,
  isDeleting,
  deleteError,
  onCancel,
  onConfirm
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 text-rose-400">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">¿Eliminar tu cuenta?</h3>
            <span className="text-xs text-slate-400">Esta acción borrará tus datos definitivamente</span>
          </div>
        </div>

        {deleteError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs">
            {deleteError}
          </div>
        )}

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          ¿Estás seguro de que deseas eliminar permanentemente la cuenta de{' '}
          <strong className="text-white font-semibold">{username}</strong>? Se cerrará tu sesión de inmediato y no podrás recuperarla.
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Eliminando...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar mi Cuenta</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
