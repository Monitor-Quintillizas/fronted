import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MetricCard from '../components/MetricCard';
import { useMetrics } from '../hooks/useMetrics';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Activity,
  Server,
  AlertTriangle,
  RefreshCw,
  LayoutGrid,
  Monitor,
  CheckCircle2,
  X
} from 'lucide-react';

export default function Dashboard() {
  const [selectedHost, setSelectedHost] = useState({
    host_id: 1,
    hostname: 'Evangelin (Mi PC)',
    ip_address: '127.0.0.1',
    operating_system: 'Windows 11 (AMD64)'
  });

  // Pestaña activa del Administrador de Tareas: 'cpu' | 'ram' | 'disk' | 'net' | 'gpu'
  const [activeTab, setActiveTab] = useState('cpu');

  // Modo de visualización: 'taskmgr' (Administrador de Tareas) o 'cards' (Tarjetas)
  const [viewMode, setViewMode] = useState('taskmgr');

  const {
    metrics,
    loading,
    error,
    alertTriggered,
    activeAlerts,
    lastUpdated,
    liveChartData,
    refetch
  } = useMetrics(selectedHost.host_id, 2500);

  const [dismissAlert, setDismissAlert] = useState(false);

  const formatUptime = (seconds) => {
    if (!seconds) return '14:22:10';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const hostnameDisplay = metrics?.hostname ? `${metrics.hostname} (Mi PC)` : selectedHost.hostname;
  const osDisplay = metrics?.os_name || selectedHost.operating_system;

  // Configuración de Componentes de Hardware con Fondos y Colores Dinámicos
  const componentsConfig = {
    cpu: {
      id: 'cpu',
      title: 'CPU',
      subtitle: 'Procesador Principal',
      fullName: `${osDisplay} • ${metrics?.cpu_cores_logical || 16} Procesadores Lógicos`,
      color: '#EF5350', // Red
      colorLight: '#F87171',
      bgImage: '/backgrounds/itsuki_cpu.jpg',
      borderColor: 'border-red-500/50',
      activeBorder: 'border-red-500',
      activeShadow: 'shadow-red-500/20',
      ringColor: 'ring-red-500/40',
      badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
      gradientId: 'cpuGradient',
      unit: '%',
      currentValue: metrics ? Number(metrics.cpu_usage_pct) : 0,
      sparkKey: 'cpu'
    },
    ram: {
      id: 'ram',
      title: 'Memoria',
      subtitle: 'Memoria del Sistema',
      fullName: `${metrics?.ram_total_mb ? (metrics.ram_total_mb / 1024).toFixed(1) + ' GB' : '32.0 GB'} DDR4/DDR5`,
      color: '#38BDF8', // Blue / Cyan
      colorLight: '#7DD3FC',
      bgImage: '/backgrounds/miku_ram.jpg',
      borderColor: 'border-sky-500/50',
      activeBorder: 'border-sky-500',
      activeShadow: 'shadow-sky-500/20',
      ringColor: 'ring-sky-500/40',
      badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
      gradientId: 'ramGradient',
      unit: '%',
      currentValue: metrics ? Number(metrics.ram_usage_pct) : 0,
      sparkKey: 'ram'
    },
    disk: {
      id: 'disk',
      title: 'Disco 0 (C:)',
      subtitle: 'Almacenamiento Local',
      fullName: `SSD NVMe Principal • ${metrics?.disk_total_gb || 474.4} GB`,
      color: '#4ADE80', // Green
      colorLight: '#86EFAC',
      bgImage: '/backgrounds/yotsuba_disk.jpg',
      borderColor: 'border-emerald-500/50',
      activeBorder: 'border-emerald-500',
      activeShadow: 'shadow-emerald-500/20',
      ringColor: 'ring-emerald-500/40',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      gradientId: 'diskGradient',
      unit: '%',
      currentValue: metrics ? Number(metrics.disk_usage_pct) : 0,
      sparkKey: 'disk'
    },
    net: {
      id: 'net',
      title: 'Ethernet',
      subtitle: 'Adaptador de Red',
      fullName: `${selectedHost.ip_address} • Enlace 1.0 Gbps`,
      color: '#FBBF24', // Amber / Yellow
      colorLight: '#FDE68A',
      bgImage: '/backgrounds/ichika_net.jpg',
      borderColor: 'border-amber-500/50',
      activeBorder: 'border-amber-500',
      activeShadow: 'shadow-amber-500/20',
      ringColor: 'ring-amber-500/40',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      gradientId: 'netGradient',
      unit: 'Kbps',
      currentValue: 12.4,
      sparkKey: 'cpu'
    },
    gpu: {
      id: 'gpu',
      title: 'GPU 0',
      subtitle: 'Motor Gráfico',
      fullName: 'Acelerador Gráfico 3D & Video',
      color: '#C084FC', // Purple
      colorLight: '#E9D5FF',
      bgImage: '/backgrounds/nino_gpu.jpg',
      borderColor: 'border-purple-500/50',
      activeBorder: 'border-purple-500',
      activeShadow: 'shadow-purple-500/20',
      ringColor: 'ring-purple-500/40',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      gradientId: 'gpuGradient',
      unit: '%',
      currentValue: 18.5,
      sparkKey: 'ram'
    }
  };

  const currentTheme = componentsConfig[activeTab] || componentsConfig.cpu;

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100 relative overflow-x-hidden">
      {/* Fondo de Pantalla Dinámico con Transición Suave */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          key={currentTheme.bgImage}
          src={currentTheme.bgImage}
          alt="Wallpaper"
          className="w-full h-full object-cover opacity-25 filter blur-[2px] transition-opacity duration-700 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/90 to-slate-950/95" />
      </div>

      {/* Contenido Superior */}
      <div className="relative z-10">
        <Navbar
          selectedHost={{
            ...selectedHost,
            hostname: hostnameDisplay
          }}
          onSelectHost={(host) => {
            setSelectedHost(host);
            setDismissAlert(false);
          }}
          syncTime={lastUpdated}
        />

        <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          {/* Banner de Alerta de Umbral */}
          {alertTriggered && !dismissAlert && (
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
                onClick={() => setDismissAlert(true)}
                className="p-1 text-rose-400 hover:text-white rounded-none hover:bg-rose-500/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Encabezado Superior: Estado del Host y Selector de Vista */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/85 backdrop-blur-md border border-slate-800/90 rounded-none p-3.5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-none bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-white tracking-tight">{hostnameDisplay}</h1>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                    Base de Datos Conectada
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  IP: <span className="text-slate-200">{selectedHost.ip_address}</span> • SO: <span className="text-slate-200">{osDisplay}</span> • Uptime: <span className="text-emerald-400">{formatUptime(metrics?.uptime_seconds)}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-950/80 p-1 border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('taskmgr')}
                  className={`flex items-center gap-1.5 px-3 py-1 font-semibold rounded-none transition-all cursor-pointer ${
                    viewMode === 'taskmgr'
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Rendimiento</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center gap-1.5 px-3 py-1 font-semibold rounded-none transition-all cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Tarjetas</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => refetch()}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-none transition-all cursor-pointer"
                title="Refrescar muestra"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-sky-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Vista Principal: Rendimiento Administrador de Tareas */}
          {viewMode === 'taskmgr' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Panel Izquierdo: Lista de Componentes con Mini-Gráficas */}
              <div className="lg:col-span-4 space-y-2">
                {Object.values(componentsConfig).map((tab) => {
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left p-3 border transition-all cursor-pointer flex items-center justify-between gap-3 relative overflow-hidden rounded-none backdrop-blur-md ${
                        isSelected
                          ? `bg-slate-900/95 ${tab.borderColor} shadow-lg ${tab.activeShadow} ring-1 ${tab.ringColor}`
                          : 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      {/* Indicador de Color en el borde izquierdo */}
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

                      {/* Mini Sparkline */}
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

              {/* Panel Derecho: Gráfica Principal y Matriz de Parámetros */}
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

                {/* Especificaciones Técnicas Detalladas */}
                <div className="border-t border-slate-800 pt-3">
                  {activeTab === 'cpu' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Utilización</span>
                        <span className="text-slate-100 font-bold text-xs">{metrics?.cpu_usage_pct || 0}%</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Velocidad Base</span>
                        <span className="text-slate-100 font-bold text-xs">3.20 GHz</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Núcleos Físicos</span>
                        <span className="text-slate-100 font-bold text-xs">{metrics?.cpu_cores_physical || 8}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Procesadores Lógicos</span>
                        <span className="text-slate-100 font-bold text-xs">{metrics?.cpu_cores_logical || 16}</span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Procesos</span>
                        <span className="text-slate-100 font-bold text-xs">186</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Subprocesos</span>
                        <span className="text-slate-100 font-bold text-xs">2,430</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Virtualización</span>
                        <span className="text-emerald-400 font-bold text-xs">Habilitada</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Tiempo Activo</span>
                        <span className="text-slate-100 font-bold text-xs">{formatUptime(metrics?.uptime_seconds)}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'ram' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">En Uso</span>
                        <span className="text-slate-100 font-bold text-xs">
                          {metrics?.ram_used_mb ? (metrics.ram_used_mb / 1024).toFixed(1) + ' GB' : '19.6 GB'}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Disponible</span>
                        <span className="text-slate-100 font-bold text-xs">
                          {metrics?.ram_free_mb ? (metrics.ram_free_mb / 1024).toFixed(1) + ' GB' : '12.3 GB'}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Capacidad Total</span>
                        <span className="text-slate-100 font-bold text-xs">
                          {metrics?.ram_total_mb ? (metrics.ram_total_mb / 1024).toFixed(1) + ' GB' : '32.0 GB'}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Velocidad</span>
                        <span className="text-slate-100 font-bold text-xs">3200 MT/s</span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Ranuras Usadas</span>
                        <span className="text-slate-100 font-bold text-xs">2 de 2</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Factor de Forma</span>
                        <span className="text-slate-100 font-bold text-xs">DIMM</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Confirmada</span>
                        <span className="text-slate-100 font-bold text-xs">23.4 / 36.8 GB</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">En Caché</span>
                        <span className="text-slate-100 font-bold text-xs">8.4 GB</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'disk' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Espacio Usado</span>
                        <span className="text-slate-100 font-bold text-xs">{metrics?.disk_used_gb || 390.9} GB</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Espacio Libre</span>
                        <span className="text-slate-100 font-bold text-xs">{metrics?.disk_free_gb || 83.5} GB</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Capacidad Total</span>
                        <span className="text-slate-100 font-bold text-xs">{metrics?.disk_total_gb || 474.4} GB</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Tipo de Medio</span>
                        <span className="text-emerald-400 font-bold text-xs">SSD NVMe</span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Tiempo de Respuesta</span>
                        <span className="text-slate-100 font-bold text-xs">0.5 ms</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Lectura</span>
                        <span className="text-slate-100 font-bold text-xs">0 KB/s</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Escritura</span>
                        <span className="text-slate-100 font-bold text-xs">190 KB/s</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Disco del Sistema</span>
                        <span className="text-slate-100 font-bold text-xs">Sí (C:)</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'net' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Dirección IPv4</span>
                        <span className="text-slate-100 font-bold text-xs">{selectedHost.ip_address}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Estado de Enlace</span>
                        <span className="text-amber-400 font-bold text-xs">Operacional</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Velocidad Máxima</span>
                        <span className="text-slate-100 font-bold text-xs">1.0 Gbps</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Adaptador</span>
                        <span className="text-slate-100 font-bold text-xs">Ethernet / Wi-Fi</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'gpu' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Uso 3D</span>
                        <span className="text-purple-400 font-bold text-xs">18.5%</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Memoria de GPU</span>
                        <span className="text-slate-100 font-bold text-xs">2.4 / 8.0 GB</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Temperatura</span>
                        <span className="text-slate-100 font-bold text-xs">48 °C</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 block text-[10px]">Versión del Driver</span>
                        <span className="text-slate-100 font-bold text-xs">DirectX 12</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Vista Cuadrícula de Tarjetas */
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                type="cpu"
                title="Carga de CPU"
                value={`${metrics ? metrics.cpu_usage_pct : 0}%`}
                percentage={metrics ? Number(metrics.cpu_usage_pct) : 0}
                subtitle={`${metrics?.cpu_cores_logical || 16} Hilos • ${metrics?.cpu_cores_physical || 8} Núcleos`}
                details={[
                  { label: 'Procesadores', value: `${metrics?.cpu_cores_logical || 16}` },
                  { label: 'Sondeo', value: '2.5 seg' }
                ]}
                trend="+0.8%"
                trendUp={metrics ? metrics.cpu_usage_pct > 70 : false}
                threshold={80}
              />

              <MetricCard
                type="ram"
                title="Memoria RAM"
                value={`${metrics ? metrics.ram_usage_pct : 0}%`}
                percentage={metrics ? Number(metrics.ram_usage_pct) : 0}
                subtitle={`${metrics?.ram_used_mb ? (metrics.ram_used_mb / 1024).toFixed(1) + ' GB' : '19.6 GB'} de ${metrics?.ram_total_mb ? (metrics.ram_total_mb / 1024).toFixed(1) + ' GB' : '32 GB'}`}
                details={[
                  { label: 'Libre', value: metrics?.ram_free_mb ? `${(metrics.ram_free_mb / 1024).toFixed(1)} GB` : '12.3 GB' },
                  { label: 'Ocupación', value: `${metrics ? metrics.ram_usage_pct : 0}%` }
                ]}
                trend="-0.2%"
                trendUp={false}
                threshold={85}
              />

              <MetricCard
                type="disk"
                title="Almacenamiento (Disco)"
                value={`${metrics ? metrics.disk_usage_pct : 0}%`}
                percentage={metrics ? Number(metrics.disk_usage_pct) : 0}
                subtitle={`${metrics?.disk_used_gb || 390.9} GB de ${metrics?.disk_total_gb || 474.4} GB`}
                details={[
                  { label: 'Libre', value: `${metrics?.disk_free_gb || 83.5} GB` },
                  { label: 'Partición', value: 'C:\\ Principal' }
                ]}
                trend="0.0%"
                trendUp={false}
                threshold={90}
              />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
