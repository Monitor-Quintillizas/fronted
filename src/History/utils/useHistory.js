import { useState, useEffect, useCallback } from 'react';
import { useLazyGetHistoryQuery } from '../../services/metricsApi';
import {
  getDefaultStartDate,
  getDefaultEndDate,
  formatHistoryChartData,
  calculateHistoryKpis
} from './historyHelpers';

export const DEFAULT_HOST = {
  host_id: 1,
  hostname: 'Evangelin (Mi PC)',
  ip_address: '127.0.0.1',
  operating_system: 'Windows 11 (AMD64)'
};

export const useHistory = () => {
  const [selectedHost, setSelectedHost] = useState(DEFAULT_HOST);
  const [startDate, setStartDate] = useState(getDefaultStartDate);
  const [endDate, setEndDate] = useState(getDefaultEndDate);
  const [metricFilter, setMetricFilter] = useState('all');

  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [serverMessage, setServerMessage] = useState('');

  const [triggerGetHistory] = useLazyGetHistoryQuery();

  const fetchHistory = useCallback(async () => {
    setValidationError('');
    setServerMessage('');

    if (new Date(startDate) >= new Date(endDate)) {
      setValidationError('La fecha inicial debe ser estrictamente anterior a la fecha final.');
      return;
    }

    setLoading(true);

    try {
      const res = await triggerGetHistory({
        hostId: selectedHost.host_id,
        startDate,
        endDate
      }).unwrap();

      if (res && res.ok) {
        const rawData = res.data || [];
        setHistoryData(rawData);
        if (rawData.length === 0) {
          setServerMessage('No existen registros en el rango de fechas consultado.');
        }
      } else {
        setServerMessage(res?.mensaje || 'Error al obtener registros.');
      }
    } catch (err) {
      console.error('Error al consultar historial:', err);
      setValidationError('No se pudo conectar con el servidor para consultar el historial.');
    } finally {
      setLoading(false);
    }
  }, [selectedHost.host_id, startDate, endDate, triggerGetHistory]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleQuery = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    fetchHistory();
  };

  const handleSelectHost = (host) => {
    setSelectedHost(host);
  };

  const formattedChartData = formatHistoryChartData(historyData);
  const kpis = calculateHistoryKpis(historyData);

  return {
    selectedHost,
    setSelectedHost: handleSelectHost,
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
    peakCpu: kpis.peakCpu,
    avgRam: kpis.avgRam,
    totalSamples: kpis.totalSamples
  };
};

export default useHistory;
