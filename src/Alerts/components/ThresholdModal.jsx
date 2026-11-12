import React from 'react';
import {
  Sliders,
  X,
  Cpu,
  MemoryStick,
  HardDrive,
  Loader2
} from 'lucide-react';

export default function ThresholdModal({
  isOpen,
  editingRule,
  selectedHost,
  formMetric,
  formOperator,
  formValue,
  formActive,
  actionLoading,
  onMetricChange,
  onOperatorChange,
  onValueChange,
  onActiveChange,
  onClose,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-none shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {editingRule ? 'Modificar Umbral de Alerta' : 'Crear Umbral en Base de Datos'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Host: <span className="font-mono text-slate-200">{selectedHost.hostname}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-none hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="p-5 space-y-4 text-xs">
          {/* Selector Visual de Métrica */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-300">Métrica a Supervisar</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => onMetricChange('cpu_usage_pct')}
                className={`p-3 rounded-none border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  formMetric === 'cpu_usage_pct'
                    ? 'bg-red-500/20 border-red-500 text-red-400 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Cpu className="w-5 h-5" />
                <span>CPU</span>
              </button>

              <button
                type="button"
                onClick={() => onMetricChange('ram_usage_pct')}
                className={`p-3 rounded-none border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  formMetric === 'ram_usage_pct'
                    ? 'bg-sky-500/20 border-sky-500 text-sky-400 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <MemoryStick className="w-5 h-5" />
                <span>RAM</span>
              </button>

              <button
                type="button"
                onClick={() => onMetricChange('disk_usage_pct')}
                className={`p-3 rounded-none border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  formMetric === 'disk_usage_pct'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <HardDrive className="w-5 h-5" />
                <span>Disco</span>
              </button>
            </div>
          </div>

          {/* Operador de Comparación */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-300">Operador de Comparación</label>
            <select
              value={formOperator}
              onChange={(e) => onOperatorChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none px-3 py-2 text-slate-100 outline-none"
            >
              <option value=">">Mayor que (&gt;)</option>
              <option value=">=">Mayor o igual que (&gt;=)</option>
              <option value="<">Menor que (&lt;)</option>
              <option value="<=">Menor o igual que (&lt;=)</option>
              <option value="=">Igual a (=)</option>
            </select>
          </div>

          {/* Slider de Porcentaje Límite */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300">Porcentaje Límite (%)</label>
              <span className={`text-sm font-bold font-mono ${
                formValue >= 80 ? 'text-rose-400' : 'text-blue-400'
              }`}>
                {formValue}%
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="99"
              value={formValue}
              onChange={(e) => onValueChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-none appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Estado Activo (para editar) */}
          {editingRule && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isActive"
                checked={formActive}
                onChange={(e) => onActiveChange(e.target.checked)}
                className="w-4 h-4 rounded-none bg-slate-950 border-slate-700 text-blue-600 accent-blue-600"
              />
              <label htmlFor="isActive" className="text-slate-300 font-semibold cursor-pointer">
                Regla Activa
              </label>
            </div>
          )}

          {/* Botones de Acción */}
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={actionLoading}
              className="px-4 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-5 py-2 rounded-none bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              <span>{editingRule ? 'Guardar Cambios' : 'Crear Umbral'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
