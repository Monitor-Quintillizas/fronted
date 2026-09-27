import api from './api';

/**
 * Servicio de Gestión de Umbrales y Alertas.
 * Permite listar, crear, modificar y eliminar umbrales en el Backend.
 */
export const thresholdsService = {
  /**
   * Obtiene los umbrales configurados para un host
   */
  getThresholds: async (hostId = 1) => {
    const response = await api.get(`?action=get_thresholds&host_id=${hostId}`);
    return response.data?.data || [];
  },

  /**
   * Crea un nuevo umbral
   */
  createThreshold: async (thresholdData) => {
    const response = await api.post('?action=create_threshold', thresholdData);
    return response.data;
  },

  /**
   * Actualiza un umbral existente
   */
  updateThreshold: async (thresholdData) => {
    const response = await api.post('?action=update_threshold', thresholdData);
    return response.data;
  },

  /**
   * Elimina un umbral por ID
   */
  deleteThreshold: async (thresholdId) => {
    const response = await api.post('?action=delete_threshold', { threshold_id: thresholdId });
    return response.data;
  },

  /**
   * Obtiene el historial de alertas disparadas
   */
  getAlerts: async () => {
    const response = await api.get('?action=get_alerts');
    return response.data?.data || [];
  }
};
