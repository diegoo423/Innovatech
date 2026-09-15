import React, { useState, useEffect } from 'react';
import { 
  User, 
  DeskDamage, 
  Classroom, 
  DamageStatus, 
  GRADOS_COLEGIO, 
  GradoColegio, 
  TIPOS_DANO, 
  TipoDano 
} from '../types';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Search, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Save, 
  X, 
  Layers, 
  Sparkles,
  School,
  User as UserIcon,
  Filter,
  Check,
  Users,
  ShieldCheck,
  GraduationCap,
  UserCheck,
  Mail,
  Calendar,
  LogIn,
  Power,
  UserX
} from 'lucide-react';

interface AdminTeacherDashboardProps {
  user: User;
  damages: DeskDamage[];
  classrooms: Classroom[];
  users: User[];
  onAddDamage: (damage: Omit<DeskDamage, 'id' | 'fechaRegistro'>) => void;
  onUpdateDamage: (updatedDamage: DeskDamage) => void;
  onDeleteDamage: (id: string) => void;
  onAddClassroom: (newClassroom: Classroom) => void;
  onUpdateUser?: (updatedUser: User) => void;
  defaultOpenModal?: boolean;
}

export const AdminTeacherDashboard: React.FC<AdminTeacherDashboardProps> = ({
  user,
  damages,
  classrooms,
  users,
  onAddDamage,
  onUpdateDamage,
  onDeleteDamage,
  onAddClassroom,
  onUpdateUser,
  defaultOpenModal,
}) => {
  // View Switcher on Dashboard: 'pupitres' or 'usuarios'
  const [activeDashboardView, setActiveDashboardView] = useState<'pupitres' | 'usuarios'>('pupitres');

  // Pupitres filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradoFilter, setSelectedGradoFilter] = useState('todos');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('todos');

  // User Registry filters and search
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [selectedUserRoleFilter, setSelectedUserRoleFilter] = useState<string>('todos');
  const [selectedUserStatusFilter, setSelectedUserStatusFilter] = useState<string>('todos');
  const [selectedUserSessionFilter, setSelectedUserSessionFilter] = useState<string>('todos');

  // Modal State for New / Edit Damage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDamage, setEditingDamage] = useState<DeskDamage | null>(null);

  // If navigated via "Registrar Daño" navbar tab, trigger the registration modal automatically
  useEffect(() => {
    if (defaultOpenModal) {
      handleOpenAddModal();
    }
  }, [defaultOpenModal]);

  // Form Fields
  const [codigoPupitre, setCodigoPupitre] = useState('');
  const [grado, setGrado] = useState<GradoColegio>('11-1');
  const [estudianteIdentificacion, setEstudianteIdentificacion] = useState('');
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const [tipoDano, setTipoDano] = useState<TipoDano>('Superficie dañada');
  const [customTipoDano, setCustomTipoDano] = useState('');
  const [motivo, setMotivo] = useState('');
  const [valorReparacion, setValorReparacion] = useState<number>(25000);
  const [estado, setEstado] = useState<DamageStatus>('Dañado');
  const [observaciones, setObservaciones] = useState('');
  const [formError, setFormError] = useState('');

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Students list for quick association
  const studentUsers = users.filter((u) => u.rol === 'estudiante');

  // Stats Calculations for Desks (Preserved exactly as requested)
  const totalPupitres = damages.length;
  const totalDanados = damages.filter((d) => d.estado === 'Dañado').length;
  const totalEnReparacion = damages.filter((d) => d.estado === 'En reparación').length;
  const totalArreglados = damages.filter((d) => d.estado === 'Arreglado').length;
  const costoTotalReparacion = damages.reduce((acc, curr) => acc + (curr.valorReparacion || 0), 0);

  // Stats Calculations for Users (New KPI Card)
  const totalUsuariosRegistrados = users.length;
  const usuariosConSesion = users.filter((u) => u.haIniciadoSesion || Boolean(u.ultimoInicioSesion));
  const totalUsuariosConSesion = usuariosConSesion.length;

  // Filtered damages list
  const filteredDamages = damages.filter((d) => {
    const matchesSearch =
      d.codigoPupitre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.estudianteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.estudianteIdentificacion.includes(searchTerm) ||
      (d.motivo && d.motivo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (d.tipoDano && d.tipoDano.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesGrado =
      selectedGradoFilter === 'todos' ||
      d.grado === selectedGradoFilter ||
      d.salonNombre.includes(selectedGradoFilter);

    const matchesStatus =
      selectedStatusFilter === 'todos' || d.estado === selectedStatusFilter;

    return matchesSearch && matchesGrado && matchesStatus;
  });

  // Filtered users list for Administrator Registry Consultation
  const filteredUsers = users.filter((u) => {
    const search = userSearchTerm.toLowerCase().trim();
    const matchesSearch =
      search === '' ||
      (u.nombre && u.nombre.toLowerCase().includes(search)) ||
      (u.nombreCompleto && u.nombreCompleto.toLowerCase().includes(search)) ||
      (u.correo && u.correo.toLowerCase().includes(search)) ||
      (u.identificacion && u.identificacion.includes(search));

    const matchesRole =
      selectedUserRoleFilter === 'todos' || u.rol === selectedUserRoleFilter;

    const userStatus = u.estado || 'Activo';
    const matchesStatus =
      selectedUserStatusFilter === 'todos' || userStatus === selectedUserStatusFilter;

    const hasSession = u.haIniciadoSesion || Boolean(u.ultimoInicioSesion);
    const matchesSession =
      selectedUserSessionFilter === 'todos' ||
      (selectedUserSessionFilter === 'con_sesion' && hasSession) ||
      (selectedUserSessionFilter === 'sin_sesion' && !hasSession);

    return matchesSearch && matchesRole && matchesStatus && matchesSession;
  });

  // Helper for formatting login timestamp
  const formatDateTime = (userItem: User) => {
    if (userItem.fechaUltimoInicio && userItem.horaUltimoInicio) {
      return {
        fecha: userItem.fechaUltimoInicio,
        hora: userItem.horaUltimoInicio,
        hasRecord: true,
      };
    }
    if (userItem.ultimoInicioSesion) {
      try {
        const d = new Date(userItem.ultimoInicioSesion);
        if (!isNaN(d.getTime())) {
          return {
            fecha: d.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            hora: d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true }),
            hasRecord: true,
          };
        }
      } catch (e) {
        // ignore fallback
      }
    }
    return {
      fecha: 'Sin registro',
      hora: '--:--',
      hasRecord: false,
    };
  };

  // Toggle user account status
  const handleToggleUserStatus = (userToToggle: User) => {
    if (!onUpdateUser) return;
    const currentStatus = userToToggle.estado || 'Activo';
    const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
    onUpdateUser({
      ...userToToggle,
      estado: newStatus,
    });
  };

  const handleOpenAddModal = () => {
    setEditingDamage(null);
    setFormError('');
    const randomNum = Math.floor(Math.random() * 89 + 10);
    setCodigoPupitre(`P-11-1-${randomNum}`);
    setGrado('11-1');
    
    if (studentUsers.length > 0) {
      setEstudianteIdentificacion(studentUsers[0].identificacion);
      setEstudianteNombre(studentUsers[0].nombre);
    } else {
      setEstudianteIdentificacion('1001234567');
      setEstudianteNombre('Juan Pérez Rodríguez');
    }

    setTipoDano('Superficie dañada');
    setCustomTipoDano('');
    setMotivo('');
    setValorReparacion(25000);
    setEstado('Dañado');
    setObservaciones('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (damage: DeskDamage) => {
    setEditingDamage(damage);
    setFormError('');
    setCodigoPupitre(damage.codigoPupitre);
    
    // Extract grado
    const matchedGrado = GRADOS_COLEGIO.find(g => g === damage.grado || damage.salonNombre.includes(g)) || '11-1';
    setGrado(matchedGrado);
    
    setEstudianteIdentificacion(damage.estudianteIdentificacion);
    setEstudianteNombre(damage.estudianteNombre);

    // Tipo de daño
    if (damage.tipoDano && TIPOS_DANO.includes(damage.tipoDano as TipoDano)) {
      setTipoDano(damage.tipoDano as TipoDano);
      setCustomTipoDano('');
    } else if (damage.tipoDano) {
      setTipoDano('Otro');
      setCustomTipoDano(damage.tipoDano);
    } else {
      setTipoDano('Superficie dañada');
      setCustomTipoDano('');
    }

    setMotivo(damage.motivo);
    setValorReparacion(damage.valorReparacion);
    setEstado(damage.estado);
    setObservaciones(damage.observacionesAdicionales || '');
    setIsModalOpen(true);
  };

  const handleStudentSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doc = e.target.value;
    if (doc === 'manual') {
      setEstudianteIdentificacion('');
      setEstudianteNombre('');
      return;
    }
    setEstudianteIdentificacion(doc);
    const found = studentUsers.find((s) => s.identificacion === doc);
    if (found) {
      setEstudianteNombre(found.nombre);
      if (found.grado && GRADOS_COLEGIO.includes(found.grado as GradoColegio)) {
        setGrado(found.grado as GradoColegio);
      }
    }
  };

  const handleGradoChange = (newGrado: GradoColegio) => {
    setGrado(newGrado);
    // Suggest an updated desk code prefix if creating new
    if (!editingDamage) {
      const parts = codigoPupitre.split('-');
      const lastNum = parts.length > 2 ? parts[parts.length - 1] : '01';
      setCodigoPupitre(`P-${newGrado}-${lastNum}`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!codigoPupitre.trim()) {
      setFormError('El código del pupitre es obligatorio.');
      return;
    }

    if (!estudianteNombre.trim()) {
      setFormError('El nombre del estudiante responsable es obligatorio.');
      return;
    }

    if (!estudianteIdentificacion.trim()) {
      setFormError('El número de documento del estudiante es obligatorio.');
      return;
    }

    const finalTipoDano = tipoDano === 'Otro' ? (customTipoDano.trim() || 'Otro tipo de daño') : tipoDano;

    if (!motivo.trim()) {
      setFormError('Por favor describe el motivo o causa del daño.');
      return;
    }

    const salonNombre = `Grado ${grado}`;
    const salonId = `salon-${grado.toLowerCase()}`;

    if (editingDamage) {
      onUpdateDamage({
        ...editingDamage,
        codigoPupitre: codigoPupitre.trim().toUpperCase(),
        salonId,
        salonNombre,
        grado,
        estudianteIdentificacion: estudianteIdentificacion.trim(),
        estudianteNombre: estudianteNombre.trim(),
        tipoDano: finalTipoDano,
        motivo: motivo.trim(),
        valorReparacion: Number(valorReparacion) || 0,
        estado,
        observacionesAdicionales: observaciones.trim(),
        fechaUltimaModificacion: new Date().toISOString().split('T')[0],
      });
    } else {
      onAddDamage({
        codigoPupitre: codigoPupitre.trim().toUpperCase(),
        salonId,
        salonNombre,
        grado,
        estudianteIdentificacion: estudianteIdentificacion.trim(),
        estudianteNombre: estudianteNombre.trim(),
        tipoDano: finalTipoDano,
        motivo: motivo.trim(),
        valorReparacion: Number(valorReparacion) || 0,
        estado,
        observacionesAdicionales: observaciones.trim(),
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* KPI Metrics Dashboard Bar - Preserves all 5 cards + Adds USUARIOS REGISTRADOS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        
        {/* Metric 1: Total Registrados (Preserved) */}
        <div 
          onClick={() => setActiveDashboardView('pupitres')}
          className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer ${
            activeDashboardView === 'pupitres' ? 'border-slate-400 ring-2 ring-slate-200' : 'border-gray-200 hover:border-slate-300'
          } shadow-sm flex items-center justify-between`}
        >
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Total Pupitres</span>
            <span className="text-2xl font-black text-slate-800 font-mono mt-0.5 block">{totalPupitres}</span>
          </div>
          <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2: Dañados (Preserved) */}
        <div 
          onClick={() => { setActiveDashboardView('pupitres'); setSelectedStatusFilter('Dañado'); }}
          className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-red-300 transition-all"
        >
          <div>
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">Estado Dañado</span>
            <span className="text-2xl font-black text-red-600 font-mono mt-0.5 block">{totalDanados}</span>
          </div>
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3: En Reparación (Preserved) */}
        <div 
          onClick={() => { setActiveDashboardView('pupitres'); setSelectedStatusFilter('En reparación'); }}
          className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all"
        >
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">En Reparación</span>
            <span className="text-2xl font-black text-amber-600 font-mono mt-0.5 block">{totalEnReparacion}</span>
          </div>
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4: Arreglados (Preserved) */}
        <div 
          onClick={() => { setActiveDashboardView('pupitres'); setSelectedStatusFilter('Arreglado'); }}
          className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all"
        >
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Arreglados</span>
            <span className="text-2xl font-black text-emerald-700 font-mono mt-0.5 block">{totalArreglados}</span>
          </div>
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 5: Costo Estimado (Preserved) */}
        <div className="bg-verde-oscuro p-4 rounded-2xl border border-verde-neon/40 shadow-sm flex items-center justify-between text-white">
          <div>
            <span className="text-[11px] font-bold text-verde-neon uppercase tracking-wider block">Costo Reparación</span>
            <span className="text-lg font-black text-white font-mono mt-0.5 block">
              ${costoTotalReparacion.toLocaleString('es-CO')}
            </span>
          </div>
          <div className="w-10 h-10 bg-verde-neon text-verde-oscuro rounded-xl flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5 stroke-[3]" />
          </div>
        </div>

        {/* Metric 6: NUEVA TARJETA: USUARIOS REGISTRADOS */}
        <div 
          id="card-usuarios-registrados"
          onClick={() => setActiveDashboardView('usuarios')}
          className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer ${
            activeDashboardView === 'usuarios' 
              ? 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/20' 
              : 'border-blue-200 hover:border-blue-400 hover:shadow-md'
          } shadow-sm flex items-center justify-between group`}
          title="Ver registro de usuarios e inicios de sesión"
        >
          <div>
            <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider block">
              Usuarios Registrados
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-800 font-mono block">{totalUsuariosRegistrados}</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                {totalUsuariosConSesion} activos
              </span>
            </div>
            <span className="text-[10px] text-gray-500 block mt-0.5">
              {totalUsuariosConSesion} con sesión iniciada
            </span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white rounded-xl flex items-center justify-center font-bold transition-colors">
            <Users className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* View Switcher Tabs: Pupitres vs. Usuarios Registrados */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200 gap-2">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            id="tab-view-pupitres"
            onClick={() => setActiveDashboardView('pupitres')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeDashboardView === 'pupitres'
                ? 'bg-verde-oscuro text-verde-neon shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Listado de Pupitres ({filteredDamages.length})</span>
          </button>

          <button
            id="tab-view-usuarios"
            onClick={() => setActiveDashboardView('usuarios')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeDashboardView === 'usuarios'
                ? 'bg-verde-oscuro text-verde-neon shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registro de Usuarios & Inicios de Sesión ({filteredUsers.length})</span>
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 px-2 text-[11px] text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Firestore Sincronizado</span>
          </span>
          {activeDashboardView === 'usuarios' && (
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-bold text-[10px]">
              {filteredUsers.length} de {users.length} usuarios
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: PUPITRES DAÑADOS (The "REGISTRAR PUPITRE" top card was removed)    */}
      {/* ========================================================================= */}
      {activeDashboardView === 'pupitres' && (
        <div className="space-y-4">
          
          {/* Main Actions & Filters Bar (WITHOUT the Registrar Pupitre button) */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar código, grado, estudiante o daño..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-verde-neon font-medium"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              
              {/* Filter by Grado (All 24 Grades) */}
              <div className="flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={selectedGradoFilter}
                  onChange={(e) => setSelectedGradoFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="todos">Todos los Grados (6-1 a 11-4)</option>
                  {GRADOS_COLEGIO.map((g) => (
                    <option key={g} value={g}>
                      Grado {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Status */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="todos">Todos los Estados</option>
                <option value="Dañado">🔴 Dañado</option>
                <option value="En reparación">🟡 En reparación</option>
                <option value="Arreglado">🟢 Arreglado</option>
              </select>

              {(searchTerm || selectedGradoFilter !== 'todos' || selectedStatusFilter !== 'todos') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGradoFilter('todos');
                    setSelectedStatusFilter('todos');
                  }}
                  className="px-3 py-2 text-xs text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Limpiar Filtros
                </button>
              )}

            </div>
          </div>

      {/* Main Table of Damaged Desks */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-verde-oscuro" />
            <h3 className="font-extrabold text-slate-800 text-sm">
              Listado de Pupitres Registrados ({filteredDamages.length})
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full font-bold">
            {user.rol === 'administrador' ? 'Acceso Administrador' : 'Acceso Docente'} • I.E.T. Pérez y Aldana
          </span>
        </div>

        {filteredDamages.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="font-bold text-sm">No hay pupitres con los criterios seleccionados.</p>
            <p className="text-xs text-gray-400">Haz clic en "Registrar Pupitre Dañado" para agregar uno nuevo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-gray-200">
                  <th className="p-3.5">Código</th>
                  <th className="p-3.5">Grado / Salón</th>
                  <th className="p-3.5">Estudiante Responsable</th>
                  <th className="p-3.5">Tipo de Daño & Causa</th>
                  <th className="p-3.5">Costo Reparación</th>
                  <th className="p-3.5">Estado</th>
                  <th className="p-3.5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDamages.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    
                    {/* Código */}
                    <td className="p-3.5 font-mono font-black text-slate-800">
                      {item.codigoPupitre}
                    </td>

                    {/* Grado / Salón */}
                    <td className="p-3.5 font-bold text-slate-700">
                      <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 font-mono font-bold">
                        {item.grado ? `Grado ${item.grado}` : item.salonNombre}
                      </span>
                    </td>

                    {/* Estudiante Responsable */}
                    <td className="p-3.5">
                      <div className="font-bold text-slate-800">{item.estudianteNombre}</div>
                      <div className="text-[11px] text-gray-400 font-mono">Doc: {item.estudianteIdentificacion}</div>
                    </td>

                    {/* Tipo de Daño & Motivo */}
                    <td className="p-3.5 max-w-xs">
                      {item.tipoDano && (
                        <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-bold mb-1">
                          {item.tipoDano}
                        </span>
                      )}
                      <div className="text-gray-700 leading-relaxed font-medium line-clamp-2">
                        {item.motivo}
                      </div>
                      {item.observacionesAdicionales && (
                        <div className="text-[10px] text-gray-400 italic mt-0.5">
                          Nota: {item.observacionesAdicionales}
                        </div>
                      )}
                    </td>

                    {/* Costo Reparación */}
                    <td className="p-3.5 font-mono font-bold text-emerald-700 text-sm whitespace-nowrap">
                      ${item.valorReparacion.toLocaleString('es-CO')} COP
                    </td>

                    {/* Estado con selector de cambio rápido */}
                    <td className="p-3.5 whitespace-nowrap">
                      <select
                        value={item.estado}
                        onChange={(e) =>
                          onUpdateDamage({
                            ...item,
                            estado: e.target.value as DamageStatus,
                            fechaUltimaModificacion: new Date().toISOString().split('T')[0],
                          })
                        }
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          item.estado === 'Dañado'
                            ? 'bg-red-100 text-red-700 border-red-300'
                            : item.estado === 'En reparación'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <option value="Dañado">🔴 Dañado</option>
                        <option value="En reparación">🟡 En reparación</option>
                        <option value="Arreglado">🟢 Arreglado</option>
                      </select>
                    </td>

                    {/* Acciones */}
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                          title="Editar Registro"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        
                        {deleteConfirmId === item.id ? (
                          <div className="flex items-center gap-1 bg-red-100 p-1 rounded-lg">
                            <button
                              onClick={() => {
                                onDeleteDamage(item.id);
                                setDeleteConfirmId(null);
                              }}
                              className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700"
                              title="Confirmar eliminación"
                            >
                              Eliminar
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-1 py-0.5 text-gray-500 hover:text-gray-800 text-[10px]"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                            title="Eliminar Registro"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )}

      {/* ========================================================================= */}
      {/* VIEW 2: REGISTRO DE USUARIOS & INICIOS DE SESIÓN (SOLICITADO POR USUARIO) */}
      {/* ========================================================================= */}
      {activeDashboardView === 'usuarios' && (
        <div className="space-y-4">
          
          {/* User Registry Search & Filters Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search by Name, Email or ID */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, correo o documento..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            {/* Filters: Role, Status, Session */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              
              {/* Filter by Tipo de Usuario */}
              <div className="flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={selectedUserRoleFilter}
                  onChange={(e) => setSelectedUserRoleFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="todos">Todos los Tipos de Usuario</option>
                  <option value="estudiante">👨‍🎓 Estudiantes</option>
                  <option value="docente">👨‍🏫 Profesores / Docentes</option>
                  <option value="administrador">🛡️ Administradores</option>
                </select>
              </div>

              {/* Filter by Estado */}
              <select
                value={selectedUserStatusFilter}
                onChange={(e) => setSelectedUserStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="todos">Todos los Estados</option>
                <option value="Activo">🟢 Cuenta Activa</option>
                <option value="Inactivo">⚪ Cuenta Inactiva</option>
              </select>

              {/* Filter by Login History */}
              <select
                value={selectedUserSessionFilter}
                onChange={(e) => setSelectedUserSessionFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="todos">Todos los Inicios de Sesión</option>
                <option value="con_sesion">✓ Con inicio de sesión</option>
                <option value="sin_sesion">✗ Sin inicio de sesión</option>
              </select>

              {(userSearchTerm || selectedUserRoleFilter !== 'todos' || selectedUserStatusFilter !== 'todos' || selectedUserSessionFilter !== 'todos') && (
                <button
                  onClick={() => {
                    setUserSearchTerm('');
                    setSelectedUserRoleFilter('todos');
                    setSelectedUserStatusFilter('todos');
                    setSelectedUserSessionFilter('todos');
                  }}
                  className="px-3 py-2 text-xs text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Limpiar Filtros
                </button>
              )}

            </div>
          </div>

          {/* User Registry Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            
            {/* Table Header with institutional badge */}
            <div className="p-4 bg-slate-50 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-700" />
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">
                    Registro de Usuarios e Inicios de Sesión ({filteredUsers.length})
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Historial de accesos, roles y estado de cuenta en la plataforma INNOVATECH
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-blue-800 bg-blue-100 px-3 py-1 rounded-full font-bold">
                  {totalUsuariosConSesion} de {totalUsuariosRegistrados} han iniciado sesión
                </span>
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="p-12 text-center text-gray-500 space-y-2">
                <UserX className="w-10 h-10 text-gray-400 mx-auto" />
                <p className="font-bold text-sm">No se encontraron usuarios con los filtros seleccionados.</p>
                <p className="text-xs text-gray-400">Intenta cambiar los términos de búsqueda o filtros de estado y rol.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-gray-200">
                      <th className="p-3.5">Nombre del Usuario</th>
                      <th className="p-3.5">Correo Electrónico</th>
                      <th className="p-3.5">Tipo de Usuario</th>
                      <th className="p-3.5">Fecha Último Inicio</th>
                      <th className="p-3.5">Hora Último Inicio</th>
                      <th className="p-3.5">Estado de la Cuenta</th>
                      {user.rol === 'administrador' && (
                        <th className="p-3.5 text-center">Gestión</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((u) => {
                      const dt = formatDateTime(u);
                      const isCurrentUser = u.id === user.id;
                      const accountStatus = u.estado || 'Activo';

                      return (
                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                          
                          {/* Nombre del Usuario con Avatar */}
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                u.rol === 'administrador'
                                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                  : u.rol === 'docente'
                                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                  : 'bg-blue-100 text-blue-700 border border-blue-200'
                              }`}>
                                {u.nombre.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                  <span>{u.nombreCompleto || u.nombre}</span>
                                  {isCurrentUser && (
                                    <span className="text-[10px] bg-verde-neon text-verde-oscuro font-black px-1.5 py-0.2 rounded">
                                      Tú
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-gray-500 font-mono">
                                  Doc: {u.identificacion}
                                  {u.grado && (
                                    <span className="ml-2 font-sans text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                                      Grado {u.grado}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Correo Electrónico */}
                          <td className="p-3.5 font-mono text-slate-700">
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span className="truncate max-w-[220px]" title={u.correo}>
                                {u.correo}
                              </span>
                            </div>
                          </td>

                          {/* Tipo de Usuario */}
                          <td className="p-3.5">
                            {u.rol === 'administrador' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Administrador
                              </span>
                            )}
                            {u.rol === 'docente' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <UserCheck className="w-3.5 h-3.5" />
                                Docente / Profesor
                              </span>
                            )}
                            {u.rol === 'estudiante' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                <GraduationCap className="w-3.5 h-3.5" />
                                Estudiante
                              </span>
                            )}
                          </td>

                          {/* Fecha Último Inicio */}
                          <td className="p-3.5">
                            {dt.hasRecord ? (
                              <div className="flex items-center gap-1.5 font-mono text-slate-800 font-bold">
                                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{dt.fecha}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 italic text-[11px]">
                                Sin inicios de sesión
                              </span>
                            )}
                          </td>

                          {/* Hora Último Inicio */}
                          <td className="p-3.5">
                            {dt.hasRecord ? (
                              <div className="flex items-center gap-1.5 font-mono text-slate-700">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span>{dt.hora}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 font-mono">--:--</span>
                            )}
                          </td>

                          {/* Estado de la Cuenta */}
                          <td className="p-3.5">
                            {accountStatus === 'Activo' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Activo
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                Inactivo
                              </span>
                            )}
                          </td>

                          {/* Acciones de Administrador */}
                          {user.rol === 'administrador' && (
                            <td className="p-3.5 text-center">
                              {onUpdateUser && !isCurrentUser ? (
                                <button
                                  onClick={() => handleToggleUserStatus(u)}
                                  title={`Cambiar a ${accountStatus === 'Activo' ? 'Inactivo' : 'Activo'}`}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
                                    accountStatus === 'Activo'
                                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                  }`}
                                >
                                  {accountStatus === 'Activo' ? 'Desactivar' : 'Activar'}
                                </button>
                              ) : (
                                <span className="text-[10px] text-gray-400 italic">Principal</span>
                              )}
                            </td>
                          )}

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL FORM: Registrar / Editar Daño de Pupitre           */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border-2 border-verde-oscuro relative animate-scaleIn my-8">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-200">
              <div className="w-11 h-11 bg-verde-oscuro text-verde-neon rounded-2xl flex items-center justify-center font-bold shrink-0">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  {editingDamage ? 'Editar Registro de Pupitre' : 'Registrar Pupitre Dañado'}
                </h3>
                <p className="text-xs text-emerald-700 font-semibold">
                  I.E. Técnica Pérez y Aldana • Purificación, Tolima
                </p>
              </div>
            </div>

            {/* Form Error Alert */}
            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              {/* Código y Grado en 2 Columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Código de Pupitre */}
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">
                    Número / Código del Pupitre *
                  </label>
                  <input
                    type="text"
                    value={codigoPupitre}
                    onChange={(e) => setCodigoPupitre(e.target.value)}
                    placeholder="Ej: P-11-1-04"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-mono text-xs font-bold focus:ring-2 focus:ring-verde-neon outline-none"
                    required
                  />
                  <span className="text-[10px] text-gray-400">Identificador físico único marcado en el pupitre.</span>
                </div>

                {/* Grado / Salón Dropdown (EXACTOS 24 GRADOS) */}
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">
                    Grado / Salón *
                  </label>
                  <select
                    value={grado}
                    onChange={(e) => handleGradoChange(e.target.value as GradoColegio)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-verde-neon outline-none cursor-pointer"
                  >
                    {GRADOS_COLEGIO.map((g) => (
                      <option key={g} value={g}>
                        Grado {g}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-gray-400">Lista completa de grados de la institución.</span>
                </div>

              </div>

              {/* Estudiante Responsable: Selector de existentes o escritura manual */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold uppercase text-gray-700 text-xs flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-verde-oscuro" />
                    <span>Estudiante Responsable / Asignado *</span>
                  </label>
                  <span className="text-[10px] text-gray-500">Seleccionar de lista o ingresar nuevo</span>
                </div>

                {/* Dropdown to pick existing student */}
                {studentUsers.length > 0 && (
                  <div>
                    <select
                      onChange={handleStudentSelectChange}
                      defaultValue=""
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-700 focus:ring-2 focus:ring-verde-neon outline-none cursor-pointer"
                    >
                      <option value="" disabled>Seleccionar estudiante registrado...</option>
                      {studentUsers.map((s) => (
                        <option key={s.id} value={s.identificacion}>
                          {s.nombre} (Doc: {s.identificacion}) - {s.grado || s.salonNombre || '11-1'}
                        </option>
                      ))}
                      <option value="manual">✍️ Escribir otro estudiante manualmente</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Nombre Completo del Estudiante</label>
                    <input
                      type="text"
                      value={estudianteNombre}
                      onChange={(e) => setEstudianteNombre(e.target.value)}
                      placeholder="Ej: Daniel Gómez"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-verde-neon outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-0.5">N° Documento de Identidad</label>
                    <input
                      type="text"
                      value={estudianteIdentificacion}
                      onChange={(e) => setEstudianteIdentificacion(e.target.value)}
                      placeholder="Ej: 1005998877"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-semibold focus:ring-2 focus:ring-verde-neon outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Tipo de Daño Dropdown */}
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">
                  Tipo de Daño o Motivo *
                </label>
                <select
                  value={tipoDano}
                  onChange={(e) => setTipoDano(e.target.value as TipoDano)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-verde-neon outline-none cursor-pointer"
                >
                  {TIPOS_DANO.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              {/* If "Otro", custom damage field */}
              {tipoDano === 'Otro' && (
                <div>
                  <label className="block font-bold uppercase text-amber-700 mb-1">
                    Especificar Tipo de Daño Personalizado *
                  </label>
                  <input
                    type="text"
                    value={customTipoDano}
                    onChange={(e) => setCustomTipoDano(e.target.value)}
                    placeholder="Describe el tipo específico de daño..."
                    className="w-full px-3.5 py-2.5 bg-amber-50/50 border border-amber-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
                    required
                  />
                </div>
              )}

              {/* Motivo o Detalle de la Avería */}
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">
                  Descripción Detallada del Daño o Razón *
                </label>
                <textarea
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  placeholder="Detalla cómo ocurrió el daño o el estado del pupitre (ej. Pata metálica desprendida en la soldadura inferior por sobrepeso de morral)..."
                  rows={2}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-verde-neon outline-none"
                  required
                />
              </div>

              {/* Valor de Reparación y Estado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Costo */}
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">
                    Valor Estimado de Reparación (COP $) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-500">$</span>
                    <input
                      type="number"
                      value={valorReparacion}
                      onChange={(e) => setValorReparacion(Number(e.target.value))}
                      step={1000}
                      min={0}
                      placeholder="25000"
                      className="w-full pl-8 pr-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-mono text-xs font-bold text-emerald-800 focus:ring-2 focus:ring-verde-neon outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">
                    Estado del Pupitre *
                  </label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value as DamageStatus)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-verde-neon outline-none cursor-pointer"
                  >
                    <option value="Dañado">🔴 Dañado</option>
                    <option value="En reparación">🟡 En reparación</option>
                    <option value="Arreglado">🟢 Arreglado</option>
                  </select>
                </div>
              </div>

              {/* Observaciones Adicionales */}
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">
                  Observaciones Adicionales (Opcional)
                </label>
                <input
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Ej: Remitido al taller de ebanistería, repuesto pendiente..."
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-verde-neon outline-none"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-verde-oscuro text-verde-neon font-black text-xs uppercase tracking-wider rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg border border-verde-neon cursor-pointer"
                >
                  <Save className="w-4 h-4 stroke-[2.5]" />
                  <span>{editingDamage ? 'GUARDAR CAMBIOS EN PUPITRE' : 'REGISTRAR PUPITRE EN BASE DE DATOS'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
