import React from 'react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function UsersNotifications({
  error,
  successMsg,
  onClearError,
  onClearSuccess
}) {
  return (
    <>
      {error && (
        <div className="p-3 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={onClearError}
            className="text-rose-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button
            type="button"
            onClick={onClearSuccess}
            className="text-emerald-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
