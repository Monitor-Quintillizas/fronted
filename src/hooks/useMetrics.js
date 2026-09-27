import { useState, useEffect, useCallback, useRef } from 'react';
import { metricsService } from '../services/metricsService';

/**
 * Custom Hook: useMetrics
 * Sondeo periódico optimizado y resiliente para telemetría en tiempo real.
 * Implementa filtro de desconexión transitoria para evitar parpadeos visuales.
 */
export function useMetrics(hostId = 1, intervalMs = 2500) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [liveChartData, setLiveChartData] = useState([]);

  const isMountedRef = useRef(true);
  const consecutiveFailuresRef = useRef(0);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await metricsService.getMetrics(hostId);

      if (!isMountedRef.current) return;

      if (res && res.ok && res.data) {
        // Reiniciar contador de fallas consecutivas
        consecutiveFailuresRef.current = 0;
        setError(null);

        setMetrics(res.data);
        setAlertTriggered(Boolean(res.alert_triggered));
        setActiveAlerts(res.active_alerts || []);
        
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastUpdated(timeStr);

        // Actualizar cola de puntos de la gráfica (últimos 30 puntos para estilo Administrador de Tareas)
        setLiveChartData((prev) => {
          const newPoint = {
            time: timeStr.slice(3, 8), // mm:ss
            cpu: Number(res.data.cpu_usage_pct) || 0,
            ram: Number(res.data.ram_usage_pct) || 0,
            disk: Number(res.data.disk_usage_pct) || 0
          };
          const updated = [...prev, newPoint];
          return updated.length > 30 ? updated.slice(updated.length - 30) : updated;
        });
      }
    } catch (err) {
      if (!isMountedRef.current) return;
      
      consecutiveFailuresRef.current += 1;
      // Solo reportar desconexión si fallan 3 intentos consecutivos para evitar parpadeos
      if (consecutiveFailuresRef.current >= 3) {
        console.error("Falla reiterada al consultar telemetría:", err);
        setError("El backend no responde tras múltiples intentos.");
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [hostId]);

  useEffect(() => {
    isMountedRef.current = true;
    consecutiveFailuresRef.current = 0;
    setLoading(true);

    fetchMetrics();

    const timer = setInterval(() => {
      fetchMetrics();
    }, intervalMs);

    return () => {
      isMountedRef.current = false;
      clearInterval(timer);
    };
  }, [fetchMetrics, intervalMs]);

  return {
    metrics,
    loading,
    error,
    alertTriggered,
    activeAlerts,
    lastUpdated,
    liveChartData,
    refetch: fetchMetrics
  };
}
