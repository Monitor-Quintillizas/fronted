export const getComponentsConfig = (metrics, selectedHost, osDisplay) => {
  return {
    cpu: {
      id: 'cpu',
      title: 'CPU',
      subtitle: 'Procesador Principal',
      fullName: `${osDisplay} • ${metrics?.cpu_cores_logical || 16} Procesadores Lógicos`,
      color: '#EF5350', // Red
      colorLight: '#F87171',
      bgImage: '/backgrounds/itsuki_cpu.jpg',
      borderColor: 'border-red-500/50',
      activeBorder: 'border-red-500',
      activeShadow: 'shadow-red-500/20',
      ringColor: 'ring-red-500/40',
      badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
      gradientId: 'cpuGradient',
      unit: '%',
      currentValue: metrics ? Number(metrics.cpu_usage_pct) : 0,
      sparkKey: 'cpu'
    },
    ram: {
      id: 'ram',
      title: 'Memoria',
      subtitle: 'Memoria del Sistema',
      fullName: `${metrics?.ram_total_mb ? (metrics.ram_total_mb / 1024).toFixed(1) + ' GB' : '32.0 GB'} DDR4/DDR5`,
      color: '#38BDF8', // Blue / Cyan
      colorLight: '#7DD3FC',
      bgImage: '/backgrounds/miku_ram.jpg',
      borderColor: 'border-sky-500/50',
      activeBorder: 'border-sky-500',
      activeShadow: 'shadow-sky-500/20',
      ringColor: 'ring-sky-500/40',
      badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
      gradientId: 'ramGradient',
      unit: '%',
      currentValue: metrics ? Number(metrics.ram_usage_pct) : 0,
      sparkKey: 'ram'
    },
    disk: {
      id: 'disk',
      title: 'Disco 0 (C:)',
      subtitle: 'Almacenamiento Local',
      fullName: `SSD NVMe Principal • ${metrics?.disk_total_gb || 474.4} GB`,
      color: '#4ADE80', // Green
      colorLight: '#86EFAC',
      bgImage: '/backgrounds/yotsuba_disk.jpg',
      borderColor: 'border-emerald-500/50',
      activeBorder: 'border-emerald-500',
      activeShadow: 'shadow-emerald-500/20',
      ringColor: 'ring-emerald-500/40',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      gradientId: 'diskGradient',
      unit: '%',
      currentValue: metrics ? Number(metrics.disk_usage_pct) : 0,
      sparkKey: 'disk'
    },
    net: {
      id: 'net',
      title: 'Ethernet',
      subtitle: 'Adaptador de Red',
      fullName: `${selectedHost?.ip_address || '127.0.0.1'} • Enlace 1.0 Gbps`,
      color: '#FBBF24', // Amber / Yellow
      colorLight: '#FDE68A',
      bgImage: '/backgrounds/ichika_net.jpg',
      borderColor: 'border-amber-500/50',
      activeBorder: 'border-amber-500',
      activeShadow: 'shadow-amber-500/20',
      ringColor: 'ring-amber-500/40',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      gradientId: 'netGradient',
      unit: 'Kbps',
      currentValue: 12.4,
      sparkKey: 'cpu'
    },
    gpu: {
      id: 'gpu',
      title: 'GPU 0',
      subtitle: 'Motor Gráfico',
      fullName: 'Acelerador Gráfico 3D & Video',
      color: '#C084FC', // Purple
      colorLight: '#E9D5FF',
      bgImage: '/backgrounds/nino_gpu.jpg',
      borderColor: 'border-purple-500/50',
      activeBorder: 'border-purple-500',
      activeShadow: 'shadow-purple-500/20',
      ringColor: 'ring-purple-500/40',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      gradientId: 'gpuGradient',
      unit: '%',
      currentValue: 18.5,
      sparkKey: 'ram'
    }
  };
};
