import React, { useState } from 'react';
import { User, DeskDamage, SystemNotification, Classroom, GRADOS_COLEGIO, GradoColegio, TIPOS_DANO, TipoDano } from '../types';
import { 
  School, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  History, 
  Bell, 
  PlusCircle, 
  Info,
  DollarSign,
  Send,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  damages: DeskDamage[];
  notifications: SystemNotification[];
  classrooms: Classroom[];
  onReportDamage: (newReport: Omit<DeskDamage, 'id' | 'fechaRegistro'>) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  damages,
  notifications,
  classrooms,
  onReportDamage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [activeTab, setActiveTab] = useState<'my_classroom' | 'my_history' | 'notifications' | 'report'>('my_classroom');

  // Student grade helper
  const initialStudentGrado = (user.grado && GRADOS_COLEGIO.includes(user.grado as GradoColegio)) 
    ? (user.grado as GradoColegio) 
    : (user.salonNombre && GRADOS_COLEGIO.includes(user.salonNombre as GradoColegio)) 
    ? (user.salonNombre as GradoColegio)
    : '11-1';

  // Report form state
  const [codigoPupitre, setCodigoPupitre] = useState('');
  const [reportGrado, setReportGrado] = useState<GradoColegio>(initialStudentGrado);
  const [reportTipoDano, setReportTipoDano] = useState<TipoDano>('Superficie dañada');
  const [reportCustomDano, setReportCustomDano] = useState('');
  const [motivoReporte, setMotivoReporte] = useState('');
  const [showReportSuccess, setShowReportSuccess] = useState(false);

  // Filter damages for student's assigned classroom/grade
  const classroomDamages = damages.filter((d) => 
    (user.grado && (d.grado === user.grado || d.salonNombre.includes(user.grado))) ||
    d.salonId === user.salonId || 
    d.salonNombre === user.salonNombre
  );
  
  const studentHistoryDamages = damages.filter(
    (d) => d.estudianteIdentificacion === user.identificacion || d.estudianteNombre.toLowerCase().includes(user.nombre.toLowerCase().split(' ')[0])
  );

  const filteredClassroomDamages = classroomDamages.filter((d) => {
    const matchesSearch = 
      d.codigoPupitre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.motivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.estudianteNombre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || d.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigoPupitre.trim() || !motivoReporte.trim()) return;

    const finalTipoDano = reportTipoDano === 'Otro' ? (reportCustomDano.trim() || 'Otro tipo de daño') : reportTipoDano;

    onReportDamage({
      codigoPupitre: codigoPupitre.toUpperCase().trim(),
      salonId: `salon-${reportGrado.toLowerCase()}`,
      salonNombre: `Grado ${reportGrado}`,
      grado: reportGrado,
      estudianteId: user.id,
      estudianteNombre: user.nombre,
      estudianteIdentificacion: user.identificacion,
      tipoDano: finalTipoDano,
      motivo: motivoReporte.trim(),
      valorReparacion: 0,
      estado: 'Dañado',
      observacionesAdicionales: 'Reportado por el estudiante desde la plataforma.',
    });

    setCodigoPupitre('');
    setMotivoReporte('');
    setReportCustomDano('');
    setShowReportSuccess(true);
    setTimeout(() => {
      setShowReportSuccess(false);
      setActiveTab('my_classroom');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Student Welcome Hero Card */}
      <div className="bg-verde-oscuro text-white rounded-3xl p-6 md:p-8 border-2 border-verde-neon/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-verde-neon/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-verde-neon/20 border border-verde-neon text-verde-neon rounded-full text-xs font-bold uppercase tracking-wider">
              <School className="w-3.5 h-3.5" /> Portal de Consulta Estudiantil
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¡Hola, <span className="text-verde-neon">{user.nombre}</span>!
            </h2>
            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
              Perteneces al <strong className="text-verde-neon">{user.salonNombre || 'Salón 11-A'}</strong>. Desde este panel puedes consultar el estado técnico de los pupitres de tu salón, revisar tu historial de daños asignados y reportar novedades.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 shrink-0 grid grid-cols-2 gap-4 text-center">
            <div className="border-r border-white/10 pr-4">
              <span className="block text-2xl font-black text-verde-neon">{classroomDamages.length}</span>
              <span className="text-[11px] text-gray-300 font-medium">Pupitres en Registro</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-amber-400">
                {classroomDamages.filter((d) => d.estado !== 'Arreglado').length}
              </span>
              <span className="text-[11px] text-gray-300 font-medium">En Reparación / Dañados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Student Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('my_classroom')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'my_classroom'
              ? 'bg-verde-oscuro text-verde-neon border-2 border-verde-neon shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Pupitres de mi Salón ({user.salonNombre || '11-A'})</span>
        </button>

        <button
          onClick={() => setActiveTab('my_history')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'my_history'
              ? 'bg-verde-oscuro text-verde-neon border-2 border-verde-neon shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Mi Historial Personal ({studentHistoryDamages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'notifications'
              ? 'bg-verde-oscuro text-verde-neon border-2 border-verde-neon shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Avisos del Colegio</span>
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'report'
              ? 'bg-verde-neon text-verde-oscuro font-extrabold border-2 border-verde-oscuro shadow-md'
              : 'bg-verde-neon/20 text-emerald-900 hover:bg-verde-neon/30 border border-emerald-300'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Reportar Pupitre Dañado</span>
        </button>
      </div>

      {/* TAB 1: PUPITRES DE MI SALÓN */}
      {activeTab === 'my_classroom' && (
        <div className="space-y-4">
          
          {/* Search & Status Filters */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por código (ej. P-11A-04) o motivo..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-verde-neon focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-gray-500 uppercase">Estado:</span>
              {(['todos', 'Dañado', 'En reparación', 'Arreglado'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    statusFilter === st
                      ? 'bg-verde-oscuro text-verde-neon border border-verde-neon'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {st === 'todos' ? 'Todos los Estados' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List of Damaged Desks in Classroom */}
          {filteredClassroomDamages.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-gray-800 text-lg">No hay daños reportados con este filtro</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Los pupitres de tu salón se encuentran en buen estado o no coinciden con los términos de búsqueda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClassroomDamages.map((desk) => (
                <div
                  key={desk.id}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Desk Code & Status Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-lg text-sm border border-slate-300">
                        {desk.codigoPupitre}
                      </span>

                      {desk.estado === 'Dañado' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-300">
                          <AlertTriangle className="w-3.5 h-3.5" /> Dañado
                        </span>
                      )}

                      {desk.estado === 'En reparación' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                          <Clock className="w-3.5 h-3.5" /> En Reparación
                        </span>
                      )}

                      {desk.estado === 'Arreglado' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Arreglado
                        </span>
                      )}
                    </div>

                    {/* Classroom & Responsible Student */}
                    <div className="space-y-1 mb-3">
                      <p className="text-xs text-gray-500 font-medium">
                        Salón: <strong className="text-gray-800">{desk.salonNombre}</strong>
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        Estudiante Responsable: <strong className="text-gray-800">{desk.estudianteNombre}</strong>
                      </p>
                    </div>

                    {/* Damage Motive */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Motivo / Descripción del Daño:
                      </span>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        "{desk.motivo}"
                      </p>
                    </div>
                  </div>

                  {/* Footer: Repair Cost & Date */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Costo Estimado:</span>
                      <span className="font-bold text-slate-800 font-mono">
                        ${desk.valorReparacion.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">Fecha Registro:</span>
                      <span className="font-mono text-gray-600">{desk.fechaRegistro}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MI HISTORIAL PERSONAL */}
      {activeTab === 'my_history' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <History className="w-5 h-5 text-verde-oscuro" /> Historial de Daños a mi Nombre
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Muestra todos los registros donde figuras como estudiante responsable del pupitre.
              </p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full font-mono">
              Documento: {user.identificacion}
            </span>
          </div>

          {studentHistoryDamages.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-gray-800 text-base">¡Excelente! No tienes registros de daño a tu nombre</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Mantener los pupitres en excelente estado es compromiso de todos en la I.E. Técnica Pérez y Aldana.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="p-3 rounded-l-xl">Código</th>
                    <th className="p-3">Salón</th>
                    <th className="p-3">Motivo del Daño</th>
                    <th className="p-3">Costo Reparación</th>
                    <th className="p-3">Estado Actual</th>
                    <th className="p-3 rounded-r-xl">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {studentHistoryDamages.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-800">{item.codigoPupitre}</td>
                      <td className="p-3 font-medium text-gray-600">{item.salonNombre}</td>
                      <td className="p-3 text-gray-700 max-w-xs">{item.motivo}</td>
                      <td className="p-3 font-mono font-bold text-slate-800">${item.valorReparacion.toLocaleString('es-CO')}</td>
                      <td className="p-3">
                        {item.estado === 'Dañado' && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">Dañado</span>}
                        {item.estado === 'En reparación' && <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">En Reparación</span>}
                        {item.estado === 'Arreglado' && <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Arreglado</span>}
                      </td>
                      <td className="p-3 font-mono text-gray-500">{item.fechaRegistro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: AVISOS Y NOTIFICACIONES */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-verde-oscuro" /> Avisos Oficiales de la Institución
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Comunicados de docentes, mantenimiento y coordinaciones de la I.E.T. Pérez y Aldana.
            </p>
          </div>

          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-verde-neon transition-all flex items-start gap-3"
              >
                <div className="w-10 h-10 bg-verde-oscuro text-verde-neon rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Info className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-sm">{notif.titulo}</h4>
                    <span className="text-[10px] font-mono text-gray-400">{notif.fecha}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{notif.mensaje}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FORMULARIO DE REPORTE DE DAÑO */}
      {activeTab === 'report' && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg space-y-6">
          <div className="text-center space-y-1 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-verde-neon text-verde-oscuro rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800">Reportar Pupitre Dañado</h3>
            <p className="text-xs text-gray-500">
              Notifica a los docentes si un pupitre de tu salón requiere mantenimiento o reparación.
            </p>
          </div>

          {showReportSuccess ? (
            <div className="p-6 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-bold text-emerald-900 text-lg">¡Reporte Enviado con Éxito!</h4>
              <p className="text-xs text-emerald-700">
                El docente encargado revisará la novedad del pupitre en el panel administrativo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Código del Pupitre (ej. P-11-1-09) *
                  </label>
                  <input
                    type="text"
                    value={codigoPupitre}
                    onChange={(e) => setCodigoPupitre(e.target.value)}
                    placeholder="Ejemplo: P-11-1-09"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-verde-neon"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Grado / Salón *
                  </label>
                  <select
                    value={reportGrado}
                    onChange={(e) => setReportGrado(e.target.value as GradoColegio)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-verde-neon"
                  >
                    {GRADOS_COLEGIO.map((g) => (
                      <option key={g} value={g}>
                        Grado {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Tipo de Daño o Avería *
                </label>
                <select
                  value={reportTipoDano}
                  onChange={(e) => setReportTipoDano(e.target.value as TipoDano)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-verde-neon"
                >
                  {TIPOS_DANO.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              {reportTipoDano === 'Otro' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-amber-700 mb-1">
                    Especificar Otro Tipo de Daño *
                  </label>
                  <input
                    type="text"
                    value={reportCustomDano}
                    onChange={(e) => setReportCustomDano(e.target.value)}
                    placeholder="Describe el tipo de daño..."
                    className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Descripción o Causa del Daño *
                </label>
                <textarea
                  value={motivoReporte}
                  onChange={(e) => setMotivoReporte(e.target.value)}
                  placeholder="Describe claramente qué le sucedió al pupitre (ej. Pata desprendida, tríplex roto, fórmica rayada...)"
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-verde-neon"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-verde-oscuro text-verde-neon font-bold text-sm rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md border border-verde-neon"
                >
                  <Send className="w-4 h-4" /> ENVIAR REPORTE A DOCENTES
                </button>
              </div>
            </form>
          )}
        </div>
      )}

    </div>
  );
};
