import React from 'react';
import ComponentChart from './ComponentChart';
import ComponentSpecs from './ComponentSpecs';

export default function ComponentDetail({
  currentTheme,
  liveChartData,
  activeTab,
  metrics,
  selectedHost,
  uptimeFormatted
}) {
  return (
    <div
      className={`lg:col-span-8 bg-slate-900/90 backdrop-blur-md border ${currentTheme.borderColor} rounded-none p-5 shadow-2xl space-y-4 relative overflow-hidden transition-all duration-300`}
    >
      {/* Encabezado del Componente */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {currentTheme.title}
            </h2>
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-none border ${currentTheme.badgeBg}`}
            >
              {currentTheme.subtitle}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono mt-0.5">{currentTheme.fullName}</p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 block font-mono">Utilización al 100%</span>
          <span className="text-2xl font-extrabold font-mono text-white" style={{ color: currentTheme.colorLight }}>
            {currentTheme.currentValue}{currentTheme.unit}
          </span>
        </div>
      </div>

      {/* Gráfica de 60 Segundos */}
      <ComponentChart liveChartData={liveChartData} currentTheme={currentTheme} />

      {/* Especificaciones Técnicas */}
      <ComponentSpecs
        activeTab={activeTab}
        metrics={metrics}
        selectedHost={selectedHost}
        uptimeFormatted={uptimeFormatted}
      />
    </div>
  );
}
