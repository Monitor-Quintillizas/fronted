import { useState, useEffect } from 'react';
import { useGetHostsQuery } from '../../services/metricsApi';

export const DEFAULT_HOSTS = [
  { host_id: 1, hostname: 'Servidor-Principal', ip_address: '192.168.1.100', operating_system: 'Linux Mint / Ubuntu 24.04' },
  { host_id: 2, hostname: 'Servidor-BaseDatos', ip_address: '192.168.1.101', operating_system: 'Debian 12 Bookworm' },
  { host_id: 3, hostname: 'Servidor-Worker', ip_address: '192.168.1.102', operating_system: 'Fedora 40 Server' }
];

export const useHostSelector = ({ selectedHost, onSelectHost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: serverHosts } = useGetHostsQuery();

  const hosts = serverHosts && serverHosts.length > 0 ? serverHosts : DEFAULT_HOSTS;

  useEffect(() => {
    if (!selectedHost && hosts.length > 0 && onSelectHost) {
      onSelectHost(hosts[0]);
    }
  }, [selectedHost, hosts, onSelectHost]);

  const current = selectedHost || hosts[0];

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleSelectHost = (host) => {
    if (onSelectHost) onSelectHost(host);
    setIsOpen(false);
  };

  return {
    isOpen,
    hosts,
    current,
    toggleOpen,
    closeDropdown,
    handleSelectHost
  };
};
