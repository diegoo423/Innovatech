import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { DeskDamage, Classroom, SystemNotification, User } from './types';
import { initialDeskDamages, initialClassrooms, initialNotifications, initialUsers } from './data/initialData';

const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass firebaseConfig.firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test initial connection as required by Firebase skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection: the client appears offline. Operating with local cache.');
      return false;
    }
    // Any other error from test doc is expected if test doc does not exist
    return true;
  }
}

// Seed initial collections into Firestore if empty
export async function seedInitialDataIfEmpty() {
  try {
    const pupitresCol = collection(db, 'pupitres');
    const pupitresSnap = await getDocs(pupitresCol);

    if (pupitresSnap.empty) {
      console.log('Seeding initial desk damages to Firestore...');
      for (const damage of initialDeskDamages) {
        await setDoc(doc(db, 'pupitres', damage.id), damage);
      }
    }

    const salonesCol = collection(db, 'salones');
    const salonesSnap = await getDocs(salonesCol);
    if (salonesSnap.empty) {
      console.log('Seeding initial classrooms to Firestore...');
      for (const classroom of initialClassrooms) {
        await setDoc(doc(db, 'salones', classroom.id), classroom);
      }
    }

    const notifCol = collection(db, 'notificaciones');
    const notifSnap = await getDocs(notifCol);
    if (notifSnap.empty) {
      console.log('Seeding initial notifications to Firestore...');
      for (const notif of initialNotifications) {
        await setDoc(doc(db, 'notificaciones', notif.id), notif);
      }
    }

    const userCol = collection(db, 'usuarios');
    const userSnap = await getDocs(userCol);
    if (userSnap.empty) {
      console.log('Seeding initial users to Firestore...');
      for (const u of initialUsers) {
        await setDoc(doc(db, 'usuarios', u.id), u);
      }
    }
  } catch (err) {
    console.warn('Could not auto-seed Firestore (using local fallback if needed):', err);
  }
}

// Firestore operations for Pupitres
export async function createPupitreDoc(damage: DeskDamage) {
  const path = `pupitres/${damage.id}`;
  try {
    await setDoc(doc(db, 'pupitres', damage.id), damage);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updatePupitreDoc(damage: DeskDamage) {
  const path = `pupitres/${damage.id}`;
  try {
    await updateDoc(doc(db, 'pupitres', damage.id), { ...damage });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deletePupitreDoc(id: string) {
  const path = `pupitres/${id}`;
  try {
    await deleteDoc(doc(db, 'pupitres', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Firestore operations for Salones
export async function createClassroomDoc(classroom: Classroom) {
  const path = `salones/${classroom.id}`;
  try {
    await setDoc(doc(db, 'salones', classroom.id), classroom);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Firestore operations for Notificaciones
export async function createNotificationDoc(notification: SystemNotification) {
  const path = `notificaciones/${notification.id}`;
  try {
    await setDoc(doc(db, 'notificaciones', notification.id), notification);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Firestore operations for Usuarios
export async function createUserDoc(user: User) {
  const path = `usuarios/${user.id}`;
  try {
    // Ensure both nombre and nombreCompleto are set for maximum compatibility
    const dataToSave = {
      ...user,
      nombreCompleto: user.nombreCompleto || user.nombre,
      correo: user.correo || `${user.identificacion}@perezyaldana.edu.co`,
    };
    await setDoc(doc(db, 'usuarios', user.id), dataToSave);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateUserDoc(user: User) {
  const path = `usuarios/${user.id}`;
  try {
    const dataToSave = {
      ...user,
      nombreCompleto: user.nombreCompleto || user.nombre,
      correo: user.correo || `${user.identificacion}@perezyaldana.edu.co`,
      estado: user.estado || 'Activo',
    };
    await setDoc(doc(db, 'usuarios', user.id), dataToSave, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
