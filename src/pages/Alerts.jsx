import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { thresholdsService } from '../services/thresholdsService';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Cpu,
  MemoryStick,
  HardDrive,
  Sliders,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function Alerts() {
  const [selectedHost, setSelectedHost] = useState({
    host_id: 1,
    hostname: 'Servidor-Principal',
    ip_address: '192.168.1.100',
    operating_system: 'Linux Mint / Ubuntu 24.04'
  });

  const [thresholds, setThresholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  // Delete Confirmation State
  const [deletingRuleId, setDeletingRuleId] = useState(null);

  // Form State
  const [formMetric, setFormMetric] = useState('cpu_usage_pct');
  const [formOperator, setFormOperator] = useState('>');
  const [formValue, setFormValue] = useState(80);
  const [formActive, setFormActive] = useState(true);

  // Cargar lista de umbrales desde el Backend PHP
  const loadThresholds = useCallback(async () => {
    setLoading(true);
    try {
      const data = await thresholdsService.getThresholds(selectedHost.host_id);
      setThresholds(data || []);
    } catch (err) {
      console.error("Error al cargar umbrales:", err);
      setStatusMessage({ type: 'error', text: 'No se pudieron cargar los umbrales del backend.' });
    } finally {
      setLoading(false);
    }
  }, [selectedHost.host_id]);

  useEffect(() => {
    loadThresholds();
  }, [loadThresholds]);

  // Abrir Modal para Crear
  const handleOpenCreate = () => {
    setEditingRule(null);
    setFormMetric('cpu_usage_pct');
    setFormOperator('>');
    setFormValue(80);
    setFormActive(true);
    setIsModalOpen(true);
    setStatusMessage({ type: '', text: '' });
  };

  // Abrir Modal para Editar
  const handleOpenEdit = (rule) => {
    setEditingRule(rule);
    setFormMetric(rule.metric_name);
    setFormOperator(rule.comparison_operator);
    setFormValue(Number(rule.threshold_value));
    setFormActive(Boolean(rule.is_active));
    setIsModalOpen(true);
    setStatusMessage({ type: '', text: '' });
  };

  // Guardar (Crear / Actualizar en Backend)
  const handleSave = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      if (editingRule) {
        // Actualizar umbral existente
        const res = await thresholdsService.updateThreshold({
          threshold_id: editingRule.threshold_id,
          metric_name: formMetric,
          comparison_operator: formOperator,
          threshold_value: formValue,
          is_active: formActive ? 1 : 0
        });

        if (res && res.ok) {
          setStatusMessage({ type: 'success', text: 'Umbral actualizado correctamente en la Base de Datos.' });
          setIsModalOpen(false);
          loadThresholds();
        }
      } else {
        // Crear nuevo umbral
        const res = await thresholdsService.createThreshold({
          host_id: selectedHost.host_id,
          metric_name: formMetric,
          comparison_operator: formOperator,
          threshold_value: formValue
        });

        if (res && res.ok) {
          setStatusMessage({ type: 'success', text: 'Nuevo umbral guardado exitosamente en la Base de Datos.' });
          setIsModalOpen(false);
          loadThresholds();
        }
      }
    } catch (err) {
      console.error("Error al guardar umbral:", err);
      setStatusMessage({ type: 'error', text: 'Error al comunicarse con el backend para guardar el umbral.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Eliminar Umbral (Confirmado)
  const handleDelete = async () => {
    if (!deletingRuleId) return;
    setActionLoading(true);

    try {
      const res = await thresholdsService.deleteThreshold(deletingRuleId);
      if (res && res.ok) {
        setStatusMessage({ type: 'success', text: 'Umbral eliminado de la Base de Datos.' });
        setDeletingRuleId(null);
        loadThresholds();
      }
    } catch (err) {
      console.error("Error al eliminar umbral:", err);
      setStatusMessage({ type: 'error', text: 'No se pudo eliminar el umbral en el servidor.' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100 relative overflow-x-hidden">
      {/* Fondo con Wallpaper de Pantalla */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/backgrounds/quintuplets_master.jpg"
          alt="Wallpaper"
          className="w-full h-full object-cover opacity-20 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>

      <div className="relative z-10">
        {/* Top Navigation */}
        <Navbar selectedHost={selectedHost} onSelectHost={setSelectedHost} />

        <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          {/* Header Ribbon & Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold tracking-wider uppercase">
                <span>Gestión de Reglas</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Servicios Backend PHP</span>
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight mt-0.5">
                Configuración de Umbrales de Alerta
              </h1>
            </div>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-semibold px-4 py-2 rounded-none text-xs transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Regla de Umbral</span>
            </button>
          </div>

          {/* Mensaje de Estado / Feedback */}
          {statusMessage.text && (
            <div className={`p-3 rounded-none text-xs flex items-center gap-2.5 animate-in fade-in ${
              statusMessage.type === 'error'
                ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            }`}>
              {statusMessage.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Tabla de Umbrales */}
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
                  onClick={handleOpenCreate}
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
                                onClick={() => handleOpenEdit(rule)}
                                className="p-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                                title="Editar umbral"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setDeletingRuleId(rule.threshold_id)}
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
        </main>
      </div>

      {/* Modal: Crear / Editar Umbral */}
      {isModalOpen && (
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
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-none hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              {/* Selector Visual de Métrica */}
              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-300">Métrica a Supervisar</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormMetric('cpu_usage_pct')}
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
                    onClick={() => setFormMetric('ram_usage_pct')}
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
                    onClick={() => setFormMetric('disk_usage_pct')}
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
                  onChange={(e) => setFormOperator(e.target.value)}
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
                  onChange={(e) => setFormValue(Number(e.target.value))}
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
                    onChange={(e) => setFormActive(e.target.checked)}
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
                  onClick={() => setIsModalOpen(false)}
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
      )}

      {/* Modal: Confirmación antes de eliminar */}
      {deletingRuleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-none p-5 space-y-4 shadow-2xl text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Trash2 className="w-5 h-5" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">¿Confirmas la eliminación del umbral?</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Esta acción ejecutará una eliminación en la Base de Datos para el registro ID #{deletingRuleId}.
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingRuleId(null)}
                disabled={actionLoading}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-none transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={actionLoading}
                className="px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-none transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {actionLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                <span>Sí, Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
