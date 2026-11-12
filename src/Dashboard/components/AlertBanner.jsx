import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function AlertBanner({
  alertTriggered,
  dismissAlert,
  activeAlerts,
  hostnameDisplay,
  onDismiss
}) {
  if (!alertTriggered || dismissAlert) return null;

  return (
    <div className="bg-rose-500/10 border border-rose-500/40 rounded-none p-3 flex flex-wrap items-center justify-between gap-4 animate-in fade-in backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-none bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 flex-shrink-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-rose-300 flex items-center gap-2">
            Umbral de Telemetría Excedido
            <span className="text-[10px] font-mono bg-rose-500/20 text-rose-400 px-1.5 py-0.2 rounded-none border border-rose-500/40">
              ALERTA
            </span>
          </h4>
          <p className="text-xs text-rose-200/90 mt-0.5">
            {activeAlerts && activeAlerts.length > 0
              ? activeAlerts.map((a) => a.message).join(' | ')
              : `El equipo ${hostnameDisplay} ha superado los límites establecidos.`}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="p-1 text-rose-400 hover:text-white rounded-none hover:bg-rose-500/20 transition-colors cursor-pointer"
        title="Cerrar aviso"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
