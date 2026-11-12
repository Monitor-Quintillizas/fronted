export const getDefaultStartDate = () => {
  const d = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 16);
};

export const getDefaultEndDate = () => {
  const d = new Date();
  return d.toISOString().slice(0, 16);
};

export const formatHistoryChartData = (historyData = []) => {
  return historyData.map((item) => ({
    time: item.measured_at ? item.measured_at.slice(11, 16) : '',
    fullDate: item.measured_at,
    cpu: Number(item.cpu_usage_pct) || 0,
    ram: Number(item.ram_usage_pct) || 0,
    disk: Number(item.disk_usage_pct) || 0
  }));
};

export const calculateHistoryKpis = (historyData = []) => {
  const cpuValues = historyData.map((h) => Number(h.cpu_usage_pct)).filter((v) => !Number.isNaN(v));
  const ramValues = historyData.map((h) => Number(h.ram_usage_pct)).filter((v) => !Number.isNaN(v));

  const peakCpu = cpuValues.length > 0 ? Math.max(...cpuValues).toFixed(1) : '0.0';
  const avgRam = ramValues.length > 0
    ? (ramValues.reduce((a, b) => a + b, 0) / ramValues.length).toFixed(1)
    : '0.0';

  return {
    peakCpu,
    avgRam,
    totalSamples: historyData.length
  };
};
