import React from 'react';
import Navbar from '../../components/Navbar';
import { useHistory } from '../utils/useHistory';
import HistoryFilters from '../components/HistoryFilters';
import HistoryKpis from '../components/HistoryKpis';
import HistoryChart from '../components/HistoryChart';
import HistoryTable from '../components/HistoryTable';
import HistoryEmpty from '../components/HistoryEmpty';
import { Loader2 } from 'lucide-react';

export default function HistoryContainer() {
  const {
    selectedHost,
    setSelectedHost,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    metricFilter,
    setMetricFilter,
    historyData,
    loading,
    validationError,
    serverMessage,
    handleQuery,
    formattedChartData,
    peakCpu,
    avgRam,
    totalSamples
  } = useHistory();

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

          <HistoryFilters
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
            metricFilter={metricFilter}
            onMetricFilterChange={setMetricFilter}
            onSubmit={handleQuery}
            loading={loading}
            validationError={validationError}
          />

          {loading ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-none p-14 text-center my-4 space-y-2">
              <Loader2 className="w-7 h-7 animate-spin text-blue-500 mx-auto" />
              <p className="text-xs font-mono text-slate-400">Consultando base de datos...</p>
            </div>
          ) : historyData.length === 0 ? (
            <HistoryEmpty serverMessage={serverMessage} />
          ) : (
            <>
              <HistoryKpis
                peakCpu={peakCpu}
                avgRam={avgRam}
                totalSamples={totalSamples}
              />
              <HistoryChart
                formattedChartData={formattedChartData}
                metricFilter={metricFilter}
                hostname={selectedHost.hostname}
              />
              <HistoryTable historyData={historyData} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
