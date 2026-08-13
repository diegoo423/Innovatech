export type UserRole = 'estudiante' | 'docente' | 'administrador';

export interface User {
  id: string;
  identificacion: string; // Documento (Estudiante) o Cédula (Docente/Admin)
  nombre: string;
  correo?: string;
  salonId?: string; // e.g. "salon-11a"
  salonNombre?: string; // e.g. "11-A"
  rol: UserRole;
  passwordHash?: string;
  fechaRegistro?: string;
}

export type DamageStatus = 'Dañado' | 'En reparación' | 'Arreglado';

export interface DeskDamage {
  id: string;
  codigoPupitre: string; // e.g. "P-11A-04"
  salonId: string;
  salonNombre: string; // e.g. "11-A"
  estudianteId?: string;
  estudianteNombre: string; // Nombre del estudiante responsable
  estudianteIdentificacion: string;
  motivo: string; // Causa o descripción del daño
  valorReparacion: number; // Costo en COP ($)
  estado: DamageStatus;
  fechaRegistro: string;
  fechaUltimaModificacion?: string;
  observacionesAdicionales?: string;
}

export interface Classroom {
  id: string;
  nombre: string; // e.g. "11-A"
  ubicacion: string; // e.g. "Piso 2 - Bloque B"
  capacidad: number;
  totalPupitres: number;
}

export interface SystemNotification {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  tipo: 'info' | 'warning' | 'success';
  destinatarioRol?: UserRole | 'todos';
  salonId?: string;
  leido?: boolean;
}

export interface PHPFileCode {
  filename: string;
  path: string;
  category: 'config' | 'model' | 'controller' | 'view' | 'public' | 'sql' | 'router';
  description: string;
  content: string;
}
