import api from './api';

/**
 * Servicio de Telemetría y Métricas de Hardware.
 * Se encarga de consultar hosts, métricas en vivo e historial desde el Backend.
 */
export const metricsService = {
  /**
   * Obtiene la lista de equipos / hosts registrados en la Base de Datos
   */
  getHosts: async () => {
    const response = await api.get('?action=get_hosts');
    return response.data?.data || [];
  },

  /**
   * Obtiene las métricas actuales en vivo para un host específico
   */
  getMetrics: async (hostId = 1) => {
    const response = await api.get(`?action=get_metrics&host_id=${hostId}`);
    return response.data;
  },

  /**
   * Consulta el historial de métricas filtrado por rango de fechas
   */
  getHistory: async (hostId = 1, startDate = '', endDate = '') => {
    const response = await api.get(`?action=get_history&host_id=${hostId}&start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`);
    return response.data;
  }
};
