import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function StatusMessage({ statusMessage }) {
  if (!statusMessage || !statusMessage.text) return null;

  const isError = statusMessage.type === 'error';

  return (
    <div
      className={`p-3 rounded-none text-xs flex items-center gap-2.5 animate-in fade-in ${
        isError
          ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
          : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
      }`}
    >
      {isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
      <span>{statusMessage.text}</span>
    </div>
  );
}
