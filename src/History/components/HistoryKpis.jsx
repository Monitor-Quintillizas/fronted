import React from 'react';

export default function HistoryKpis({ peakCpu, avgRam, totalSamples }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="bg-slate-900/80 border border-slate-800 rounded-none p-3.5 border-l-4 border-l-red-500">
        <span className="text-xs text-slate-400 font-medium">Pico Máximo de CPU</span>
        <div className="text-xl font-bold font-mono text-white mt-0.5">{peakCpu}%</div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-none p-3.5 border-l-4 border-l-sky-500">
        <span className="text-xs text-slate-400 font-medium">Promedio de RAM</span>
        <div className="text-xl font-bold font-mono text-white mt-0.5">{avgRam}%</div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-none p-3.5 border-l-4 border-l-emerald-500">
        <span className="text-xs text-slate-400 font-medium">Total de Muestras</span>
        <div className="text-xl font-bold font-mono text-white mt-0.5">{totalSamples}</div>
      </div>
    </section>
  );
}
