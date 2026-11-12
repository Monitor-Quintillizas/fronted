import React from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';

export default function HistoryFilters({
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  metricFilter,
  onMetricFilterChange,
  onSubmit,
  loading,
  validationError
}) {
  return (
    <section className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-none p-4 shadow-lg">
      <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-300">
            Fecha y Hora Inicio
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none px-3 py-1.5 text-xs text-slate-200 font-mono outline-none"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-300">
            Fecha y Hora Fin
          </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none px-3 py-1.5 text-xs text-slate-200 font-mono outline-none"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-300">
            Métrica a Mostrar
          </label>
          <select
            value={metricFilter}
            onChange={(e) => onMetricFilterChange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none px-3 py-1.5 text-xs text-slate-200 outline-none"
          >
            <option value="all">Todas las Métricas</option>
            <option value="cpu">CPU (Rojo)</option>
            <option value="ram">RAM (Azul)</option>
            <option value="disk">Almacenamiento (Verde)</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-1.5 rounded-none text-xs transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Consultando...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Consultar Historial</span>
              </>
            )}
          </button>
        </div>
      </form>

      {validationError && (
        <div className="mt-3 p-2.5 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}
    </section>
  );
}
