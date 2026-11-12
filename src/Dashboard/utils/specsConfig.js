export const getSpecsForTab = (activeTab, metrics, selectedHost, uptimeFormatted) => {
  if (activeTab === 'cpu') {
    return [
      { label: 'Utilización', value: `${metrics?.cpu_usage_pct || 0}%` },
      { label: 'Velocidad Base', value: '3.20 GHz' },
      { label: 'Núcleos Físicos', value: `${metrics?.cpu_cores_physical || 8}` },
      { label: 'Procesadores Lógicos', value: `${metrics?.cpu_cores_logical || 16}` },
      { label: 'Procesos', value: '186' },
      { label: 'Subprocesos', value: '2,430' },
      { label: 'Virtualización', value: 'Habilitada', color: 'text-emerald-400' },
      { label: 'Tiempo Activo', value: uptimeFormatted }
    ];
  }

  if (activeTab === 'ram') {
    return [
      { label: 'En Uso', value: metrics?.ram_used_mb ? (metrics.ram_used_mb / 1024).toFixed(1) + ' GB' : '19.6 GB' },
      { label: 'Disponible', value: metrics?.ram_free_mb ? (metrics.ram_free_mb / 1024).toFixed(1) + ' GB' : '12.3 GB' },
      { label: 'Capacidad Total', value: metrics?.ram_total_mb ? (metrics.ram_total_mb / 1024).toFixed(1) + ' GB' : '32.0 GB' },
      { label: 'Velocidad', value: '3200 MT/s' },
      { label: 'Ranuras Usadas', value: '2 de 2' },
      { label: 'Factor de Forma', value: 'DIMM' },
      { label: 'Confirmada', value: '23.4 / 36.8 GB' },
      { label: 'En Caché', value: '8.4 GB' }
    ];
  }

  if (activeTab === 'disk') {
    return [
      { label: 'Espacio Usado', value: `${metrics?.disk_used_gb || 390.9} GB` },
      { label: 'Espacio Libre', value: `${metrics?.disk_free_gb || 83.5} GB` },
      { label: 'Capacidad Total', value: `${metrics?.disk_total_gb || 474.4} GB` },
      { label: 'Tipo de Medio', value: 'SSD NVMe', color: 'text-emerald-400' },
      { label: 'Tiempo de Respuesta', value: '0.5 ms' },
      { label: 'Lectura', value: '0 KB/s' },
      { label: 'Escritura', value: '190 KB/s' },
      { label: 'Disco del Sistema', value: 'Sí (C:)' }
    ];
  }

  if (activeTab === 'net') {
    return [
      { label: 'Dirección IPv4', value: selectedHost?.ip_address || '127.0.0.1' },
      { label: 'Estado de Enlace', value: 'Operacional', color: 'text-amber-400' },
      { label: 'Velocidad Máxima', value: '1.0 Gbps' },
      { label: 'Adaptador', value: 'Ethernet / Wi-Fi' }
    ];
  }

  if (activeTab === 'gpu') {
    return [
      { label: 'Uso 3D', value: '18.5%', color: 'text-purple-400' },
      { label: 'Memoria de GPU', value: '2.4 / 8.0 GB' },
      { label: 'Temperatura', value: '48 °C' },
      { label: 'Versión del Driver', value: 'DirectX 12' }
    ];
  }

  return [];
};
