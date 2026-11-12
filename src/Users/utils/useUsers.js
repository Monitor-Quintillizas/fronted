import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  useGetUsersPerformanceQuery,
  useDeleteAccountMutation,
  useAdminDeleteUserMutation
} from '../../services/authApi';

export const useUsers = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  // RTK Query: Sondeo cada 4s y suscripción reactiva
  const {
    data: res,
    isLoading: loading,
    refetch
  } = useGetUsersPerformanceQuery(undefined, {
    pollingInterval: 4000
  });

  const [deleteMyAccount, { isLoading: isDeletingMine }] = useDeleteAccountMutation();
  const [adminDeleteUser, { isLoading: isDeletingAdmin }] = useAdminDeleteUserMutation();

  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);

  const rawUsers = res?.data || [];
  const totalUsers = res?.total_users || rawUsers.length;
  const onlineUsers = res?.online_users || 0;

  const isAdmin = currentUser?.role === 'admin' || currentUser?.username === 'admin';
  const isDeleting = isDeletingMine || isDeletingAdmin;

  // Cálculo de CPU y RAM directo en la lógica para que los componentes JSX solo lo reciban
  const usersList = rawUsers.map((u) => {
    const isMe = u.user_id === currentUser?.user_id;
    const isUserAdmin = u.role === 'admin' || u.username === 'admin';
    const cpuVal = Number(u.last_cpu) || 0;
    const ramVal = Number(u.last_ram) || 0;
    const isPrimaryAdmin = isUserAdmin && u.user_id === 1;

    return {
      ...u,
      isMe,
      isUserAdmin,
      isPrimaryAdmin,
      canDelete: isPrimaryAdmin ? false : (isAdmin || isMe),
      cpuPercentage: Math.min(100, Math.max(0, cpuVal)),
      cpuBarColor: cpuVal > 80 ? 'bg-rose-500' : 'bg-red-500',
      ramPercentage: Math.min(100, Math.max(0, ramVal)),
      ramBarColor: ramVal > 85 ? 'bg-rose-500' : 'bg-sky-500',
      lastActivity: u.last_seen_at
        ? u.last_seen_at.slice(11, 19)
        : (u.last_login_at ? u.last_login_at.slice(11, 19) : 'N/D'),
      initials: u.username ? u.username.slice(0, 2).toUpperCase() : 'U'
    };
  });

  const handleOpenDelete = (targetUser) => {
    setUserToDelete(targetUser);
  };

  const handleCloseDelete = () => {
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setError(null);
    setSuccessMsg('');

    try {
      if (userToDelete.user_id === currentUser?.user_id) {
        await deleteMyAccount().unwrap();
        setUserToDelete(null);
        navigate('/login');
      } else {
        const result = await adminDeleteUser(userToDelete.user_id).unwrap();
        if (result && result.ok) {
          setSuccessMsg(`La cuenta de ${userToDelete.username} ha sido eliminada.`);
          setUserToDelete(null);
        } else {
          setError(result?.mensaje || 'No se pudo eliminar la cuenta.');
        }
      }
    } catch (err) {
      console.error('Error al eliminar cuenta:', err);
      const msg = err.data?.Error?.Description || err.data?.mensaje || err.message;
      setError(msg || 'Error al procesar la eliminación en la base de datos.');
    }
  };

  const handleClearError = () => setError(null);
  const handleClearSuccess = () => setSuccessMsg('');

  return {
    currentUser,
    isAdmin,
    usersList,
    totalUsers,
    onlineUsers,
    loading,
    refetch,
    error,
    successMsg,
    userToDelete,
    isDeleting,
    handleOpenDelete,
    handleCloseDelete,
    handleConfirmDelete,
    handleClearError,
    handleClearSuccess
  };
};
