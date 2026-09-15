import React, { useState } from 'react';
import { phpMvcSourceCode } from '../data/initialData';
import { PHPFileCode } from '../types';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  FolderTree, 
  Database, 
  ShieldCheck, 
  Cpu, 
  BookOpen, 
  Terminal, 
  FileCode,
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';

export const PhpMvcExporter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PHPFileCode>(phpMvcSourceCode[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (file: PHPFileCode) => {
    const element = document.createElement('a');
    const blob = new Blob([file.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(blob);
    element.download = file.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadAll = () => {
    // Downloads schema.sql and index.php as key starter files
    phpMvcSourceCode.forEach((file) => {
      handleDownloadFile(file);
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info Banner for 11th Grade Project */}
      <div className="bg-verde-oscuro text-white p-6 md:p-8 rounded-3xl border-2 border-verde-neon/40 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-verde-neon/20 border border-verde-neon text-verde-neon rounded-full text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" /> Arquitectura MVC & Código Listo para XAMPP
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Código Fuente PHP, MySQL & Estructura MVC
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              Este proyecto está organizado bajo el estándar industrial <strong className="text-verde-neon">Modelo-Vista-Controlador (MVC)</strong>. Puedes inspeccionar, copiar y descargar directamente los archivos para abrirlos en <strong>Visual Studio Code</strong> y ejecutarlos localmente con <strong>XAMPP (Apache + MySQL)</strong>.
            </p>
          </div>

          <button
            onClick={handleDownloadAll}
            className="px-5 py-3 bg-verde-neon text-verde-oscuro font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all hover:bg-white hover:text-black shadow-lg shrink-0 border-2 border-verde-neon"
          >
            <Download className="w-4 h-4 stroke-[3]" />
            <span>DESCARGAR ARCHIVOS PHP / SQL</span>
          </button>
        </div>
      </div>

      {/* 3 Pillars of MVC Explanation Cards for Grade 11 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* Model */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="w-9 h-9 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">1. MODELO (Model)</h4>
          <p className="text-gray-600 leading-relaxed">
            Representa la base de datos MySQL (<code className="font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">UsuarioModel.php</code>, <code className="font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">PupitreModel.php</code>). Ejecuta las consultas SQL PDO y aplica la encriptación con <code className="font-mono font-bold">password_hash()</code>.
          </p>
        </div>

        {/* View */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="w-9 h-9 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">2. VISTA (View)</h4>
          <p className="text-gray-600 leading-relaxed">
            Interfaz gráfica para el usuario (<code className="font-mono text-blue-700 bg-blue-50 px-1 py-0.5 rounded">login.php</code>, <code className="font-mono text-blue-700 bg-blue-50 px-1 py-0.5 rounded">dashboard.php</code>). Muestra los paneles con estilos CSS verde oscuro/neón y validación en tiempo real.
          </p>
        </div>

        {/* Controller */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="w-9 h-9 bg-purple-100 text-purple-800 rounded-xl flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">3. CONTROLADOR (Controller)</h4>
          <p className="text-gray-600 leading-relaxed">
            Lógica del negocio (<code className="font-mono text-purple-700 bg-purple-50 px-1 py-0.5 rounded">AuthController.php</code>). Recibe las peticiones del formulario, valida la clave con <code className="font-mono font-bold">password_verify()</code> y administra las sesiones de usuario.
          </p>
        </div>

      </div>

      {/* Code Inspector & File Tree Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Column: File Tree Selector */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-3 lg:col-span-1">
          <div className="pb-3 border-b border-gray-200 flex items-center justify-between">
            <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 uppercase tracking-wider">
              <FolderTree className="w-4 h-4 text-verde-oscuro" /> Estructura innovatech/
            </h4>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-gray-600 font-mono">XAMPP htdocs</span>
          </div>

          <div className="space-y-1 text-xs">
            {phpMvcSourceCode.map((file) => (
              <button
                key={file.filename}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-mono transition-all flex items-center justify-between ${
                  selectedFile.filename === file.filename
                    ? 'bg-verde-oscuro text-verde-neon font-bold shadow-md border border-verde-neon/30'
                    : 'text-gray-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-2 truncate pr-2">
                  {file.category === 'docs' ? (
                    <BookOpen className="w-4 h-4 shrink-0 text-amber-500" />
                  ) : (
                    <FileCode className="w-4 h-4 shrink-0 text-emerald-600" />
                  )}
                  <span className="truncate">{file.filename}</span>
                </div>
                <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-sans ${
                  file.category === 'docs' ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-black/10'
                }`}>
                  {file.category}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-200 text-[11px] text-gray-500 space-y-1">
            <p className="font-bold text-slate-800">Copia local en XAMPP:</p>
            <code className="text-[10px] font-mono bg-slate-100 p-1 rounded block text-emerald-800">
              C:/xampp/htdocs/innovatech/
            </code>
          </div>
        </div>

        {/* Right Column: Code Viewer & Actions */}
        <div className="bg-slate-900 rounded-2xl border-2 border-slate-800 shadow-2xl overflow-hidden lg:col-span-3 text-white">
          
          {/* File Title Bar */}
          <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-bold text-verde-neon ml-2">
                {selectedFile.path}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-verde-neon text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border border-slate-700"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
              </button>

              <button
                onClick={() => handleDownloadFile(selectedFile)}
                className="px-3 py-1.5 bg-verde-neon text-verde-oscuro text-xs font-bold rounded-lg transition-all hover:bg-white flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Descargar {selectedFile.filename}</span>
              </button>
            </div>
          </div>

          {/* Description banner */}
          <div className="bg-slate-800/60 px-5 py-2.5 text-xs text-gray-300 border-b border-slate-800 font-sans">
            <strong className="text-white">Propósito:</strong> {selectedFile.description}
          </div>

          {/* Code Body */}
          <div className="p-5 overflow-x-auto max-h-[500px] overflow-y-auto font-mono text-xs text-emerald-300 leading-relaxed bg-slate-900">
            <pre><code>{selectedFile.content}</code></pre>
          </div>

        </div>

      </div>

      {/* Presentation Guide Card for 11th Grade Defense */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
          <BookOpen className="w-5 h-5 text-verde-oscuro" />
          <h3 className="font-extrabold text-slate-800 text-base">
            Guía de Exposición para Presentación de Grado 11
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 leading-relaxed">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm text-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> ¿Cómo explicar la seguridad de claves?
            </h4>
            <p>
              En lugar de guardar contraseñas en texto plano en MySQL, se usa la función nativa de PHP <code className="font-mono font-bold text-slate-900">password_hash($pass, PASSWORD_BCRYPT)</code>. Durante el login, <code className="font-mono font-bold text-slate-900">password_verify($pass, $hash)</code> compara la clave ingresada contra el hash seguro sin desencriptarlo.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm text-emerald-800 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> ¿Cómo ejecutar el proyecto en XAMPP?
            </h4>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Inicia los servicios <strong>Apache</strong> y <strong>MySQL</strong> en XAMPP Control Panel.</li>
              <li>Abre <strong>http://localhost/phpmyadmin/</strong> e importa el archivo <code className="font-mono font-bold">schema.sql</code>.</li>
              <li>Guarda la carpeta del proyecto en <code className="font-mono font-bold">C:/xampp/htdocs/innovatech/</code>.</li>
              <li>Abre en tu navegador: <code className="font-mono font-bold text-emerald-700">http://localhost/innovatech/index.php</code>.</li>
            </ol>
          </div>
        </div>
      </div>

    </div>
  );
};
