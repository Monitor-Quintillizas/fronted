import { useState, useEffect, useRef } from 'react';
import { useGetMetricsQuery } from '../services/metricsApi';

/**
 * Custom Hook: useMetrics (adaptado a RTK Query)
 * Conserva el buffer de los últimos 30 puntos para la gráfica estilo Administrador de Tareas
 * y el filtro de desconexión tras 3 fallos consecutivos, sustituyendo setInterval por pollingInterval.
 */
export function useMetrics(hostId = 1, intervalMs = 2500) {
  const {
    data: res,
    isLoading,
    isError,
    error: queryError,
    refetch,
  } = useGetMetricsQuery(hostId, {
    pollingInterval: intervalMs,
  });

  const [liveChartData, setLiveChartData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [reportedError, setReportedError] = useState(null);

  const consecutiveFailuresRef = useRef(0);
  const lastProcessedStampRef = useRef(null);

  // Procesamiento de respuesta válida y alimentación del buffer
  useEffect(() => {
    if (res && res.ok && res.data) {
      consecutiveFailuresRef.current = 0;
      setReportedError(null);

      const now = new Date();
      const timeStr = now.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setLastUpdated(timeStr);

      // Usar referencia para evitar empujar puntos duplicados en el mismo tick
      if (res !== lastProcessedStampRef.current) {
        lastProcessedStampRef.current = res;
        setLiveChartData((prev) => {
          const newPoint = {
            time: timeStr.slice(3, 8), // mm:ss
            cpu: Number(res.data.cpu_usage_pct) || 0,
            ram: Number(res.data.ram_usage_pct) || 0,
            disk: Number(res.data.disk_usage_pct) || 0,
          };
          const updated = [...prev, newPoint];
          return updated.length > 30 ? updated.slice(updated.length - 30) : updated;
        });
      }
    }
  }, [res]);

  // Manejo de la regla de tolerancia a 3 fallos consecutivos
  useEffect(() => {
    if (isError) {
      consecutiveFailuresRef.current += 1;
      if (consecutiveFailuresRef.current >= 3) {
        setReportedError('El backend no responde tras múltiples intentos.');
      }
    }
  }, [isError, queryError]);

  return {
    metrics: res?.data ?? null,
    loading: isLoading,
    error: reportedError,
    alertTriggered: Boolean(res?.alert_triggered),
    activeAlerts: res?.active_alerts ?? [],
    lastUpdated,
    liveChartData,
    refetch,
  };
}

export default useMetrics;
