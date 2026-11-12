import React from 'react';
import NavbarContainer from '../../Navbar/containers/NavbarContainer';
import { useUsers } from '../utils/useUsers';
import UsersNotifications from '../components/UsersNotifications';
import UsersSummary from '../components/UsersSummary';
import UsersTable from '../components/UsersTable';
import DeleteUserModal from '../components/DeleteUserModal';
import { Users as UsersIcon, RefreshCw } from 'lucide-react';

export default function UsersContainer() {
  const {
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
  } = useUsers();

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100 relative overflow-x-hidden">
      {/* Fondo con Wallpaper de Pantalla */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/backgrounds/quintuplets_master.jpg"
          alt="Wallpaper"
          className="w-full h-full object-cover opacity-20 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>

      <div className="relative z-10">
        <NavbarContainer />

        <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          {/* Encabezado */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-none bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <UsersIcon className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Cuentas de Usuario & Rendimiento
                  {isAdmin && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-none bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Panel Admin
                    </span>
                  )}
                </h1>
                <p className="text-xs text-slate-400">
                  Supervisión de sesiones activas y consumo de recursos por cuenta
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => refetch()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-none border border-slate-800 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
                <span>Actualizar</span>
              </button>
            </div>
          </div>

          {/* Notificaciones */}
          <UsersNotifications
            error={error}
            successMsg={successMsg}
            onClearError={handleClearError}
            onClearSuccess={handleClearSuccess}
          />

          {/* Tarjetas Resumen */}
          <UsersSummary
            totalUsers={totalUsers}
            onlineUsers={onlineUsers}
            currentUser={currentUser}
            isAdmin={isAdmin}
          />

          {/* Tabla de Usuarios */}
          <UsersTable
            usersList={usersList}
            onDeleteClick={handleOpenDelete}
          />
        </main>
      </div>

      {/* Modal de Eliminación */}
      <DeleteUserModal
        userToDelete={userToDelete}
        isDeleting={isDeleting}
        onCancel={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
