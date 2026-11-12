import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateValidPercentage, METRIC_CARD_THEMES } from '../utils/metricHelpers';

export default function MetricCard({
  type = 'cpu',
  title = 'Uso de CPU',
  value = '48.5%',
  percentage = 48.5,
  subtitle = '8 Cores @ 3.60 GHz',
  details = [
    { label: 'Temperatura', value: '54°C' },
    { label: 'Procesos', value: '184' }
  ],
  trend = '+2.4%',
  trendUp = true,
  threshold = 80
}) {
  const currentTheme = METRIC_CARD_THEMES[type] || METRIC_CARD_THEMES.cpu;
  const IconComponent = currentTheme.icon;
  const isHighLoad = percentage >= threshold;
  const validPercentage = calculateValidPercentage(percentage);

  return (
    <div
      className={`relative bg-slate-900/85 backdrop-blur-md rounded-none p-4 border border-slate-800 transition-all duration-200 ${currentTheme.hoverBorder} shadow-lg flex flex-col justify-between overflow-hidden`}
    >
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-none opacity-10 blur-2xl pointer-events-none ${
        type === 'cpu' ? 'bg-red-500' : type === 'ram' ? 'bg-sky-500' : 'bg-emerald-500'
      }`} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-none flex items-center justify-center border ${currentTheme.iconBg}`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100">{title}</h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{subtitle}</p>
          </div>
        </div>

        {isHighLoad ? (
          <div className="flex items-center gap-1 px-1.5 py-0.2 rounded-none text-[10px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            <span>&gt;{threshold}%</span>
          </div>
        ) : (
          <div className={`px-1.5 py-0.2 rounded-none text-[10px] font-semibold border ${currentTheme.badgeBg}`}>
            Normal
          </div>
        )}
      </div>

      <div className="my-3">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold font-mono tracking-tight text-white">{value}</span>
          {trend && (
            <div className={`flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.2 rounded-none ${
              trendUp
                ? isHighLoad ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20' : 'text-slate-300 bg-slate-800'
                : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
            }`}>
              {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{trend}</span>
            </div>
          )}
        </div>

        <div className="w-full h-1.5 bg-slate-800 rounded-none mt-2 overflow-hidden">
          <div
            className={`h-full rounded-none transition-all duration-500 ${
              isHighLoad ? 'bg-rose-500 shadow-sm shadow-rose-500/50' : `${currentTheme.barBg} shadow-sm ${currentTheme.barGlow}`
            }`}
            style={{ width: `${validPercentage}%` }}
          />
        </div>
      </div>

      {details && details.length > 0 && (
        <div className="pt-2.5 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
          {details.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-slate-400">{item.label}:</span>
              <span className="text-slate-200 font-mono font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
