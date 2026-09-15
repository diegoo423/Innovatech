export type UserRole = 'estudiante' | 'docente' | 'administrador';

export const GRADOS_COLEGIO = [
  '6-1', '6-2', '6-3', '6-4',
  '7-1', '7-2', '7-3', '7-4',
  '8-1', '8-2', '8-3', '8-4',
  '9-1', '9-2', '9-3', '9-4',
  '10-1', '10-2', '10-3', '10-4',
  '11-1', '11-2', '11-3', '11-4',
] as const;

export type GradoColegio = typeof GRADOS_COLEGIO[number];

export const TIPOS_DANO = [
  'Superficie dañada',
  'Pata dañada',
  'Estructura dañada',
  'Tornillos o piezas faltantes',
  'Asiento dañado',
  'Respaldo dañado',
  'Otro',
] as const;

export type TipoDano = typeof TIPOS_DANO[number];

export interface User {
  id: string;
  identificacion: string; // Documento (Estudiante) o Cédula (Docente/Admin)
  nombre: string;
  nombreCompleto?: string;
  correo: string;
  password?: string;
  passwordHash?: string;
  rol: UserRole;
  salonId?: string; // e.g. "salon-11-1"
  salonNombre?: string; // e.g. "11-1" o "Salón 11-1"
  grado?: string; // e.g. "11-1"
  fechaRegistro?: string;
  ultimoInicioSesion?: string; // Timestamp ISO del último acceso
  fechaUltimoInicio?: string; // ej. "14/09/2026"
  horaUltimoInicio?: string; // ej. "05:01 PM"
  estado?: 'Activo' | 'Inactivo'; // Estado de la cuenta
  haIniciadoSesion?: boolean; // Indicador de sesión previa
}

export type DamageStatus = 'Dañado' | 'En reparación' | 'Arreglado';

export interface DeskDamage {
  id: string;
  codigoPupitre: string; // e.g. "P-11-1-04"
  salonId: string;
  salonNombre: string; // e.g. "11-1"
  grado?: string; // e.g. "11-1"
  estudianteId?: string;
  estudianteNombre: string; // Nombre del estudiante responsable
  estudianteIdentificacion: string;
  tipoDano?: string; // Superficie dañada, Pata dañada, etc.
  motivo: string; // Causa o descripción detallada del daño
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
  category: 'config' | 'model' | 'controller' | 'view' | 'public' | 'sql' | 'router' | 'docs';
  description: string;
  content: string;
}
