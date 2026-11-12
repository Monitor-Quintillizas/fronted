import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDeleteAccountMutation } from '../../services/authApi';
import {
  Activity,
  History,
  Bell,
  Users as UsersIcon
} from 'lucide-react';

export const NAV_LINKS = [
  { path: '/', label: 'Rendimiento', icon: Activity },
  { path: '/users', label: 'Usuarios', icon: UsersIcon },
  { path: '/history', label: 'Historial', icon: History },
  { path: '/alerts', label: 'Alertas', icon: Bell }
];

export const useNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [deleteAccountMutation] = useDeleteAccountMutation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const isAdmin = user?.role === 'admin' || user?.username === 'admin';

  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
  const closeProfileMenu = () => setShowProfileMenu(false);

  const openDeleteModal = () => {
    setShowProfileMenu(false);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => setShowDeleteModal(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDeleteOwnAccount = async () => {
    setIsDeleting(true);
    setDeleteError('');
    try {
      await deleteAccountMutation().unwrap();
      setShowDeleteModal(false);
      navigate('/login');
    } catch (err) {
      console.error('Error al eliminar cuenta:', err);
      const msg = err.data?.Error?.Description || err.data?.mensaje || err.message;
      setDeleteError(msg || 'No se pudo eliminar la cuenta.');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    user,
    isAdmin,
    currentPath: location.pathname,
    navLinks: NAV_LINKS,
    showProfileMenu,
    toggleProfileMenu,
    closeProfileMenu,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    isDeleting,
    deleteError,
    handleLogout,
    handleDeleteOwnAccount
  };
};
