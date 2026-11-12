import { useState } from 'react';
import { useMetrics } from './useMetrics';
import { getComponentsConfig } from './componentsConfig';
import { formatUptime } from './formatUptime';

export const DEFAULT_HOST = {
  host_id: 1,
  hostname: 'Evangelin (Mi PC)',
  ip_address: '127.0.0.1',
  operating_system: 'Windows 11 (AMD64)'
};

export const useDashboard = () => {
  const [selectedHost, setSelectedHost] = useState(DEFAULT_HOST);
  const [activeTab, setActiveTab] = useState('cpu');
  const [viewMode, setViewMode] = useState('taskmgr');
  const [dismissAlert, setDismissAlert] = useState(false);

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

  const hostnameDisplay = metrics?.hostname ? `${metrics.hostname} (Mi PC)` : selectedHost.hostname;
  const osDisplay = metrics?.os_name || selectedHost.operating_system;
  const componentsConfig = getComponentsConfig(metrics, selectedHost, osDisplay);
  const currentTheme = componentsConfig[activeTab] || componentsConfig.cpu;
  const uptimeFormatted = formatUptime(metrics?.uptime_seconds);

  const handleSelectHost = (host) => {
    setSelectedHost(host);
    setDismissAlert(false);
  };

  const handleDismissAlert = () => {
    setDismissAlert(true);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return {
    selectedHost,
    setSelectedHost,
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    dismissAlert,
    setDismissAlert,
    metrics,
    loading,
    error,
    alertTriggered,
    activeAlerts,
    lastUpdated,
    liveChartData,
    refetch,
    hostnameDisplay,
    osDisplay,
    componentsConfig,
    currentTheme,
    uptimeFormatted,
    handleSelectHost,
    handleDismissAlert,
    handleTabChange,
    handleViewModeChange
  };
};

export default useDashboard;
