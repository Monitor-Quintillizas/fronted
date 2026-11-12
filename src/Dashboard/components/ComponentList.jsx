import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function ComponentList({
  componentsConfig,
  activeTab,
  onSelectTab,
  metrics,
  liveChartData
}) {
  return (
    <div className="lg:col-span-4 space-y-2">
      {Object.values(componentsConfig).map((tab) => {
        const isSelected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`w-full text-left p-3 border transition-all cursor-pointer flex items-center justify-between gap-3 relative overflow-hidden rounded-none backdrop-blur-md ${
              isSelected
                ? `bg-slate-900/95 ${tab.borderColor} shadow-lg ${tab.activeShadow} ring-1 ${tab.ringColor}`
                : 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
            }`}
          >
            {isSelected && (
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: tab.color }}
              />
            )}

            <div className="space-y-0.5 pl-1.5">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-100">{tab.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">({tab.subtitle})</span>
              </div>
              <div className="text-lg font-mono font-bold text-white">
                {tab.id === 'cpu'
                  ? `${metrics ? metrics.cpu_usage_pct : 0}%`
                  : tab.id === 'ram'
                  ? `${metrics ? metrics.ram_usage_pct : 0}%`
                  : tab.id === 'disk'
                  ? `${metrics ? metrics.disk_usage_pct : 0}%`
                  : tab.id === 'net'
                  ? '12 Kbps'
                  : '18%'}
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate max-w-[160px]">
                {tab.id === 'cpu'
                  ? `${metrics?.cpu_cores_logical || 16} Hilos • 3.20 GHz`
                  : tab.id === 'ram'
                  ? `${metrics?.ram_used_mb ? (metrics.ram_used_mb / 1024).toFixed(1) : '19.6'} / ${metrics?.ram_total_mb ? (metrics.ram_total_mb / 1024).toFixed(1) : '32.0'} GB`
                  : tab.id === 'disk'
                  ? `${metrics?.disk_used_gb || 390.9} / ${metrics?.disk_total_gb || 474.4} GB`
                  : tab.id === 'net'
                  ? 'S: 0 • R: 12 Kbps'
                  : 'DirectX 12'}
              </div>
            </div>

            <div className="w-20 h-10 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={liveChartData}>
                  <Area
                    type="monotone"
                    dataKey={tab.sparkKey}
                    stroke={tab.color}
                    strokeWidth={1.5}
                    fill={tab.color}
                    fillOpacity={0.15}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </button>
        );
      })}
    </div>
  );
}
