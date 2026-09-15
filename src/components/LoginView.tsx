import React, { useState } from 'react';
import { User, UserRole, GRADOS_COLEGIO, GradoColegio } from '../types';
import { loginUser, registerNewUser, getAllUsersFromFirestore } from '../firebase';
import { 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  IdCard, 
  Sparkles,
  School,
  ArrowRight,
  UserPlus,
  Mail,
  User as UserIcon,
  BookOpen
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onRegisterUser: (newUser: User) => Promise<boolean | void>;
  users: User[];
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onRegisterUser, users }) => {
  // Mode: 'login' | 'register'
  const [viewMode, setViewMode] = useState<'login' | 'register'>('login');

  // Login Form State
  const [loginDoc, setLoginDoc] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Register Form State
  const [regNombre, setRegNombre] = useState('');
  const [regDocumento, setRegDocumento] = useState('');
  const [regCorreo, setRegCorreo] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRol, setRegRol] = useState<UserRole>('estudiante');
  const [regGrado, setRegGrado] = useState<GradoColegio>('11-1');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Accordion for Demo logins
  const [showDemoAcc, setShowDemoAcc] = useState(false);

  // Handle Login Submit via Firebase Auth & Cloud Firestore
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const docTrimmed = loginDoc.trim();
    const passTrimmed = loginPassword.trim();

    if (!docTrimmed || !passTrimmed) {
      setLoginError('Por favor ingresa tu número de documento o correo y contraseña.');
      return;
    }

    setIsLoggingIn(true);

    try {
      const authenticatedUser = await loginUser(docTrimmed, passTrimmed, users);
      setIsLoggingIn(false);
      onLoginSuccess(authenticatedUser);
    } catch (err: any) {
      console.warn('Login error:', err);
      setIsLoggingIn(false);
      setLoginError(err?.message || 'Usuario o contraseña incorrectos.');
    }
  };

  // Handle Register Submit via Firebase Auth & Cloud Firestore
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    // Validations:
    // 1. Mandatory fields
    if (!regNombre.trim()) {
      setRegisterError('El nombre completo es obligatorio.');
      return;
    }

    if (!regDocumento.trim()) {
      setRegisterError('El número de documento de identidad es obligatorio.');
      return;
    }

    if (!/^[0-9]+$/.test(regDocumento.trim())) {
      setRegisterError('El número de documento debe contener solo dígitos.');
      return;
    }

    if (regDocumento.trim().length < 5) {
      setRegisterError('El documento debe tener al menos 5 dígitos.');
      return;
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regCorreo.trim() || !emailRegex.test(regCorreo.trim())) {
      setRegisterError('Por favor ingresa un correo electrónico válido (ej. usuario@perezyaldana.edu.co).');
      return;
    }

    // 3. Password length
    if (regPassword.trim().length < 6) {
      setRegisterError('La contraseña debe tener una longitud mínima segura de 6 caracteres.');
      return;
    }

    // 4. Passwords match
    if (regPassword !== regConfirmPassword) {
      setRegisterError('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    setIsRegistering(true);

    try {
      // Check real-time cloud Firestore to prevent cross-device conflicts
      const cloudUsers = await getAllUsersFromFirestore();
      const currentList = cloudUsers.length > 0 ? cloudUsers : users;

      const docExists = currentList.some((u) => u.identificacion?.trim() === regDocumento.trim());
      if (docExists) {
        setRegisterError('El documento de identidad ya se encuentra registrado en el sistema.');
        setIsRegistering(false);
        return;
      }

      const emailExists = currentList.some(
        (u) => u.correo && u.correo.trim().toLowerCase() === regCorreo.trim().toLowerCase()
      );
      if (emailExists) {
        setRegisterError('El correo electrónico ya se encuentra registrado en el sistema.');
        setIsRegistering(false);
        return;
      }

      const tempId = `usr-${Date.now()}`;
      const newUser: User = {
        id: tempId,
        uid: tempId,
        identificacion: regDocumento.trim(),
        nombre: regNombre.trim(),
        nombreCompleto: regNombre.trim(),
        correo: regCorreo.trim().toLowerCase(),
        password: regPassword.trim(),
        rol: regRol,
        tipoUsuario: regRol,
        grado: regRol === 'estudiante' ? regGrado : undefined,
        salonId: regRol === 'estudiante' ? `salon-${regGrado.toLowerCase()}` : undefined,
        salonNombre: regRol === 'estudiante' ? regGrado : undefined,
        fechaRegistro: new Date().toISOString().split('T')[0],
        estado: 'Activo',
        haIniciadoSesion: false,
      };

      const savedUser = await registerNewUser(newUser);
      await onRegisterUser(savedUser);

      setRegisterSuccess('¡Usuario registrado exitosamente en Firebase Cloud Firestore! Ahora puedes iniciar sesión.');
      setIsRegistering(false);

      // Pre-fill login with new identifier and switch to login tab after brief pause
      setLoginDoc(savedUser.correo || savedUser.identificacion);
      setLoginPassword(regPassword);
      setTimeout(() => {
        setViewMode('login');
      }, 1500);
    } catch (err: any) {
      console.error('Error during registration:', err);
      setRegisterError(err?.message || 'Ocurrió un error al registrar el usuario en Firebase.');
      setIsRegistering(false);
    }
  };

  // Helper to fill demo account
  const fillDemoAccount = (role: 'estudiante' | 'docente' | 'administrador') => {
    setViewMode('login');
    if (role === 'estudiante') {
      setLoginDoc('1001234567');
      setLoginPassword('estudiante123');
    } else if (role === 'docente') {
      setLoginDoc('52123456');
      setLoginPassword('docente123');
    } else {
      setLoginDoc('10101010');
      setLoginPassword('admin123');
    }
    setLoginError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-x-hidden">
      
      {/* Lateral Izquierdo Blanco (Side Panel Left) */}
      <div className="hidden lg:flex flex-1 bg-slate-50 items-center justify-center p-8 border-r border-slate-200">
        <div className="max-w-sm text-center space-y-4">
          <div className="w-20 h-20 bg-verde-oscuro text-verde-neon rounded-2xl flex items-center justify-center mx-auto shadow-xl border-2 border-verde-neon">
            <School className="w-10 h-10" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-800 text-xl tracking-tight">I.E. TÉCNICA PÉREZ Y ALDANA</h2>
            <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider mt-1">Purificación, Tolima</p>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Plataforma institucional para el registro, control y seguimiento técnico de pupitres y mobiliario escolar.
            </p>
          </div>
          
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left space-y-2 text-xs">
            <div className="font-bold text-slate-800 flex items-center gap-1.5 text-verde-oscuro">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Funcionalidades Integradas:</span>
            </div>
            <ul className="text-slate-600 space-y-1 pl-5 list-disc text-[11px]">
              <li>Autenticación por Documento y Contraseña</li>
              <li>Registro de Estudiantes (Grados 6-1 a 11-4)</li>
              <li>Perfiles de Docentes y Administración</li>
              <li>Base de datos en la nube con Firebase Firestore</li>
            </ul>
          </div>

          <div className="pt-2">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-mono text-xs font-semibold rounded-full">
              Sistema Innovatech 2026 - Grado 11
            </span>
          </div>
        </div>
      </div>

      {/* Panel Central Verde Oscuro (Center Interactive Card) */}
      <div className="w-full lg:w-[540px] xl:w-[580px] bg-verde-oscuro text-white min-h-screen flex flex-col justify-center px-6 py-8 md:px-10 shadow-2xl relative z-10 border-x-0 lg:border-x-2 border-verde-neon/40">
        
        {/* Institutional Header & Logo */}
        <div className="text-center mb-6">
          <div className="w-18 h-18 bg-verde-neon text-verde-oscuro rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_25px_rgba(57,255,20,0.5)] border-4 border-white/20">
            <GraduationCap className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-black tracking-wider text-verde-neon font-sans">
            INNOVATECH
          </h1>
          <p className="text-xs font-semibold text-white/90 mt-1 uppercase tracking-wider">
            I.E. Técnica Pérez y Aldana • Purificación, Tolima
          </p>
          <p className="text-xs text-gray-300 mt-0.5 font-mono">
            Control de Pupitres y Mobiliario Escolar
          </p>
        </div>

        {/* View Mode Switcher Tabs: Iniciar Sesión / Registrarse */}
        <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setViewMode('login');
              setLoginError('');
              setRegisterError('');
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              viewMode === 'login'
                ? 'bg-verde-neon text-verde-oscuro shadow-lg shadow-verde-neon/20 font-black'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Iniciar Sesión</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setViewMode('register');
              setLoginError('');
              setRegisterError('');
              setRegisterSuccess('');
            }}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              viewMode === 'register'
                ? 'bg-verde-neon text-verde-oscuro shadow-lg shadow-verde-neon/20 font-black'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Crear Cuenta / Registrarse</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: INICIAR SESIÓN                                   */}
        {/* ======================================================== */}
        {viewMode === 'login' && (
          <div className="space-y-4">
            
            {/* Error Message Alert */}
            {loginError && (
              <div className="p-3 bg-red-500/20 border-2 border-red-500/80 rounded-xl text-red-200 text-xs flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Success notice if coming from registration */}
            {registerSuccess && (
              <div className="p-3 bg-emerald-500/20 border-2 border-verde-neon rounded-xl text-emerald-200 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-verde-neon shrink-0" />
                <span>{registerSuccess}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Document / User Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-200 mb-1.5 flex items-center gap-1.5">
                  <IdCard className="w-4 h-4 text-verde-neon" />
                  <span>Número de Documento o Usuario</span>
                </label>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <IdCard className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={loginDoc}
                    onChange={(e) => {
                      setLoginDoc(e.target.value);
                      setLoginError('');
                    }}
                    placeholder="Ej: 1001234567 o correo@colegio.edu.co"
                    className="w-full pl-11 pr-4 py-3 bg-black/40 text-white rounded-xl text-sm border-2 border-white/20 focus:border-verde-neon outline-none transition-all placeholder:text-gray-500 font-mono"
                    required
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Ingresa tu documento de identidad (TI/CC) o correo registrado.
                </p>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-200 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-verde-neon" /> Contraseña
                  </span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginError('');
                    }}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 bg-black/40 text-white rounded-xl text-sm border-2 border-white/20 focus:border-verde-neon outline-none transition-all placeholder:text-gray-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-verde-neon transition-colors"
                    title={showLoginPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Toggle Password visibility */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none text-gray-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={showLoginPassword}
                    onChange={(e) => setShowLoginPassword(e.target.checked)}
                    className="w-4 h-4 rounded bg-black/50 border-white/30 text-verde-neon focus:ring-verde-neon focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Mostrar Contraseña</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setViewMode('register');
                    setLoginError('');
                  }}
                  className="text-verde-neon hover:underline font-semibold text-xs"
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm tracking-wider uppercase transition-all duration-300 bg-verde-neon text-verde-oscuro hover:bg-white flex items-center justify-center gap-2 mt-4 shadow-lg shadow-verde-neon/20 cursor-pointer"
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-verde-oscuro border-t-transparent rounded-full animate-spin" />
                    Validando credenciales...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    INICIAR SESIÓN <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </button>
            </form>

            {/* Quick Link to Register */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-300">
                ¿Eres un estudiante nuevo o docente?{' '}
                <button
                  type="button"
                  onClick={() => setViewMode('register')}
                  className="text-verde-neon font-bold hover:underline"
                >
                  Crear una nueva cuenta aquí
                </button>
              </p>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: REGISTRO DE USUARIOS (CREAR CUENTA)               */}
        {/* ======================================================== */}
        {viewMode === 'register' && (
          <div className="space-y-4">
            
            {/* Error Message Alert */}
            {registerError && (
              <div className="p-3 bg-red-500/20 border-2 border-red-500/80 rounded-xl text-red-200 text-xs flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{registerError}</span>
              </div>
            )}

            {/* Success Message Alert */}
            {registerSuccess && (
              <div className="p-3 bg-emerald-500/20 border-2 border-verde-neon rounded-xl text-emerald-200 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-verde-neon shrink-0" />
                <span>{registerSuccess}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              
              {/* Nombre Completo */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-gray-200 mb-1 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-verde-neon" />
                  <span>Nombre Completo *</span>
                </label>
                <input
                  type="text"
                  value={regNombre}
                  onChange={(e) => setRegNombre(e.target.value)}
                  placeholder="Ej: Daniel Santiago Ortiz"
                  className="w-full px-3.5 py-2.5 bg-black/40 text-white rounded-xl text-xs border border-white/20 focus:border-verde-neon outline-none"
                  required
                />
              </div>

              {/* Documento y Correo en 2 Columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Documento */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-200 mb-1 flex items-center gap-1.5">
                    <IdCard className="w-3.5 h-3.5 text-verde-neon" />
                    <span>N° Documento (TI/CC) *</span>
                  </label>
                  <input
                    type="text"
                    value={regDocumento}
                    onChange={(e) => setRegDocumento(e.target.value)}
                    placeholder="Ej: 1005123456"
                    className="w-full px-3.5 py-2.5 bg-black/40 text-white rounded-xl text-xs font-mono border border-white/20 focus:border-verde-neon outline-none"
                    required
                  />
                </div>

                {/* Correo Electrónico */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-200 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-verde-neon" />
                    <span>Correo Electrónico *</span>
                  </label>
                  <input
                    type="email"
                    value={regCorreo}
                    onChange={(e) => setRegCorreo(e.target.value)}
                    placeholder="estudiante@perezyaldana.edu.co"
                    className="w-full px-3.5 py-2.5 bg-black/40 text-white rounded-xl text-xs border border-white/20 focus:border-verde-neon outline-none"
                    required
                  />
                </div>
              </div>

              {/* Rol / Tipo de Usuario y Grado (si es estudiante) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Tipo de Usuario */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-200 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-verde-neon" />
                    <span>Tipo de Usuario (Rol) *</span>
                  </label>
                  <select
                    value={regRol}
                    onChange={(e) => setRegRol(e.target.value as UserRole)}
                    className="w-full px-3.5 py-2.5 bg-black/40 text-white rounded-xl text-xs border border-white/20 focus:border-verde-neon outline-none"
                  >
                    <option value="estudiante" className="bg-verde-oscuro text-white">Estudiante</option>
                    <option value="docente" className="bg-verde-oscuro text-white">Docente</option>
                    <option value="administrador" className="bg-verde-oscuro text-white">Administrador</option>
                  </select>
                </div>

                {/* Grado Dropdown (EXACTOS 24 GRADOS SOLICITADOS) */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-200 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-verde-neon" />
                    <span>Grado / Salón {regRol === 'estudiante' ? '*' : '(Opcional)'}</span>
                  </label>
                  <select
                    value={regGrado}
                    onChange={(e) => setRegGrado(e.target.value as GradoColegio)}
                    disabled={regRol !== 'estudiante'}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none font-bold ${
                      regRol === 'estudiante'
                        ? 'bg-black/40 text-verde-neon border-verde-neon/50 focus:border-verde-neon'
                        : 'bg-black/20 text-gray-500 border-white/10 cursor-not-allowed'
                    }`}
                  >
                    {GRADOS_COLEGIO.map((grado) => (
                      <option key={grado} value={grado} className="bg-verde-oscuro text-white">
                        Grado {grado}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contraseña y Confirmar Contraseña */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Contraseña */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-200 mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-verde-neon" />
                    <span>Contraseña (mín 6) *</span>
                  </label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-3.5 py-2.5 bg-black/40 text-white rounded-xl text-xs border border-white/20 focus:border-verde-neon outline-none"
                    required
                  />
                </div>

                {/* Confirmar Contraseña */}
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-200 mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-verde-neon" />
                    <span>Confirmar Contraseña *</span>
                  </label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Repite la contraseña"
                    className="w-full px-3.5 py-2.5 bg-black/40 text-white rounded-xl text-xs border border-white/20 focus:border-verde-neon outline-none"
                    required
                  />
                </div>
              </div>

              {/* Toggle Password */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center space-x-2 cursor-pointer select-none text-gray-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={showRegPassword}
                    onChange={(e) => setShowRegPassword(e.target.checked)}
                    className="w-4 h-4 rounded bg-black/50 border-white/30 text-verde-neon focus:ring-verde-neon focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Mostrar Contraseñas</span>
                </label>
              </div>

              {/* Submit Register Button */}
              <button
                type="submit"
                disabled={isRegistering}
                className="w-full py-3 px-6 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all duration-300 bg-verde-neon text-verde-oscuro hover:bg-white flex items-center justify-center gap-2 mt-3 shadow-lg cursor-pointer"
              >
                {isRegistering ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-verde-oscuro border-t-transparent rounded-full animate-spin" />
                    Registrando en base de datos...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> CREAR CUENTA EN EL SISTEMA
                  </span>
                )}
              </button>

              {/* Already have account */}
              <div className="text-center pt-2">
                <p className="text-xs text-gray-300">
                  ¿Ya tienes una cuenta registrada?{' '}
                  <button
                    type="button"
                    onClick={() => setViewMode('login')}
                    className="text-verde-neon font-bold hover:underline"
                  >
                    Iniciar Sesión aquí
                  </button>
                </p>
              </div>

            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* DEMO / EVALUATION SHORTCUT ACCORDION                     */}
        {/* ======================================================== */}
        <div className="mt-6 pt-4 border-t border-white/10 bg-black/30 p-3.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setShowDemoAcc(!showDemoAcc)}
            className="w-full flex items-center justify-between text-verde-neon font-bold text-xs uppercase tracking-wider"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Cuentas Demo de Prueba (Grado 11)</span>
            </span>
            <span className="text-[10px] bg-verde-neon/20 px-2 py-0.5 rounded text-verde-neon font-mono">
              {showDemoAcc ? 'Ocultar' : 'Ver Cuentas'}
            </span>
          </button>

          {showDemoAcc && (
            <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => fillDemoAccount('estudiante')}
                className="px-2 py-2 bg-sky-950/80 hover:bg-sky-800 text-sky-200 rounded-lg text-[10px] font-medium border border-sky-500/30 transition-all text-center"
              >
                <div className="font-bold text-xs">Estudiante</div>
                <div className="text-[9px] text-gray-300">1001234567</div>
                <div className="text-[8px] text-sky-400">Grado 11-1</div>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('docente')}
                className="px-2 py-2 bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 rounded-lg text-[10px] font-medium border border-emerald-500/30 transition-all text-center"
              >
                <div className="font-bold text-xs">Docente</div>
                <div className="text-[9px] text-gray-300">52123456</div>
                <div className="text-[8px] text-emerald-400">Prof. Mendoza</div>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('administrador')}
                className="px-2 py-2 bg-purple-950/80 hover:bg-purple-800 text-purple-200 rounded-lg text-[10px] font-medium border border-purple-500/30 transition-all text-center"
              >
                <div className="font-bold text-xs">Admin</div>
                <div className="text-[9px] text-gray-300">10101010</div>
                <div className="text-[8px] text-purple-400">Dra. Elena</div>
              </button>
            </div>
          )}
        </div>

        {/* Footer info for grade 11 project */}
        <div className="mt-4 text-center text-[11px] text-gray-400 font-mono">
          <p>I.E.T. Pérez y Aldana • Purificación, Tolima</p>
          <p className="text-gray-500 mt-0.5">Tecnología Web con Firebase Cloud Firestore</p>
        </div>

      </div>

      {/* Lateral Derecho Blanco (Side Panel Right) */}
      <div className="hidden lg:flex flex-1 bg-slate-50 items-center justify-center p-8 border-l border-slate-200">
        <div className="max-w-sm text-center space-y-4">
          <div className="w-16 h-16 bg-azul-oscuro text-verde-neon rounded-2xl flex items-center justify-center mx-auto shadow-lg border-2 border-verde-neon/50">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Control de Roles y Permisos</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Seguridad para garantizar que cada miembro de la comunidad educativa tenga acceso a las opciones correspondientes.
            </p>
          </div>

          <div className="space-y-2 text-left text-xs">
            <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-xs">
              <span className="font-bold text-slate-800 block text-xs">👨‍🎓 Rol Estudiante</span>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Consulta los pupitres de su grado asignado, revisa su historial personal y envía reportes de novedades.
              </p>
            </div>

            <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-xs">
              <span className="font-bold text-slate-800 block text-xs">👨‍🏫 Rol Docente / Administrador</span>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Registra pupitres dañados, actualiza el estado técnico, ajusta costos de reparación y genera estadísticas.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
