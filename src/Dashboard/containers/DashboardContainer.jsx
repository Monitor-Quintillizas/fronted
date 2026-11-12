import React from 'react';
import Navbar from '../../components/Navbar';
import { useDashboard } from '../utils/useDashboard';
import WallpaperBackground from '../components/WallpaperBackground';
import AlertBanner from '../components/AlertBanner';
import DashboardHeader from '../components/DashboardHeader';
import ComponentList from '../components/ComponentList';
import ComponentDetail from '../components/ComponentDetail';
import CardsView from '../components/CardsView';

export default function DashboardContainer() {
  const {
    selectedHost,
    activeTab,
    viewMode,
    dismissAlert,
    metrics,
    loading,
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
  } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100 relative overflow-x-hidden">
      <WallpaperBackground bgImage={currentTheme.bgImage} />

      <div className="relative z-10">
        <Navbar
          selectedHost={{
            ...selectedHost,
            hostname: hostnameDisplay
          }}
          onSelectHost={handleSelectHost}
          syncTime={lastUpdated}
        />

        <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          <AlertBanner
            alertTriggered={alertTriggered}
            dismissAlert={dismissAlert}
            activeAlerts={activeAlerts}
            hostnameDisplay={hostnameDisplay}
            onDismiss={handleDismissAlert}
          />

          <DashboardHeader
            hostnameDisplay={hostnameDisplay}
            selectedHost={selectedHost}
            osDisplay={osDisplay}
            uptimeFormatted={uptimeFormatted}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onRefetch={refetch}
            loading={loading}
          />

          {viewMode === 'taskmgr' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              <ComponentList
                componentsConfig={componentsConfig}
                activeTab={activeTab}
                onSelectTab={handleTabChange}
                metrics={metrics}
                liveChartData={liveChartData}
              />
              <ComponentDetail
                currentTheme={currentTheme}
                liveChartData={liveChartData}
                activeTab={activeTab}
                metrics={metrics}
                selectedHost={selectedHost}
                uptimeFormatted={uptimeFormatted}
              />
            </div>
          ) : (
            <CardsView metrics={metrics} />
          )}
        </main>
      </div>
    </div>
  );
}
