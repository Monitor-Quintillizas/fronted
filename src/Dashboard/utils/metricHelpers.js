import { Cpu, MemoryStick, HardDrive } from 'lucide-react';

export const calculateValidPercentage = (percentage) => {
  const num = Number(percentage);
  if (Number.isNaN(num)) return 0;
  return Math.min(100, Math.max(0, num));
};

export const METRIC_CARD_THEMES = {
  cpu: {
    icon: Cpu,
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
    iconBg: 'bg-red-500/10 border-red-500/30 text-red-400',
    barBg: 'bg-red-500',
    barGlow: 'shadow-red-500/30',
    hoverBorder: 'hover:border-red-500/40'
  },
  ram: {
    icon: MemoryStick,
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    iconBg: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
    barBg: 'bg-sky-500',
    barGlow: 'shadow-sky-500/30',
    hoverBorder: 'hover:border-sky-500/40'
  },
  disk: {
    icon: HardDrive,
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    barBg: 'bg-emerald-500',
    barGlow: 'shadow-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/40'
  }
};
