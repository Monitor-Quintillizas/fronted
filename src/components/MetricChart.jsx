import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Activity, Clock } from 'lucide-react';

const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-lg p-3 shadow-xl min-w-[160px] text-xs">
        <div className="text-slate-400 font-mono pb-1.5 mb-2 border-b border-slate-800 flex items-center justify-between">
          <span>Muestra: {label}</span>
          <span className="text-emerald-400">● En vivo</span>
        </div>

        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-300 capitalize">{entry.name}:</span>
              </div>
              <span className="font-mono font-bold text-white">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const DEFAULT_SERIES_DATA = [
  { time: '16:00', cpu: 34, ram: 62, disk: 45 },
  { time: '16:05', cpu: 48, ram: 64, disk: 45 },
  { time: '16:10', cpu: 56, ram: 68, disk: 46 },
  { time: '16:15', cpu: 78, ram: 71, disk: 46 },
  { time: '16:20', cpu: 65, ram: 70, disk: 47 },
  { time: '16:25', cpu: 52, ram: 69, disk: 47 },
  { time: '16:30', cpu: 70, ram: 74, disk: 48 },
  { time: '16:35', cpu: 84, ram: 76, disk: 48 },
  { time: '16:40', cpu: 58, ram: 72, disk: 48 },
  { time: '16:45', cpu: 49, ram: 70, disk: 49 },
  { time: '16:50', cpu: 62, ram: 75, disk: 49 },
  { time: '16:55', cpu: 45, ram: 71, disk: 50 }
];

export default function MetricChart({ data = DEFAULT_SERIES_DATA, hostName = 'prod-api-cluster-01' }) {
  const [timeRange, setTimeRange] = useState('1h');
  const [visible, setVisible] = useState({ cpu: true, ram: true, disk: true });

  const toggleMetric = (key) => {
    setVisible(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-slate-800 shadow-lg shadow-black/20">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-100">Telemetría en Tiempo Real</h3>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live • 1s
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Supervisión de métricas para <span className="text-slate-200 font-mono font-medium">{hostName}</span>
            </p>
          </div>
        </div>

        {/* Series Toggles & Time Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Series Toggle Chips */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => toggleMetric('cpu')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                visible.cpu
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              CPU
            </button>

            <button
              type="button"
              onClick={() => toggleMetric('ram')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                visible.ram
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              RAM
            </button>

            <button
              type="button"
              onClick={() => toggleMetric('disk')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                visible.disk
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Disco
            </button>
          </div>

          {/* Time range switcher */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs">
            {['5m', '15m', '1h', '6h', '24h'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-2 py-1 rounded-md font-medium transition-all ${
                  timeRange === range
                    ? 'bg-slate-800 text-slate-100 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="cpuBlueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="ramAmberGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="diskEmeraldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#334155' }} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} axisLine={{ stroke: '#334155' }} />
            <Tooltip content={<CustomChartTooltip />} />

            {visible.cpu && (
              <Area type="monotone" dataKey="cpu" name="CPU" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#cpuBlueGrad)" />
            )}
            {visible.ram && (
              <Area type="monotone" dataKey="ram" name="RAM" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#ramAmberGrad)" />
            )}
            {visible.disk && (
              <Area type="monotone" dataKey="disk" name="Disco" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#diskEmeraldGrad)" />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Indicators */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span>Pico CPU: <strong className="text-blue-400 font-mono">84.0%</strong></span>
          <span>Promedio RAM: <strong className="text-amber-400 font-mono">70.6%</strong></span>
          <span>Uso Disco: <strong className="text-emerald-400 font-mono">50.0%</strong></span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Intervalo de muestreo: 1,000ms</span>
        </div>
      </div>
    </div>
  );
}
