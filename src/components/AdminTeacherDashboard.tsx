import React, { useState } from 'react';
import { User, DeskDamage, Classroom, DamageStatus } from '../types';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  BarChart3, 
  Users, 
  School, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Save, 
  X, 
  FileSpreadsheet,
  Check,
  ShieldCheck,
  Layers,
  Sparkles
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
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassroomFilter, setSelectedClassroomFilter] = useState('todos');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('todos');

  // Modal State for New / Edit Damage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDamage, setEditingDamage] = useState<DeskDamage | null>(null);

  // Form Fields
  const [codigoPupitre, setCodigoPupitre] = useState('');
  const [salonId, setSalonId] = useState(classrooms[0]?.id || 'salon-11a');
  const [estudianteIdentificacion, setEstudianteIdentificacion] = useState('');
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const [motivo, setMotivo] = useState('');
  const [valorReparacion, setValorReparacion] = useState<number>(0);
  const [estado, setEstado] = useState<DamageStatus>('Dañado');
  const [observaciones, setObservaciones] = useState('');

  // Add Classroom Modal state
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);
  const [nuevoNombreSalon, setNuevoNombreSalon] = useState('');
  const [nuevaUbicacion, setNuevaUbicacion] = useState('');

  const studentUsers = users.filter((u) => u.rol === 'estudiante');

  // Stats Calculations
  const totalPupitres = damages.length;
  const totalDanados = damages.filter((d) => d.estado === 'Dañado').length;
  const totalEnReparacion = damages.filter((d) => d.estado === 'En reparación').length;
  const totalArreglados = damages.filter((d) => d.estado === 'Arreglado').length;
  const costoTotalReparacion = damages.reduce((acc, curr) => acc + (curr.valorReparacion || 0), 0);

  // Filtered damages list
  const filteredDamages = damages.filter((d) => {
    const matchesSearch =
      d.codigoPupitre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.estudianteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.motivo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClassroom =
      selectedClassroomFilter === 'todos' || d.salonId === selectedClassroomFilter;

    const matchesStatus =
      selectedStatusFilter === 'todos' || d.estado === selectedStatusFilter;

    return matchesSearch && matchesClassroom && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingDamage(null);
    setCodigoPupitre(`P-11A-${Math.floor(Math.random() * 89 + 10)}`);
    setSalonId(classrooms[0]?.id || 'salon-11a');
    setEstudianteIdentificacion(studentUsers[0]?.identificacion || '1001234567');
    setEstudianteNombre(studentUsers[0]?.nombre || 'Juan Pérez Rodríguez');
    setMotivo('');
    setValorReparacion(20000);
    setEstado('Dañado');
    setObservaciones('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (damage: DeskDamage) => {
    setEditingDamage(damage);
    setCodigoPupitre(damage.codigoPupitre);
    setSalonId(damage.salonId);
    setEstudianteIdentificacion(damage.estudianteIdentificacion);
    setEstudianteNombre(damage.estudianteNombre);
    setMotivo(damage.motivo);
    setValorReparacion(damage.valorReparacion);
    setEstado(damage.estado);
    setObservaciones(damage.observacionesAdicionales || '');
    setIsModalOpen(true);
  };

  const handleStudentSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doc = e.target.value;
    setEstudianteIdentificacion(doc);
    const found = studentUsers.find((s) => s.identificacion === doc);
    if (found) {
      setEstudianteNombre(found.nombre);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selSalon = classrooms.find((c) => c.id === salonId);
    const salonNombre = selSalon ? selSalon.nombre : 'Salón 11-A';

    if (editingDamage) {
      onUpdateDamage({
        ...editingDamage,
        codigoPupitre,
        salonId,
        salonNombre,
        estudianteIdentificacion,
        estudianteNombre,
        motivo,
        valorReparacion: Number(valorReparacion),
        estado,
        observacionesAdicionales: observaciones,
        fechaUltimaModificacion: new Date().toISOString().split('T')[0],
      });
    } else {
      onAddDamage({
        codigoPupitre,
        salonId,
        salonNombre,
        estudianteIdentificacion,
        estudianteNombre,
        motivo,
        valorReparacion: Number(valorReparacion),
        estado,
        observacionesAdicionales: observaciones,
      });
    }

    setIsModalOpen(false);
  };

  const handleAddClassroomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreSalon.trim()) return;

    onAddClassroom({
      id: `salon-${Date.now()}`,
      nombre: nuevoNombreSalon,
      ubicacion: nuevaUbicacion || 'Bloque Principal',
      capacidad: 35,
      totalPupitres: 35,
    });

    setNuevoNombreSalon('');
    setNuevaUbicacion('');
    setIsClassroomModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Metrics Dashboard Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Metric 1: Total Registrados */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Total Registrados</span>
            <span className="text-2xl font-black text-slate-800 font-mono mt-1 block">{totalPupitres}</span>
          </div>
          <div className="w-11 h-11 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Dañados */}
        <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">Estado Dañado</span>
            <span className="text-2xl font-black text-red-600 font-mono mt-1 block">{totalDanados}</span>
          </div>
          <div className="w-11 h-11 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: En Reparación */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">En Reparación</span>
            <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">{totalEnReparacion}</span>
          </div>
          <div className="w-11 h-11 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: Arreglados */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Arreglados</span>
            <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">{totalArreglados}</span>
          </div>
          <div className="w-11 h-11 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 5: Costo Acumulado */}
        <div className="bg-verde-oscuro p-5 rounded-2xl border border-verde-neon/40 shadow-sm flex items-center justify-between text-white col-span-1 sm:col-span-2 lg:col-span-1">
          <div>
            <span className="text-xs font-bold text-verde-neon uppercase tracking-wider block">Costo Reparaciones</span>
            <span className="text-xl font-black text-white font-mono mt-1 block">
              ${costoTotalReparacion.toLocaleString('es-CO')}
            </span>
          </div>
          <div className="w-11 h-11 bg-verde-neon text-verde-oscuro rounded-xl flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6 stroke-[3]" />
          </div>
        </div>

      </div>

      {/* Main Actions & Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, estudiante, motivo..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-verde-neon"
          />
        </div>

        {/* Classroom & Status Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          
          <select
            value={selectedClassroomFilter}
            onChange={(e) => setSelectedClassroomFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
          >
            <option value="todos">Todos los Salones</option>
            {classrooms.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
          >
            <option value="todos">Todos los Estados</option>
            <option value="Dañado">Dañado</option>
            <option value="En reparación">En Reparación</option>
            <option value="Arreglado">Arreglado</option>
          </select>

          <button
            onClick={() => setIsClassroomModalOpen(true)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all border border-slate-300"
          >
            <School className="w-4 h-4" />
            <span>+ Crear Salón</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-verde-oscuro text-verde-neon font-extrabold text-xs rounded-xl flex items-center gap-2 transition-all hover:bg-black shadow-md border border-verde-neon"
          >
            <PlusCircle className="w-4 h-4" />
            <span>REGISTRAR NUEVO DAÑO</span>
          </button>

        </div>
      </div>

      {/* Main Table of Damaged Desks */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-verde-oscuro" /> Registros de Pupitres en la Institución ({filteredDamages.length})
          </h3>
          <span className="text-xs text-gray-500 font-mono">
            {user.rol === 'administrador' ? 'Acceso Administrador Total' : 'Acceso Docente de Gestión'}
          </span>
        </div>

        {filteredDamages.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="font-bold text-sm">No hay registros que coincidan con los criterios de búsqueda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-gray-200">
                  <th className="p-3.5">Código Pupitre</th>
                  <th className="p-3.5">Salón</th>
                  <th className="p-3.5">Estudiante Responsable</th>
                  <th className="p-3.5">Motivo / Causa del Daño</th>
                  <th className="p-3.5">Costo Reparación</th>
                  <th className="p-3.5">Estado</th>
                  <th className="p-3.5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDamages.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    
                    {/* Código */}
                    <td className="p-3.5 font-mono font-extrabold text-slate-800">
                      {item.codigoPupitre}
                    </td>

                    {/* Salón */}
                    <td className="p-3.5 font-bold text-slate-700">
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        {item.salonNombre}
                      </span>
                    </td>

                    {/* Estudiante Responsable */}
                    <td className="p-3.5">
                      <div className="font-bold text-slate-800">{item.estudianteNombre}</div>
                      <div className="text-[10px] text-gray-400 font-mono">Doc: {item.estudianteIdentificacion}</div>
                    </td>

                    {/* Motivo */}
                    <td className="p-3.5 max-w-xs text-gray-700 leading-relaxed font-medium">
                      {item.motivo}
                    </td>

                    {/* Costo Reparación */}
                    <td className="p-3.5 font-mono font-bold text-emerald-700 text-sm">
                      ${item.valorReparacion.toLocaleString('es-CO')} COP
                    </td>

                    {/* Estado con selector de cambio rápido */}
                    <td className="p-3.5">
                      <select
                        value={item.estado}
                        onChange={(e) =>
                          onUpdateDamage({
                            ...item,
                            estado: e.target.value as DamageStatus,
                            fechaUltimaModificacion: new Date().toISOString().split('T')[0],
                          })
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
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
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Editar Registro"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteDamage(item.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Eliminar Registro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL FORM: Registrar / Editar Daño */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border-2 border-verde-oscuro animate-scaleIn relative">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
              <div className="w-10 h-10 bg-verde-oscuro text-verde-neon rounded-xl flex items-center justify-center font-bold">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-800">
                  {editingDamage ? 'Editar Registro de Pupitre' : 'Registrar Nuevo Daño de Pupitre'}
                </h3>
                <p className="text-xs text-gray-500">I.E. Técnica Pérez y Aldana - Sistema Innovatech</p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                {/* Código */}
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Código de Pupitre</label>
                  <input
                    type="text"
                    value={codigoPupitre}
                    onChange={(e) => setCodigoPupitre(e.target.value)}
                    placeholder="Ej: P-11A-04"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-mono text-xs font-bold focus:ring-2 focus:ring-verde-neon outline-none"
                    required
                  />
                </div>

                {/* Salón */}
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Salón de Clase</label>
                  <select
                    value={salonId}
                    onChange={(e) => setSalonId(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-verde-neon outline-none"
                  >
                    {classrooms.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Estudiante Responsable */}
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">
                  Estudiante Responsable / Asignado
                </label>
                <select
                  value={estudianteIdentificacion}
                  onChange={handleStudentSelectChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-verde-neon outline-none"
                >
                  {studentUsers.map((s) => (
                    <option key={s.id} value={s.identificacion}>
                      {s.nombre} (Doc: {s.identificacion}) - {s.salonNombre || '11-A'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Motivo del Daño */}
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Motivo o Causa del Daño</label>
                <textarea
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  placeholder="Detalla qué le ocurrió al mueble (ej. Pata metálica desprendida, tríplex fisurado...)"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-verde-neon outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Costo de Reparación */}
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Costo Estimado (COP $)</label>
                  <input
                    type="number"
                    value={valorReparacion}
                    onChange={(e) => setValorReparacion(Number(e.target.value))}
                    step={1000}
                    min={0}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-mono text-xs font-bold focus:ring-2 focus:ring-verde-neon outline-none"
                    required
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Estado de Reparación</label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value as DamageStatus)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-verde-neon outline-none"
                  >
                    <option value="Dañado">🔴 Dañado</option>
                    <option value="En reparación">🟡 En reparación</option>
                    <option value="Arreglado">🟢 Arreglado</option>
                  </select>
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Observaciones Adicionales</label>
                <input
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Notas de ebanistería, repuestos requeridos..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-verde-neon outline-none"
                />
              </div>

              {/* Submit button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-verde-oscuro text-verde-neon font-bold text-sm rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md border border-verde-neon"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingDamage ? 'GUARDAR CAMBIOS' : 'REGISTRAR PUPITRE'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM: Crear Nuevo Salón */}
      {isClassroomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-verde-oscuro relative">
            <button
              onClick={() => setIsClassroomModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <School className="w-5 h-5 text-verde-oscuro" /> Registrar Nuevo Salón de Clase
            </h3>

            <form onSubmit={handleAddClassroomSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nombre del Salón (ej. Salón 11-C)</label>
                <input
                  type="text"
                  value={nuevoNombreSalon}
                  onChange={(e) => setNuevoNombreSalon(e.target.value)}
                  placeholder="Ej: Salón 11-C"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Ubicación Física</label>
                <input
                  type="text"
                  value={nuevaUbicacion}
                  onChange={(e) => setNuevaUbicacion(e.target.value)}
                  placeholder="Ej: Piso 3 - Bloque de Aulas"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-verde-oscuro text-verde-neon font-bold rounded-xl mt-2"
              >
                CREAR SALÓN
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
