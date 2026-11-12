import React from 'react';
import {
  Edit2,
  Trash2,
  Cpu,
  MemoryStick,
  HardDrive,
  Loader2
} from 'lucide-react';

export default function ThresholdTable({
  thresholds,
  loading,
  selectedHost,
  onOpenCreate,
  onOpenEdit,
  onDeleteClick
}) {
  return (
    <section className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-none overflow-hidden shadow-lg">
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold text-white">
            Umbrales Activos para <span className="font-mono text-blue-400">{selectedHost.hostname}</span>
          </h3>
          <p className="text-[11px] text-slate-400">Consultados desde la tabla THRESHOLDS</p>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-none">
          {thresholds.length} Registros
        </span>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto mb-2" />
          <span className="text-xs font-mono">Cargando umbrales desde la Base de Datos...</span>
        </div>
      ) : thresholds.length === 0 ? (
        <div className="p-10 text-center text-slate-400 space-y-2">
          <p className="text-xs">No hay umbrales registrados para este equipo.</p>
          <button
            type="button"
            onClick={onOpenCreate}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-none cursor-pointer"
          >
            Crear el primer umbral
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-medium border-b border-slate-800 text-[10px] uppercase">
              <tr>
                <th className="p-3 pl-4">ID</th>
                <th className="p-3">Métrica</th>
                <th className="p-3">Condición Lógica</th>
                <th className="p-3">Porcentaje Límite</th>
                <th className="p-3">Estado</th>
                <th className="p-3 pr-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {thresholds.map((rule) => {
                let metricIcon = Cpu;
                let metricBadge = 'text-red-400 bg-red-500/10 border-red-500/30';
                let metricLabel = 'CPU';

                if (rule.metric_name === 'ram_usage_pct') {
                  metricIcon = MemoryStick;
                  metricBadge = 'text-sky-400 bg-sky-500/10 border-sky-500/30';
                  metricLabel = 'RAM';
                } else if (rule.metric_name === 'disk_usage_pct') {
                  metricIcon = HardDrive;
                  metricBadge = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
                  metricLabel = 'Almacenamiento';
                }

                const IconComp = metricIcon;
                const isActive = Boolean(Number(rule.is_active));

                return (
                  <tr key={rule.threshold_id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 pl-4 font-mono text-slate-400">{rule.threshold_id}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none font-semibold text-[11px] border ${metricBadge}`}>
                        <IconComp className="w-3.5 h-3.5" />
                        {metricLabel}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-200">
                      {rule.metric_name} {rule.comparison_operator} {rule.threshold_value}%
                    </td>
                    <td className="p-3 font-mono font-bold text-white">
                      {rule.threshold_value}%
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-none font-semibold text-[10px] uppercase tracking-wider ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenEdit(rule)}
                          className="p-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                          title="Editar umbral"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteClick(rule.threshold_id)}
                          className="p-1.5 rounded-none bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                          title="Eliminar umbral"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
