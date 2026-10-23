import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HostSelector from './HostSelector';
import { useAuth } from '../context/AuthContext';
import { useDeleteAccountMutation } from '../services/authApi';
import {
  Activity,
  History,
  Bell,
  Users as UsersIcon,
  LogOut,
  Cpu,
  Trash2,
  ChevronDown,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export default function Navbar({ selectedHost, onSelectHost, syncTime }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [deleteAccountMutation] = useDeleteAccountMutation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

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
      console.error("Error al eliminar cuenta:", err);
      const msg = err.data?.Error?.Description || err.data?.mensaje || err.message;
      setDeleteError(msg || "No se pudo eliminar la cuenta.");
    } finally {
      setIsDeleting(false);
    }
  };

  const navLinks = [
    { path: '/', label: 'Rendimiento', icon: Activity },
    { path: '/users', label: 'Usuarios', icon: UsersIcon },
    { path: '/history', label: 'Historial', icon: History },
    { path: '/alerts', label: 'Alertas', icon: Bell }
  ];

  const isAdmin = user?.role === 'admin' || user?.username === 'admin';

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-2.5 mb-6 shadow-md shadow-black/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo & Windows Task Manager-Style Navigation */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-none bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-all shadow-sm">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                  Administrador de tareas
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded-none bg-slate-800 text-blue-400 font-semibold border border-slate-700">
                    Windows
                  </span>
                </span>
                <p className="text-[10px] text-slate-400 font-mono">Monitor de Rendimiento • v2.0</p>
              </div>
            </Link>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-none border border-slate-800">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.path === '/users' && isAdmin && (
                      <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Controls: Host Selector, Sync Clock, User Profile Dropdown */}
          <div className="flex items-center gap-3">
            {/* Host Selector (only if on Dashboard) */}
            {selectedHost && onSelectHost && (
              <HostSelector selectedHost={selectedHost} onSelectHost={onSelectHost} />
            )}

            {/* Sync Clock */}
            {syncTime && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-none text-xs text-slate-300 font-mono">
                <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
                <span className="text-slate-400 font-sans text-[11px]">Sinc:</span>
                <span className="font-semibold text-slate-100">{syncTime}</span>
              </div>
            )}

            {/* User Profile Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-none transition-all cursor-pointer"
              >
                <div className={`w-6 h-6 rounded-none flex items-center justify-center text-xs font-bold font-mono ${
                  isAdmin
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {user?.username ? user.username.slice(0, 1).toUpperCase() : 'U'}
                </div>
                <div className="hidden md:block text-left text-xs leading-tight">
                  <span className="text-slate-200 font-semibold block">{user?.username || 'Usuario'}</span>
                  <span className={`text-[10px] font-mono ${isAdmin ? 'text-purple-400' : 'text-slate-400'}`}>
                    {isAdmin ? '★ Administrador' : '● Operador'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-none shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[11px]">Conectado como</span>
                    <span className="font-bold text-slate-200 block truncate">{user?.username}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Rol: {isAdmin ? 'Administrador Total' : 'Usuario'}
                    </span>
                  </div>

                  <Link
                    to="/users"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-none transition-colors"
                  >
                    <UsersIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span>Panel de Usuarios</span>
                  </Link>

                  {user?.username !== 'admin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowDeleteModal(true);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs text-rose-400 hover:text-white hover:bg-rose-600 rounded-none transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar mi cuenta</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-none transition-colors cursor-pointer border-t border-slate-800/60 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal para Eliminar Propia Cuenta */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">¿Eliminar tu cuenta?</h3>
                <span className="text-xs text-slate-400">Esta acción borrará tus datos definitivamente</span>
              </div>
            </div>

            {deleteError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs">
                {deleteError}
              </div>
            )}

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              ¿Estás seguro de que deseas eliminar permanentemente la cuenta de{' '}
              <strong className="text-white font-semibold">{user?.username}</strong>? Se cerrará tu sesión de inmediato y no podrás recuperarla.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteOwnAccount}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar mi Cuenta</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
