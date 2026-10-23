import React, { useState, useEffect } from 'react';
import { Server, ChevronDown, Check } from 'lucide-react';
import { useGetHostsQuery } from '../services/metricsApi';

const DEFAULT_HOSTS = [
  { host_id: 1, hostname: 'Servidor-Principal', ip_address: '192.168.1.100', operating_system: 'Linux Mint / Ubuntu 24.04' },
  { host_id: 2, hostname: 'Servidor-BaseDatos', ip_address: '192.168.1.101', operating_system: 'Debian 12 Bookworm' },
  { host_id: 3, hostname: 'Servidor-Worker', ip_address: '192.168.1.102', operating_system: 'Fedora 40 Server' }
];

export default function HostSelector({ selectedHost, onSelectHost }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: serverHosts } = useGetHostsQuery();

  const hosts = serverHosts && serverHosts.length > 0 ? serverHosts : DEFAULT_HOSTS;

  useEffect(() => {
    if (!selectedHost && hosts.length > 0 && onSelectHost) {
      onSelectHost(hosts[0]);
    }
  }, [selectedHost, hosts, onSelectHost]);

  const current = selectedHost || hosts[0];

  return (
    <div className="relative inline-block text-left">
      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-200 text-sm font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer"
      >
        <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
          <Server className="w-4 h-4" />
        </div>

        <div className="text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-mono">Equipo:</span>
            <span className="text-slate-100 font-semibold text-xs truncate max-w-[150px]">
              {current.hostname}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {current.ip_address}
          </div>
        </div>

        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/80 z-50 py-2 divide-y divide-slate-800/60 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-3 py-1.5 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Equipos Monitoreados</span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                {hosts.length} Hosts
              </span>
            </div>

            <div className="py-1 max-h-64 overflow-y-auto">
              {hosts.map((host) => {
                const isSelected = current.host_id === host.host_id;
                return (
                  <button
                    key={host.host_id}
                    type="button"
                    onClick={() => {
                      if (onSelectHost) onSelectHost(host);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-500/10 text-white'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-medium text-slate-100">{host.hostname}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono pl-4">
                        {host.ip_address} • {host.operating_system}
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
