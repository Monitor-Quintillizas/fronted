import React from 'react';
import { Database } from 'lucide-react';

export default function HistoryEmpty({ serverMessage }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-none p-10 text-center my-4 space-y-3">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-slate-800 text-slate-500 border border-slate-700">
        <Database className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-200">Sin Registros en el Rango Consultado</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-0.5">
          {serverMessage || 'No existen registros en el rango de fechas consultado para este equipo.'}
        </p>
      </div>
    </div>
  );
}
