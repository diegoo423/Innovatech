import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc,
  getDocFromServer,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where
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
  const uid = user.uid || user.id;
  const path = `usuarios/${uid}`;
  try {
    const dataToSave: Record<string, any> = {
      id: uid,
      uid: uid,
      identificacion: user.identificacion || '',
      nombre: user.nombre || user.nombreCompleto || '',
      nombreCompleto: user.nombreCompleto || user.nombre || '',
      correo: (user.correo || '').trim().toLowerCase(),
      tipoUsuario: user.tipoUsuario || user.rol || 'estudiante',
      rol: user.rol || user.tipoUsuario || 'estudiante',
      fechaRegistro: user.fechaRegistro || new Date().toISOString().split('T')[0],
      ultimoInicioSesion: user.ultimoInicioSesion || null,
      fechaUltimoInicio: user.fechaUltimoInicio || null,
      horaUltimoInicio: user.horaUltimoInicio || null,
      estado: user.estado || 'Activo',
      haIniciadoSesion: Boolean(user.haIniciadoSesion),
    };

    if (user.password) {
      dataToSave.password = user.password;
    }
    if (user.grado) {
      dataToSave.grado = user.grado;
    }
    if (user.salonId) {
      dataToSave.salonId = user.salonId;
    }
    if (user.salonNombre) {
      dataToSave.salonNombre = user.salonNombre;
    }

    await setDoc(doc(db, 'usuarios', uid), dataToSave, { merge: true });
    return dataToSave as unknown as User;
  } catch (error) {
    console.error('Error creating user in Firestore:', error);
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateUserDoc(user: User) {
  const uid = user.uid || user.id;
  const path = `usuarios/${uid}`;
  try {
    const dataToSave: Record<string, any> = {
      id: uid,
      uid: uid,
      nombre: user.nombre || user.nombreCompleto || '',
      nombreCompleto: user.nombreCompleto || user.nombre || '',
      correo: (user.correo || '').trim().toLowerCase(),
      tipoUsuario: user.tipoUsuario || user.rol || 'estudiante',
      rol: user.rol || user.tipoUsuario || 'estudiante',
      estado: user.estado || 'Activo',
      haIniciadoSesion: Boolean(user.haIniciadoSesion),
    };

    if (user.identificacion) {
      dataToSave.identificacion = user.identificacion;
    }
    if (user.ultimoInicioSesion !== undefined) {
      dataToSave.ultimoInicioSesion = user.ultimoInicioSesion;
    }
    if (user.fechaUltimoInicio !== undefined) {
      dataToSave.fechaUltimoInicio = user.fechaUltimoInicio;
    }
    if (user.horaUltimoInicio !== undefined) {
      dataToSave.horaUltimoInicio = user.horaUltimoInicio;
    }
    if (user.password) {
      dataToSave.password = user.password;
    }
    if (user.grado) {
      dataToSave.grado = user.grado;
    }

    await setDoc(doc(db, 'usuarios', uid), dataToSave, { merge: true });
  } catch (error) {
    console.error('Error updating user in Firestore:', error);
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// Fetch all users directly from Cloud Firestore
export async function getAllUsersFromFirestore(): Promise<User[]> {
  try {
    const snap = await getDocs(collection(db, 'usuarios'));
    const results: User[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      results.push({
        id: docSnap.id,
        uid: data.uid || docSnap.id,
        identificacion: data.identificacion || '',
        nombre: data.nombre || data.nombreCompleto || 'Usuario',
        nombreCompleto: data.nombreCompleto || data.nombre || 'Usuario',
        correo: data.correo || '',
        rol: data.rol || data.tipoUsuario || 'estudiante',
        tipoUsuario: data.tipoUsuario || data.rol || 'estudiante',
        fechaRegistro: data.fechaRegistro || '',
        ultimoInicioSesion: data.ultimoInicioSesion || undefined,
        fechaUltimoInicio: data.fechaUltimoInicio || undefined,
        horaUltimoInicio: data.horaUltimoInicio || undefined,
        estado: (data.estado as 'Activo' | 'Inactivo') || 'Activo',
        haIniciadoSesion: Boolean(data.haIniciadoSesion || data.ultimoInicioSesion),
        password: data.password,
        grado: data.grado,
        salonId: data.salonId,
        salonNombre: data.salonNombre,
      });
    });
    return results;
  } catch (error) {
    console.error('Error in getAllUsersFromFirestore:', error);
    return [];
  }
}

// Centralized registration in Firebase Authentication + Cloud Firestore
export async function registerNewUser(userParam: User): Promise<User> {
  const email = (userParam.correo || '').trim().toLowerCase();
  const password = userParam.password || '';

  if (!email || !password) {
    throw new Error('El correo electrónico y la contraseña son requeridos.');
  }

  // 1. Create account strictly in Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // 2. Persist profile document in Cloud Firestore under 'usuarios' collection
  const userRecord: User = {
    ...userParam,
    id: uid,
    uid: uid,
    correo: email,
    tipoUsuario: userParam.rol,
    rol: userParam.rol,
    nombre: userParam.nombre.trim(),
    nombreCompleto: (userParam.nombreCompleto || userParam.nombre).trim(),
    fechaRegistro: userParam.fechaRegistro || new Date().toISOString().split('T')[0],
    estado: 'Activo',
    haIniciadoSesion: false,
  };

  // Remove plaintext password before storing in Firestore
  delete userRecord.password;

  await createUserDoc(userRecord);
  return userRecord;
}

// Centralized login strictly using Firebase Authentication signInWithEmailAndPassword
export async function loginUser(
  emailInput: string,
  passwordInput: string
): Promise<User> {
  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanPassword = passwordInput.trim();

  if (!cleanEmail || !cleanPassword) {
    throw new Error('Por favor ingresa tu correo electrónico y contraseña.');
  }

  // 1. Authenticate strictly against Firebase Authentication
  const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
  const fbUser = userCredential.user;
  const uid = fbUser.uid;

  // 2. Retrieve user profile from Cloud Firestore
  let userProfile: User | null = null;
  try {
    const userDocRef = doc(db, 'usuarios', uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      userProfile = { ...(userDocSnap.data() as User), id: uid, uid };
    }
  } catch (err) {
    console.warn('Notice loading user by UID from Firestore:', err);
  }

  // Fallback: match by email in Firestore if the document was previously created with another ID
  if (!userProfile) {
    try {
      const q = query(collection(db, 'usuarios'), where('correo', '==', cleanEmail));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        const d = qSnap.docs[0];
        userProfile = { ...(d.data() as User), id: d.id, uid };
      }
    } catch (err) {
      console.warn('Notice loading user by email query from Firestore:', err);
    }
  }

  // If no document exists yet, bootstrap profile from Firebase Auth data
  if (!userProfile) {
    userProfile = {
      id: uid,
      uid: uid,
      identificacion: '',
      nombre: fbUser.displayName || cleanEmail.split('@')[0],
      nombreCompleto: fbUser.displayName || cleanEmail.split('@')[0],
      correo: cleanEmail,
      rol: 'estudiante',
      tipoUsuario: 'estudiante',
      fechaRegistro: new Date().toISOString().split('T')[0],
      estado: 'Activo',
      haIniciadoSesion: true,
    };
  }

  if (userProfile.estado === 'Inactivo') {
    await signOut(auth);
    throw new Error('Esta cuenta de usuario ha sido desactivada por la institución.');
  }

  // 3. Register the session in Cloud Firestore so it updates the registered users table
  const now = new Date();
  const fechaHoy = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const horaHoy = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const updatedUser: User = {
    ...userProfile,
    ultimoInicioSesion: now.toISOString(),
    fechaUltimoInicio: fechaHoy,
    horaUltimoInicio: horaHoy,
    haIniciadoSesion: true,
  };

  try {
    await updateUserDoc(updatedUser);
  } catch (e) {
    console.warn('Notice updating login timestamp in Firestore:', e);
  }

  return updatedUser;
}

export async function firebaseLogout() {
  try {
    await signOut(auth);
  } catch {
    // ignore
  }
}
