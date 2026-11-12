import React from 'react';
import MetricCard from './MetricCard';

export default function CardsView({ metrics }) {
  return (
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
  );
}
