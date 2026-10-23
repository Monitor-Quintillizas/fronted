import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import {
  useGetUsersPerformanceQuery,
  useDeleteAccountMutation,
  useAdminDeleteUserMutation
} from '../services/authApi';
import {
  Users as UsersIcon,
  Shield,
  Activity,
  Trash2,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  X,
  Server
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  // RTK Query: Sondeo cada 4s y suscripción reactiva
  const {
    data: res,
    isLoading: loading,
    refetch
  } = useGetUsersPerformanceQuery(undefined, {
    pollingInterval: 4000,
  });

  const [deleteMyAccount, { isLoading: isDeletingMine }] = useDeleteAccountMutation();
  const [adminDeleteUser, { isLoading: isDeletingAdmin }] = useAdminDeleteUserMutation();

  const usersList = res?.data || [];
  const totalUsers = res?.total_users || usersList.length;
  const onlineUsers = res?.online_users || 0;

  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);

  const isDeleting = isDeletingMine || isDeletingAdmin;

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
          // RTK Query invalida tag 'User' y vuelve a pedir la lista automáticamente
        } else {
          setError(result?.mensaje || "No se pudo eliminar la cuenta.");
        }
      }
    } catch (err) {
      console.error("Error al eliminar cuenta:", err);
      const msg = err.data?.Error?.Description || err.data?.mensaje || err.message;
      setError(msg || "Error al procesar la eliminación en la base de datos.");
    }
  };

  const isAdmin = currentUser?.role === 'admin' || currentUser?.username === 'admin';

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
        <Navbar />

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
          {error && (
            <div className="p-3 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
              <button onClick={() => setError(null)} className="text-rose-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
              <button onClick={() => setSuccessMsg('')} className="text-emerald-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Tarjetas Resumen */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-none p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total de Cuentas</span>
                <span className="text-2xl font-bold font-mono text-white mt-0.5 block">{totalUsers}</span>
              </div>
              <div className="w-9 h-9 rounded-none bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <UsersIcon className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-none p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Cuentas en Línea</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-2xl font-bold font-mono text-emerald-400">{onlineUsers}</span>
                  <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
                </div>
              </div>
              <div className="w-9 h-9 rounded-none bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Activity className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-none p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Mi Sesión</span>
                <span className="text-sm font-bold text-slate-200 mt-0.5 block">
                  {currentUser?.username} ({isAdmin ? 'Administrador' : 'Usuario'})
                </span>
              </div>
              <div className="w-9 h-9 rounded-none bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Shield className="w-4 h-4" />
              </div>
            </div>
          </section>

          {/* Tabla de Usuarios */}
          <section className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-none overflow-hidden shadow-xl">
            <div className="p-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <span>Cuentas de Usuario Activas</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Base de Datos: <span className="text-emerald-400">Conectada</span>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-4">Usuario</th>
                    <th className="py-2.5 px-4">Estado</th>
                    <th className="py-2.5 px-4">Rol</th>
                    <th className="py-2.5 px-4">Equipo Monitoreado</th>
                    <th className="py-2.5 px-4">Carga CPU</th>
                    <th className="py-2.5 px-4">Carga RAM</th>
                    <th className="py-2.5 px-4">Última Actividad</th>
                    <th className="py-2.5 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {usersList.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-6 text-center text-slate-500">
                        No se encontraron cuentas registradas.
                      </td>
                    </tr>
                  ) : (
                    usersList.map((u) => {
                      const isMe = u.user_id === currentUser?.user_id;
                      const isUserAdmin = u.role === 'admin' || u.username === 'admin';

                      return (
                        <tr
                          key={u.user_id}
                          className={`hover:bg-slate-800/40 transition-colors ${
                            isMe ? 'bg-blue-500/5' : ''
                          }`}
                        >
                          {/* Usuario */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-none flex items-center justify-center text-xs font-bold font-mono ${
                                isUserAdmin
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                  : 'bg-slate-800 text-slate-300 border border-slate-700'
                              }`}>
                                {u.username.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-slate-100">{u.username}</span>
                                  {isMe && (
                                    <span className="text-[9px] px-1 py-0.2 rounded-none bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                      Tú
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-400 block">{u.email}</span>
                              </div>
                            </div>
                          </td>

                          {/* Estado */}
                          <td className="py-3 px-4">
                            {u.is_online ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                                En línea
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                                <span className="w-1.5 h-1.5 rounded-none bg-slate-500" />
                                Inactivo
                              </span>
                            )}
                          </td>

                          {/* Rol */}
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-none ${
                              isUserAdmin
                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {isUserAdmin ? 'Administrador' : 'Usuario'}
                            </span>
                          </td>

                          {/* Equipo */}
                          <td className="py-3 px-4 font-mono text-slate-300 text-[11px]">
                            <div className="flex items-center gap-1.5">
                              <Server className="w-3 h-3 text-slate-500" />
                              <span>{u.current_host || 'Mi Computadora'}</span>
                            </div>
                          </td>

                          {/* CPU */}
                          <td className="py-3 px-4">
                            <div className="w-24 space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-slate-400">CPU</span>
                                <span className="text-slate-200 font-bold">{u.last_cpu}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-800 rounded-none overflow-hidden">
                                <div
                                  className={`h-full ${
                                    u.last_cpu > 80 ? 'bg-rose-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(100, u.last_cpu)}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* RAM */}
                          <td className="py-3 px-4">
                            <div className="w-24 space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-slate-400">RAM</span>
                                <span className="text-slate-200 font-bold">{u.last_ram}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-800 rounded-none overflow-hidden">
                                <div
                                  className={`h-full ${
                                    u.last_ram > 85 ? 'bg-rose-500' : 'bg-sky-500'
                                  }`}
                                  style={{ width: `${Math.min(100, u.last_ram)}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Última Actividad */}
                          <td className="py-3 px-4 font-mono text-slate-400 text-[10px]">
                            {u.last_seen_at ? u.last_seen_at.slice(11, 19) : (u.last_login_at ? u.last_login_at.slice(11, 19) : 'N/D')}
                          </td>

                          {/* Acciones */}
                          <td className="py-3 px-4 text-right">
                            {isUserAdmin && u.user_id === 1 ? (
                              <span className="text-[10px] text-slate-500 italic">Admin Principal</span>
                            ) : (isAdmin || isMe) ? (
                              <button
                                type="button"
                                onClick={() => setUserToDelete(u)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 rounded-none transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>{isMe ? "Eliminar cuenta" : "Eliminar"}</span>
                              </button>
                            ) : (
                              <span className="text-slate-600">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Modal de Eliminación */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-none max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-9 h-9 rounded-none bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">¿Confirmar Eliminación?</h3>
                <span className="text-xs text-slate-400">Esta acción no se puede deshacer</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-none border border-slate-800">
              Estás a punto de eliminar de la base de datos la cuenta de{' '}
              <strong className="text-rose-400">{userToDelete.username}</strong> ({userToDelete.email}).
            </p>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                disabled={isDeleting}
                className="px-3 py-1.5 rounded-none text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-3 py-1.5 rounded-none text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3 h-3" />
                    <span>Eliminar Cuenta</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
