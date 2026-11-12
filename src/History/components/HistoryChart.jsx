import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function HistoryChart({ formattedChartData, metricFilter, hostname }) {
  return (
    <section className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-none p-4 shadow-lg">
      <div className="pb-3 mb-3 border-b border-slate-800">
        <h3 className="text-xs font-semibold text-white">Curva de Telemetría Histórica</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Muestras obtenidas para <span className="text-slate-200 font-mono">{hostname}</span>
        </p>
      </div>

      <div className="w-full h-72 pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedChartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="histCpuGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="histRamGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="histDiskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={{ stroke: '#334155' }} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} axisLine={{ stroke: '#334155' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0px',
                fontSize: '11px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

            {(metricFilter === 'all' || metricFilter === 'cpu') && (
              <Area type="monotone" dataKey="cpu" name="CPU (%)" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#histCpuGrad)" />
            )}
            {(metricFilter === 'all' || metricFilter === 'ram') && (
              <Area type="monotone" dataKey="ram" name="RAM (%)" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#histRamGrad)" />
            )}
            {(metricFilter === 'all' || metricFilter === 'disk') && (
              <Area type="monotone" dataKey="disk" name="Disco (%)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#histDiskGrad)" />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
