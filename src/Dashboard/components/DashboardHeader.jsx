import React from 'react';
import { Server, Monitor, LayoutGrid, RefreshCw } from 'lucide-react';

export default function DashboardHeader({
  hostnameDisplay,
  selectedHost,
  osDisplay,
  uptimeFormatted,
  viewMode,
  onViewModeChange,
  onRefetch,
  loading
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/85 backdrop-blur-md border border-slate-800/90 rounded-none p-3.5 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-none bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
          <Server className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-white tracking-tight">{hostnameDisplay}</h1>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
              Base de Datos Conectada
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
            IP: <span className="text-slate-200">{selectedHost.ip_address}</span> • SO: <span className="text-slate-200">{osDisplay}</span> • Uptime: <span className="text-emerald-400">{uptimeFormatted}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-950/80 p-1 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => onViewModeChange('taskmgr')}
            className={`flex items-center gap-1.5 px-3 py-1 font-semibold rounded-none transition-all cursor-pointer ${
              viewMode === 'taskmgr'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Rendimiento</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('cards')}
            className={`flex items-center gap-1.5 px-3 py-1 font-semibold rounded-none transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Tarjetas</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onRefetch}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-none transition-all cursor-pointer"
          title="Refrescar muestra"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-sky-400' : ''}`} />
        </button>
      </div>
    </div>
  );
}
