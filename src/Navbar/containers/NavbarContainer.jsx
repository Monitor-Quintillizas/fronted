import React from 'react';
import { useNavbar } from '../utils/useNavbar';
import { useHostSelector } from '../utils/useHostSelector';
import Navbar from '../components/Navbar';

export default function NavbarContainer({ selectedHost, onSelectHost, syncTime }) {
  const navbar = useNavbar();
  const hostSelector = useHostSelector({ selectedHost, onSelectHost });

  const hostSelectorProps = selectedHost && onSelectHost ? hostSelector : null;

  return (
    <Navbar
      {...navbar}
      syncTime={syncTime}
      hostSelectorProps={hostSelectorProps}
    />
  );
}
