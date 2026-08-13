import React, { useState } from 'react';
import { User, SystemNotification } from '../types';
import { 
  GraduationCap, 
  LogOut, 
  Bell, 
  Code2, 
  LayoutDashboard, 
  PlusCircle, 
  BarChart3, 
  ShieldCheck, 
  UserCheck, 
  School,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  activeTab: 'dashboard' | 'new_damage' | 'reports' | 'code_mvc' | 'notifications';
  setActiveTab: (tab: 'dashboard' | 'new_damage' | 'reports' | 'code_mvc' | 'notifications') => void;
  notifications: SystemNotification[];
  onSwitchUser: (userId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  activeTab,
  setActiveTab,
  notifications,
  onSwitchUser,
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const unreadCount = notifications.filter((n) => !n.leido).length;

  return (
    <header className="bg-verde-oscuro text-white border-b-2 border-verde-neon/40 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-12 h-12 bg-verde-neon text-verde-oscuro rounded-full flex items-center justify-center font-bold text-2xl shadow-md border-2 border-white/20">
              <GraduationCap className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-wider text-verde-neon">INNOVATECH</span>
                <span className="text-xs bg-azul-oscuro text-verde-neon px-2 py-0.5 rounded border border-verde-neon/30 font-mono">v1.0 MVC</span>
              </div>
              <p className="text-xs text-gray-300 font-medium">
                I.E. Técnica Pérez y Aldana
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-black/20 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-verde-neon text-verde-oscuro font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Panel Principal</span>
            </button>

            {(user?.rol === 'docente' || user?.rol === 'administrador') && (
              <button
                onClick={() => setActiveTab('new_damage')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'new_damage'
                    ? 'bg-verde-neon text-verde-oscuro font-bold shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Registrar Daño</span>
              </button>
            )}

            {(user?.rol === 'docente' || user?.rol === 'administrador') && (
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'reports'
                    ? 'bg-verde-neon text-verde-oscuro font-bold shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Estadísticas</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('code_mvc')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'code_mvc'
                  ? 'bg-verde-neon text-verde-oscuro font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Código MVC (PHP)</span>
            </button>
          </nav>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Demo Switcher (For 11th Grade Demo / Evaluation) */}
            <div className="relative">
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-azul-oscuro text-verde-neon rounded-lg text-xs font-semibold border border-verde-neon/30 hover:bg-verde-neon hover:text-verde-oscuro transition-all"
                title="Cambio rápido para pruebas de evaluación"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Cambiar Rol Demo</span>
              </button>

              {showRoleSwitcher && (
                <div className="absolute right-0 mt-2 w-64 bg-verde-oscuro border-2 border-verde-neon rounded-xl shadow-2xl p-3 z-50">
                  <p className="text-xs text-verde-neon font-bold mb-2 uppercase tracking-wider">
                    ⚡ Modo Evaluación - Selección Rápida:
                  </p>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => { onSwitchUser('usr-est-1'); setShowRoleSwitcher(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-black/30 hover:bg-verde-neon/20 text-xs text-white flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold">Juan Pérez (Estudiante)</div>
                        <div className="text-[10px] text-gray-400">Salón 11-A</div>
                      </div>
                      <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded">Estudiante</span>
                    </button>

                    <button
                      onClick={() => { onSwitchUser('usr-doc-1'); setShowRoleSwitcher(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-black/30 hover:bg-verde-neon/20 text-xs text-white flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold">Prof. Carlos Mendoza</div>
                        <div className="text-[10px] text-gray-400">Docente de Área</div>
                      </div>
                      <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded">Docente</span>
                    </button>

                    <button
                      onClick={() => { onSwitchUser('usr-adm-1'); setShowRoleSwitcher(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-black/30 hover:bg-verde-neon/20 text-xs text-white flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold">Dra. Elena Ramos</div>
                        <div className="text-[10px] text-gray-400">Coordinación General</div>
                      </div>
                      <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded">Admin</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2.5 rounded-xl bg-black/20 hover:bg-white/10 text-gray-200 transition-colors"
                title="Notificaciones del sistema"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-verde-neon text-verde-oscuro font-bold text-xs rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-verde-oscuro-card border-2 border-verde-neon rounded-2xl shadow-2xl p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Bell className="w-4 h-4 text-verde-neon" /> Notificaciones
                    </h4>
                    <span className="text-xs bg-verde-neon/20 text-verde-neon px-2 py-0.5 rounded-full font-medium">
                      {notifications.length} Mensajes
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-4">
                        No hay notificaciones recientes.
                      </p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-verde-neon/30 transition-all text-xs"
                        >
                          <div className="flex items-start gap-2">
                            {notif.tipo === 'success' && <CheckCircle2 className="w-4 h-4 text-verde-neon shrink-0 mt-0.5" />}
                            {notif.tipo === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                            {notif.tipo === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
                            <div className="flex-1">
                              <h5 className="font-bold text-white text-xs">{notif.titulo}</h5>
                              <p className="text-gray-300 mt-1 text-[11px] leading-relaxed">{notif.mensaje}</p>
                              <span className="text-[10px] text-gray-400 mt-1.5 block font-mono">{notif.fecha}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Current User Badge */}
            {user && (
              <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-white/15">
                <div className="text-right">
                  <p className="text-xs font-bold text-white leading-tight">{user.nombre}</p>
                  <p className="text-[11px] text-verde-neon flex items-center justify-end gap-1 capitalize">
                    {user.rol === 'administrador' && <ShieldCheck className="w-3 h-3 text-purple-400" />}
                    {user.rol === 'docente' && <School className="w-3 h-3 text-emerald-400" />}
                    {user.rol === 'estudiante' && <GraduationCap className="w-3 h-3 text-sky-400" />}
                    {user.rol} {user.salonNombre ? `(${user.salonNombre})` : ''}
                  </p>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white transition-all border border-red-500/30"
              title="Cerrar Sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center p-1.5 ${activeTab === 'dashboard' ? 'text-verde-neon font-bold' : 'text-gray-300'}`}
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span>Panel</span>
          </button>

          {(user?.rol === 'docente' || user?.rol === 'administrador') && (
            <button
              onClick={() => setActiveTab('new_damage')}
              className={`flex flex-col items-center p-1.5 ${activeTab === 'new_damage' ? 'text-verde-neon font-bold' : 'text-gray-300'}`}
            >
              <PlusCircle className="w-4 h-4 mb-0.5" />
              <span>Registrar</span>
            </button>
          )}

          {(user?.rol === 'docente' || user?.rol === 'administrador') && (
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex flex-col items-center p-1.5 ${activeTab === 'reports' ? 'text-verde-neon font-bold' : 'text-gray-300'}`}
            >
              <BarChart3 className="w-4 h-4 mb-0.5" />
              <span>Estadísticas</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('code_mvc')}
            className={`flex flex-col items-center p-1.5 ${activeTab === 'code_mvc' ? 'text-verde-neon font-bold' : 'text-gray-300'}`}
          >
            <Code2 className="w-4 h-4 mb-0.5" />
            <span>Código MVC</span>
          </button>
        </div>

      </div>
    </header>
  );
};
