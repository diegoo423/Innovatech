import React, { useState, useEffect } from 'react';
import { User, DeskDamage, Classroom, SystemNotification } from './types';
import { 
  initialUsers, 
  initialDeskDamages, 
  initialClassrooms, 
  initialNotifications 
} from './data/initialData';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminTeacherDashboard } from './components/AdminTeacherDashboard';
import { PhpMvcExporter } from './components/PhpMvcExporter';
import { 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  School, 
  TrendingUp, 
  PieChart, 
  Info,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export default function App() {
  // State initialization with localStorage persistence
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('innovatech_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('innovatech_users_list');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [damages, setDamages] = useState<DeskDamage[]>(() => {
    const saved = localStorage.getItem('innovatech_damages');
    return saved ? JSON.parse(saved) : initialDeskDamages;
  });

  const [classrooms, setClassrooms] = useState<Classroom[]>(() => {
    const saved = localStorage.getItem('innovatech_classrooms');
    return saved ? JSON.parse(saved) : initialClassrooms;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem('innovatech_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'new_damage' | 'reports' | 'code_mvc' | 'notifications'>('dashboard');

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('innovatech_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('innovatech_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('innovatech_damages', JSON.stringify(damages));
  }, [damages]);

  useEffect(() => {
    localStorage.setItem('innovatech_classrooms', JSON.stringify(classrooms));
  }, [classrooms]);

  useEffect(() => {
    localStorage.setItem('innovatech_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('innovatech_users_list', JSON.stringify(users));
  }, [users]);

  // Auth Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSwitchUser = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setActiveTab('dashboard');
    }
  };

  // Damage CRUD Handlers
  const handleAddDamage = (newDamage: Omit<DeskDamage, 'id' | 'fechaRegistro'>) => {
    const created: DeskDamage = {
      ...newDamage,
      id: `pup-${Date.now()}`,
      fechaRegistro: new Date().toISOString().split('T')[0],
    };

    setDamages([created, ...damages]);

    // Send automated notification
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      titulo: `Nuevo Registro de Pupitre ${created.codigoPupitre}`,
      mensaje: `Se registró novedad en ${created.salonNombre} con un valor estimado de $${created.valorReparacion.toLocaleString('es-CO')} COP.`,
      fecha: new Date().toISOString().split('T')[0],
      tipo: 'warning',
      destinatarioRol: 'todos',
      leido: false,
    };

    setNotifications([newNotif, ...notifications]);
  };

  const handleUpdateDamage = (updated: DeskDamage) => {
    setDamages(damages.map((d) => (d.id === updated.id ? updated : d)));
  };

  const handleDeleteDamage = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este registro de pupitre?')) {
      setDamages(damages.filter((d) => d.id !== id));
    }
  };

  const handleAddClassroom = (newClassroom: Classroom) => {
    setClassrooms([...classrooms, newClassroom]);
  };

  // If user is not logged in, render the exact requested Login View
  if (!currentUser) {
    return <LoginView onLoginSuccess={handleLoginSuccess} users={users} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-verde-neon selection:text-verde-oscuro">
      
      {/* Top Application Navigation Bar */}
      <Header
        user={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        onSwitchUser={handleSwitchUser}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Render Tab 1: Code MVC (PHP Inspector & Exporter) */}
        {activeTab === 'code_mvc' && <PhpMvcExporter />}

        {/* Render Tab 2: New Damage (Shortcut to Modal for Teachers) */}
        {activeTab === 'new_damage' && (
          <AdminTeacherDashboard
            user={currentUser}
            damages={damages}
            classrooms={classrooms}
            users={users}
            onAddDamage={handleAddDamage}
            onUpdateDamage={handleUpdateDamage}
            onDeleteDamage={handleDeleteDamage}
            onAddClassroom={handleAddClassroom}
          />
        )}

        {/* Render Tab 3: Detailed Statistics & Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-verde-oscuro font-bold text-xs uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-verde-neon" /> Módulo de Inteligencia de Datos & Reportes
              </div>
              <h2 className="text-2xl font-black text-slate-800">
                Estadísticas Globales de Mobiliario I.E.T. Pérez y Aldana
              </h2>
              <p className="text-xs text-gray-500">
                Resumen analítico consolidado para la gestión eficiente de recursos y presupuestos de mantenimiento.
              </p>
            </div>

            {/* Metrics Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase block">Total pupitres auditados</span>
                <span className="text-3xl font-black text-slate-800 font-mono mt-2 block">{damages.length}</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-sm">
                <span className="text-xs font-bold text-red-600 uppercase block">Dañados (Requieren Acción)</span>
                <span className="text-3xl font-black text-red-600 font-mono mt-2 block">
                  {damages.filter((d) => d.estado === 'Dañado').length}
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm">
                <span className="text-xs font-bold text-amber-600 uppercase block">En Reparación Actual</span>
                <span className="text-3xl font-black text-amber-600 font-mono mt-2 block">
                  {damages.filter((d) => d.estado === 'En reparación').length}
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm">
                <span className="text-xs font-bold text-emerald-700 uppercase block">Arreglados / Reparados</span>
                <span className="text-3xl font-black text-emerald-700 font-mono mt-2 block">
                  {damages.filter((d) => d.estado === 'Arreglado').length}
                </span>
              </div>
            </div>

            {/* Classroom Breakdown Table */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-800 text-base">
                Desglose de Daños y Costos por Salón de Clase
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                      <th className="p-3 rounded-l-xl">Salón de Clase</th>
                      <th className="p-3">Ubicación</th>
                      <th className="p-3 text-center">Pupitres Dañados</th>
                      <th className="p-3 text-center">En Reparación</th>
                      <th className="p-3 text-center">Arreglados</th>
                      <th className="p-3 text-right rounded-r-xl">Inversión Estimada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {classrooms.map((c) => {
                      const cDamages = damages.filter((d) => d.salonId === c.id || d.salonNombre === c.nombre);
                      const cDanados = cDamages.filter((d) => d.estado === 'Dañado').length;
                      const cEnRep = cDamages.filter((d) => d.estado === 'En reparación').length;
                      const cArr = cDamages.filter((d) => d.estado === 'Arreglado').length;
                      const cCosto = cDamages.reduce((acc, curr) => acc + curr.valorReparacion, 0);

                      return (
                        <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-slate-800">{c.nombre}</td>
                          <td className="p-3 text-gray-500">{c.ubicacion}</td>
                          <td className="p-3 text-center font-bold text-red-600 font-mono">{cDanados}</td>
                          <td className="p-3 text-center font-bold text-amber-600 font-mono">{cEnRep}</td>
                          <td className="p-3 text-center font-bold text-emerald-600 font-mono">{cArr}</td>
                          <td className="p-3 text-right font-bold text-slate-900 font-mono">
                            ${cCosto.toLocaleString('es-CO')} COP
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Render Tab 4: Main Dashboard based on Role */}
        {activeTab === 'dashboard' && (
          <>
            {currentUser.rol === 'estudiante' ? (
              <StudentDashboard
                user={currentUser}
                damages={damages}
                notifications={notifications}
                classrooms={classrooms}
                onReportDamage={handleAddDamage}
              />
            ) : (
              <AdminTeacherDashboard
                user={currentUser}
                damages={damages}
                classrooms={classrooms}
                users={users}
                onAddDamage={handleAddDamage}
                onUpdateDamage={handleUpdateDamage}
                onDeleteDamage={handleDeleteDamage}
                onAddClassroom={handleAddClassroom}
              />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-verde-oscuro text-white border-t border-verde-neon/30 py-6 text-center text-xs space-y-1">
        <p className="font-bold tracking-wider text-verde-neon">
          INNOVATECH © 2026 - INSTITUCIÓN EDUCATIVA TÉCNICA PÉREZ Y ALDANA
        </p>
        <p className="text-gray-400">
          Proyecto de Desarrollo Web para Grado 11 - Patrón de Diseño MVC, PHP & MySQL
        </p>
      </footer>

    </div>
  );
}
