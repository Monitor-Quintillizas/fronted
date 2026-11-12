import React from 'react';

export default function HistoryTable({ historyData }) {
  return (
    <section className="bg-slate-900/85 border border-slate-800 rounded-none overflow-hidden shadow-lg">
      <div className="p-3 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white">Tabla de Registros de Telemetría</h3>
        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-none">
          {historyData.length} Muestras
        </span>
      </div>

      <div className="overflow-x-auto max-h-64">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-medium border-b border-slate-800 sticky top-0 text-[10px] uppercase">
            <tr>
              <th className="p-2.5 pl-4">ID Métrica</th>
              <th className="p-2.5">Fecha y Hora Medición</th>
              <th className="p-2.5">Uso CPU</th>
              <th className="p-2.5">RAM Utilizada</th>
              <th className="p-2.5">Uso RAM</th>
              <th className="p-2.5 pr-4">Uso Disco</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {historyData.map((row, idx) => (
              <tr key={row.metric_id || idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-2.5 pl-4 font-mono text-slate-400">{row.metric_id || idx + 1}</td>
                <td className="p-2.5 font-mono text-slate-200">{row.measured_at}</td>
                <td className="p-2.5 font-mono font-semibold text-red-400">{row.cpu_usage_pct}%</td>
                <td className="p-2.5 font-mono text-slate-300">{row.ram_used_mb} MB</td>
                <td className="p-2.5 font-mono font-semibold text-sky-400">{row.ram_usage_pct}%</td>
                <td className="p-2.5 pr-4 font-mono font-semibold text-emerald-400">{row.disk_usage_pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
