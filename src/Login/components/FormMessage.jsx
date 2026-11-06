import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FormMessage({ type, message }) {
  if (!message) return null;

  if (type === 'success') {
    return (
      <div className="mb-4 p-3 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-start gap-2.5 animate-in fade-in">
        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-semibold block text-emerald-300">¡Correcto!</span>
          {message}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 p-3 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-start gap-2.5 animate-in fade-in">
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <div className="text-xs leading-relaxed">
        <span className="font-semibold block text-rose-300">Aviso</span>
        {message}
      </div>
    </div>
  );
}
