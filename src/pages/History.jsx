import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { metricsService } from '../services/metricsService';
import {
  Search,
  Database,
  Loader2,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function History() {
  const [selectedHost, setSelectedHost] = useState({
    host_id: 1,
    hostname: 'Evangelin (Mi PC)',
    ip_address: '127.0.0.1',
    operating_system: 'Windows 11 (AMD64)'
  });

  const getDefaultStartDate = () => {
    const d = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 16);
  };
  const getDefaultEndDate = () => {
    const d = new Date();
    return d.toISOString().slice(0, 16);
  };

  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [metricFilter, setMetricFilter] = useState('all');
  
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [serverMessage, setServerMessage] = useState('');

  const fetchHistory = useCallback(async () => {
    setValidationError('');
    setServerMessage('');

    if (new Date(startDate) >= new Date(endDate)) {
      setValidationError("La fecha inicial debe ser estrictamente anterior a la fecha final.");
      return;
    }

    setLoading(true);

    try {
      const res = await metricsService.getHistory(selectedHost.host_id, startDate, endDate);
      if (res && res.ok) {
        const rawData = res.data || [];
        setHistoryData(rawData);
        if (rawData.length === 0) {
          setServerMessage("No existen registros en el rango de fechas consultado.");
        }
      } else {
        setServerMessage(res?.mensaje || "Error al obtener registros.");
      }
    } catch (err) {
      console.error("Error al consultar historial:", err);
      setValidationError("No se pudo conectar con el servidor para consultar el historial.");
    } finally {
      setLoading(false);
    }
  }, [selectedHost.host_id, startDate, endDate]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleQuery = (e) => {
    e.preventDefault();
    fetchHistory();
  };

  const formattedChartData = historyData.map((item) => ({
    time: item.measured_at ? item.measured_at.slice(11, 16) : '',
    fullDate: item.measured_at,
    cpu: Number(item.cpu_usage_pct),
    ram: Number(item.ram_usage_pct),
    disk: Number(item.disk_usage_pct)
  }));

  const cpuValues = historyData.map(h => Number(h.cpu_usage_pct));
  const ramValues = historyData.map(h => Number(h.ram_usage_pct));
  const peakCpu = cpuValues.length > 0 ? Math.max(...cpuValues).toFixed(1) : '0.0';
  const avgRam = ramValues.length > 0 ? (ramValues.reduce((a, b) => a + b, 0) / ramValues.length).toFixed(1) : '0.0';

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
        <Navbar selectedHost={selectedHost} onSelectHost={setSelectedHost} />

        <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold tracking-wider uppercase">
              <span>Telemetría Histórica</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Consultas de Base de Datos</span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight mt-0.5">
              Historial de Rendimiento del Equipo
            </h1>
          </div>

          {/* Barra de Filtros */}
          <section className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-none p-4 shadow-lg">
            <form onSubmit={handleQuery} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Fecha y Hora Inicio
                </label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none px-3 py-1.5 text-xs text-slate-200 font-mono outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Fecha y Hora Fin
                </label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none px-3 py-1.5 text-xs text-slate-200 font-mono outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Métrica a Mostrar
                </label>
                <select
                  value={metricFilter}
                  onChange={(e) => setMetricFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-none px-3 py-1.5 text-xs text-slate-200 outline-none"
                >
                  <option value="all">Todas las Métricas</option>
                  <option value="cpu">CPU (Rojo)</option>
                  <option value="ram">RAM (Azul)</option>
                  <option value="disk">Almacenamiento (Verde)</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-1.5 rounded-none text-xs transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Consultando...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Consultar Historial</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {validationError && (
              <div className="mt-3 p-2.5 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </section>

          {loading ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-none p-14 text-center my-4 space-y-2">
              <Loader2 className="w-7 h-7 animate-spin text-blue-500 mx-auto" />
              <p className="text-xs font-mono text-slate-400">Consultando base de datos...</p>
            </div>
          ) : historyData.length === 0 ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-none p-10 text-center my-4 space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-slate-800 text-slate-500 border border-slate-700">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Sin Registros en el Rango Consultado</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-0.5">
                  {serverMessage || "No existen registros en el rango de fechas consultado para este equipo."}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Tarjetas KPI */}
              <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-900/80 border border-slate-800 rounded-none p-3.5 border-l-4 border-l-red-500">
                  <span className="text-xs text-slate-400 font-medium">Pico Máximo de CPU</span>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">{peakCpu}%</div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-none p-3.5 border-l-4 border-l-sky-500">
                  <span className="text-xs text-slate-400 font-medium">Promedio de RAM</span>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">{avgRam}%</div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-none p-3.5 border-l-4 border-l-emerald-500">
                  <span className="text-xs text-slate-400 font-medium">Total de Muestras</span>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">{historyData.length}</div>
                </div>
              </section>

              {/* Gráfica */}
              <section className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-none p-4 shadow-lg">
                <div className="pb-3 mb-3 border-b border-slate-800">
                  <h3 className="text-xs font-semibold text-white">Curva de Telemetría Histórica</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Muestras obtenidas para <span className="text-slate-200 font-mono">{selectedHost.hostname}</span>
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

              {/* Tabla de Base de Datos */}
              <section className="bg-slate-900/85 border border-slate-800 rounded-none overflow-hidden shadow-lg">
                <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-white">Tabla de Registros de Telemetría</h3>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-none">
                    {historyData.length} Muestras
                  </span>
                </div>

                <div className="overflow-x-auto max-h-64">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-medium border-b border-slate-800 sticky top-0 text-[10px] uppercase">
                      <tr>
                        <th className="p-2.5 pl-4">ID Métrica</th>
                        <th className="p-2.5">Fecha y Hora Medición</th>
                        <th className="p-2.5">Uso CPU</th>
                        <th className="p-2.5">RAM Utilizada</th>
                        <th className="p-2.5">Uso RAM</th>
                        <th className="p-2.5 pr-4">Uso Disco</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {historyData.map((row, idx) => (
                        <tr key={row.metric_id || idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-2.5 pl-4 font-mono text-slate-400">{row.metric_id || idx + 1}</td>
                          <td className="p-2.5 font-mono text-slate-200">{row.measured_at}</td>
                          <td className="p-2.5 font-mono font-semibold text-red-400">{row.cpu_usage_pct}%</td>
                          <td className="p-2.5 font-mono text-slate-300">{row.ram_used_mb} MB</td>
                          <td className="p-2.5 font-mono font-semibold text-sky-400">{row.ram_usage_pct}%</td>
                          <td className="p-2.5 pr-4 font-mono font-semibold text-emerald-400">{row.disk_usage_pct}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
