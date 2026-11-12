import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ChevronDown } from 'lucide-react';
import HostSelector from './HostSelector';
import ProfileMenu from './ProfileMenu';
import DeleteAccountModal from './DeleteAccountModal';

export default function Navbar({
  user,
  isAdmin,
  navLinks,
  currentPath,
  showProfileMenu,
  toggleProfileMenu,
  closeProfileMenu,
  showDeleteModal,
  openDeleteModal,
  closeDeleteModal,
  isDeleting,
  deleteError,
  handleLogout,
  handleDeleteOwnAccount,
  syncTime,
  hostSelectorProps
}) {
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
                const isActive = currentPath === item.path;
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
            {/* Host Selector (only if props are present) */}
            {hostSelectorProps && (
              <HostSelector {...hostSelectorProps} />
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
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-none transition-all cursor-pointer"
              >
                <div
                  className={`w-6 h-6 rounded-none flex items-center justify-center text-xs font-bold font-mono ${
                    isAdmin
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {user?.username ? user.username.slice(0, 1).toUpperCase() : 'U'}
                </div>
                <div className="hidden md:block text-left text-xs leading-tight">
                  <span className="text-slate-200 font-semibold block">
                    {user?.username || 'Usuario'}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      isAdmin ? 'text-purple-400' : 'text-slate-400'
                    }`}
                  >
                    {isAdmin ? '★ Administrador' : '● Operador'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <ProfileMenu
                  user={user}
                  isAdmin={isAdmin}
                  closeMenu={closeProfileMenu}
                  onOpenDeleteModal={openDeleteModal}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal para Eliminar Propia Cuenta */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        username={user?.username}
        isDeleting={isDeleting}
        deleteError={deleteError}
        onCancel={closeDeleteModal}
        onConfirm={handleDeleteOwnAccount}
      />
    </>
  );
}
