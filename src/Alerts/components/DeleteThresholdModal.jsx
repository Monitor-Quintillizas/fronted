import React from 'react';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteThresholdModal({
  deletingRuleId,
  actionLoading,
  onCancel,
  onConfirm
}) {
  if (!deletingRuleId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-none p-5 space-y-4 shadow-2xl text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-400">
          <Trash2 className="w-5 h-5" />
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">¿Confirmas la eliminación del umbral?</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Esta acción ejecutará una eliminación en la Base de Datos para el registro ID #{deletingRuleId}.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={actionLoading}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-none transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={actionLoading}
            className="px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-none transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {actionLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            <span>Sí, Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
