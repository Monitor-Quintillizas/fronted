import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function ComponentChart({ liveChartData, currentTheme }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
        <span>100%</span>
        <span>Ventana de 60 segundos</span>
      </div>

      <div className="h-60 w-full bg-slate-950/90 border border-slate-800 p-2 relative overflow-hidden rounded-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={liveChartData}>
            <defs>
              <linearGradient id={currentTheme.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentTheme.color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={currentTheme.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 2" stroke="#334155" opacity={0.35} />
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0px',
                color: '#f8fafc',
                fontSize: '11px',
                fontFamily: 'monospace'
              }}
              formatter={(val) => [`${val}${currentTheme.unit}`, currentTheme.title]}
            />
            <Area
              type="monotone"
              dataKey={currentTheme.sparkKey}
              stroke={currentTheme.color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${currentTheme.gradientId})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="absolute bottom-1.5 left-2.5 text-[9px] font-mono text-slate-500">
          0%
        </div>
      </div>
    </div>
  );
}
