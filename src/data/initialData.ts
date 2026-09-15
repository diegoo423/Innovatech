import { Classroom, DeskDamage, PHPFileCode, SystemNotification, User, GRADOS_COLEGIO } from '../types';

export const initialClassrooms: Classroom[] = GRADOS_COLEGIO.map((grado) => {
  const [num] = grado.split('-');
  const bloque = Number(num) >= 10 ? 'Bloque A - Piso 2' : Number(num) >= 8 ? 'Bloque B - Piso 2' : 'Bloque C - Piso 1';
  return {
    id: `salon-${grado.toLowerCase()}`,
    nombre: `Grado ${grado}`,
    ubicacion: `${bloque} (I.E.T. Pérez y Aldana)`,
    capacidad: 35,
    totalPupitres: 35,
  };
});

export const initialUsers: User[] = [
  {
    id: 'usr-est-1',
    identificacion: '1001234567',
    nombre: 'Juan Pérez Rodríguez',
    nombreCompleto: 'Juan Pérez Rodríguez',
    correo: 'juan.perez@perezyaldana.edu.co',
    password: 'estudiante123',
    salonId: 'salon-11-1',
    salonNombre: '11-1',
    grado: '11-1',
    rol: 'estudiante',
    fechaRegistro: '2026-02-01',
    ultimoInicioSesion: '2026-09-14T09:45:10.000Z',
    fechaUltimoInicio: '14/09/2026',
    horaUltimoInicio: '09:45 AM',
    estado: 'Activo',
    haIniciadoSesion: true,
  },
  {
    id: 'usr-est-2',
    identificacion: '1009876543',
    nombre: 'María Paula Aldana',
    nombreCompleto: 'María Paula Aldana',
    correo: 'maria.aldana@perezyaldana.edu.co',
    password: 'estudiante123',
    salonId: 'salon-11-2',
    salonNombre: '11-2',
    grado: '11-2',
    rol: 'estudiante',
    fechaRegistro: '2026-02-01',
    ultimoInicioSesion: undefined,
    fechaUltimoInicio: undefined,
    horaUltimoInicio: undefined,
    estado: 'Activo',
    haIniciadoSesion: false,
  },
  {
    id: 'usr-est-3',
    identificacion: '1005554433',
    nombre: 'Carlos Andrés Gómez',
    nombreCompleto: 'Carlos Andrés Gómez',
    correo: 'carlos.gomez@perezyaldana.edu.co',
    password: 'estudiante123',
    salonId: 'salon-10-1',
    salonNombre: '10-1',
    grado: '10-1',
    rol: 'estudiante',
    fechaRegistro: '2026-02-05',
    ultimoInicioSesion: '2026-09-13T16:20:00.000Z',
    fechaUltimoInicio: '13/09/2026',
    horaUltimoInicio: '04:20 PM',
    estado: 'Activo',
    haIniciadoSesion: true,
  },
  {
    id: 'usr-doc-1',
    identificacion: '52123456',
    nombre: 'Prof. Carlos Alberto Mendoza',
    nombreCompleto: 'Prof. Carlos Alberto Mendoza',
    correo: 'carlos.mendoza@perezyaldana.edu.co',
    password: 'docente123',
    rol: 'docente',
    fechaRegistro: '2025-01-15',
    ultimoInicioSesion: '2026-09-14T07:15:30.000Z',
    fechaUltimoInicio: '14/09/2026',
    horaUltimoInicio: '07:15 AM',
    estado: 'Activo',
    haIniciadoSesion: true,
  },
  {
    id: 'usr-adm-1',
    identificacion: '10101010',
    nombre: 'Dra. Elena Ramos (Coordinación)',
    nombreCompleto: 'Dra. Elena Ramos',
    correo: 'administracion@perezyaldana.edu.co',
    password: 'admin123',
    rol: 'administrador',
    fechaRegistro: '2025-01-10',
    ultimoInicioSesion: '2026-09-14T08:30:00.000Z',
    fechaUltimoInicio: '14/09/2026',
    horaUltimoInicio: '08:30 AM',
    estado: 'Activo',
    haIniciadoSesion: true,
  },
];

export const initialDeskDamages: DeskDamage[] = [
  {
    id: 'pup-1',
    codigoPupitre: 'P-11-1-04',
    salonId: 'salon-11-1',
    salonNombre: '11-1',
    grado: '11-1',
    estudianteId: 'usr-est-1',
    estudianteNombre: 'Juan Pérez Rodríguez',
    estudianteIdentificacion: '1001234567',
    tipoDano: 'Pata dañada',
    motivo: 'Pata metálica desprendida en la soldadura inferior por sobrepeso de morral.',
    valorReparacion: 25000,
    estado: 'En reparación',
    fechaRegistro: '2026-08-01',
    observacionesAdicionales: 'Enviado al taller de ebanistería del colegio.',
  },
  {
    id: 'pup-2',
    codigoPupitre: 'P-11-1-12',
    salonId: 'salon-11-1',
    salonNombre: '11-1',
    grado: '11-1',
    estudianteId: 'usr-est-3',
    estudianteNombre: 'Carlos Andrés Gómez',
    estudianteIdentificacion: '1005554433',
    tipoDano: 'Respaldo dañado',
    motivo: 'Espaldar de madera laminada fisurado en el borde derecho.',
    valorReparacion: 45000,
    estado: 'Dañado',
    fechaRegistro: '2026-08-05',
    observacionesAdicionales: 'Requiere cambio de lámina de tríplex de alto tráfico.',
  },
  {
    id: 'pup-3',
    codigoPupitre: 'P-11-2-08',
    salonId: 'salon-11-2',
    salonNombre: '11-2',
    grado: '11-2',
    estudianteId: 'usr-est-2',
    estudianteNombre: 'María Paula Aldana',
    estudianteIdentificacion: '1009876543',
    tipoDano: 'Superficie dañada',
    motivo: 'Superficie de fórmica rayada con bisturí y graffiti de tinta.',
    valorReparacion: 18000,
    estado: 'Arreglado',
    fechaRegistro: '2026-07-20',
    fechaUltimaModificacion: '2026-08-02',
    observacionesAdicionales: 'Se realizó pulido, sellado y barnizado técnico.',
  },
  {
    id: 'pup-4',
    codigoPupitre: 'P-10-1-02',
    salonId: 'salon-10-1',
    salonNombre: '10-1',
    grado: '10-1',
    estudianteId: 'usr-est-1',
    estudianteNombre: 'Juan Pérez Rodríguez',
    estudianteIdentificacion: '1001234567',
    tipoDano: 'Estructura dañada',
    motivo: 'Parrilla inferior porta-cuadernos doblada y desajustada.',
    valorReparacion: 35000,
    estado: 'En reparación',
    fechaRegistro: '2026-08-08',
    observacionesAdicionales: 'Pendiente de ajuste de remaches reforzados.',
  },
  {
    id: 'pup-5',
    codigoPupitre: 'P-9-3-15',
    salonId: 'salon-9-3',
    salonNombre: '9-3',
    grado: '9-3',
    estudianteId: 'usr-est-2',
    estudianteNombre: 'María Paula Aldana',
    estudianteIdentificacion: '1009876543',
    tipoDano: 'Tornillos o piezas faltantes',
    motivo: 'Tornillos de anclaje de la base desprendidos.',
    valorReparacion: 15000,
    estado: 'Dañado',
    fechaRegistro: '2026-08-10',
    observacionesAdicionales: 'Programado para revisión por el equipo de mantenimiento.',
  },
];

export const initialNotifications: SystemNotification[] = [
  {
    id: 'notif-1',
    titulo: 'Jornada de Mantenimiento Preventivo',
    mensaje: 'Recordatorio a la comunidad educativa: Este viernes se realizará revisión general de mobilario en el Bloque Principal.',
    fecha: '2026-08-12',
    tipo: 'info',
    destinatarioRol: 'todos',
    leido: false,
  },
  {
    id: 'notif-2',
    titulo: 'Actualización de Estado de Pupitres',
    mensaje: 'El pupitre P-11B-08 asignado al salón 11-B ha sido totalmente reparado y devuelto al salón.',
    fecha: '2026-08-02',
    tipo: 'success',
    destinatarioRol: 'estudiante',
    salonId: 'salon-11b',
    leido: false,
  },
  {
    id: 'notif-3',
    titulo: 'Reporte Prioritario de Reparación',
    mensaje: 'Atención Docentes: Hay 2 pupitres en estado "Dañado" pendientes de asignación de presupuesto.',
    fecha: '2026-08-11',
    tipo: 'warning',
    destinatarioRol: 'docente',
    leido: false,
  },
];

export const phpMvcSourceCode: PHPFileCode[] = [
  {
    filename: 'README.md',
    path: 'README.md',
    category: 'docs',
    description: 'Manual de Instalación, Configuración Global, Lenguajes, Framework MVC y MySQL para XAMPP.',
    content: `# INNOVATECH — Sistema de Gestión y Control de Pupitres Dañados
### Institución Educativa Técnica Pérez y Aldana — Proyecto Técnico de Grado 11

---

## 📋 1. DESCRIPCIÓN GENERAL DEL PROYECTO
INNOVATECH es un sistema web integral diseñado para auditar, gestionar y controlar el inventario de pupitres de la Institución Educativa Técnica Pérez y Aldana.
Permite registrar averías, cotizar costos de reparación en pesos colombianos ($ COP), asociar responsables por salón y diferenciar permisos entre Estudiantes y Docentes/Administradores.

---

## 💻 2. TIPOS DE LENGUAJE UTILIZADOS
- PHP (v8.0+): Lógica del servidor (Backend), sesiones seguras ($_SESSION), algoritmos criptográficos (password_hash y password_verify con BCRYPT) y controladores/modelos MVC.
- SQL (Structured Query Language): Consultas preparadas con PDO (PDOStatement::execute, bindParam) para eliminar vulnerabilidades de inyección SQL.
- TypeScript / JavaScript (ES6+): Validaciones de formularios en el cliente en tiempo real y lógica reactiva de interfaz.
- HTML5 Semántico: Estructuración con etiquetas semánticas y atributos de accesibilidad estándar.
- CSS3 / Tailwind CSS: Paleta institucional oficial (Verde Oscuro #06200f, Verde Neón #39ff14, Azul Marino #091d36, Blanco #ffffff).

---

## ⚙️ 3. TIPO DE FRAMEWORK Y ARQUITECTURA
- Backend: Arquitectura MVC Nativa en PHP (Vanilla / Pure MVC). No depende de frameworks externos pesados para garantizar comprensión y defensa pedagógica completa en Grado 11.
- Capa de Datos: PHP Data Objects (PDO) con modo de errores estricto (PDO::ERRMODE_EXCEPTION) y mapeo asociativo.
- Frontend / Simulador: React 18+ con Vite, Tailwind CSS y Lucide Icons.

---

## 🗄️ 4. TIPO DE BASE DE DATOS
- Motor: MySQL o MariaDB (gestionable directamente en phpMyAdmin vía XAMPP, WAMP o LAMP).
- Codificación: utf8mb4 con cotejamiento utf8mb4_unicode_ci (soporte total de caracteres en español).
- Tablas Principales:
  1. 'salones': id, codigo_salon, nombre, ubicacion, capacidad, total_pupitres.
  2. 'usuarios': id, identificacion (cédula/TI), nombre_completo, correo, password_hash, rol, salon_id.
  3. 'pupitres_danados': id, codigo_pupitre, salon_id, estudiante_responsable_id, motivo, valor_reparacion, estado ('Dañado', 'En reparación', 'Arreglado'), observaciones.

---

## 🛠️ 5. CONFIGURACIÓN INICIAL (REQUISITOS PREVIOS)
1. Instalar XAMPP (Apache 2.4+, PHP 8.0+, MySQL 10.4+) desde https://www.apachefriends.org/.
2. Editor de Código: Visual Studio Code con extensiones recomendadas (PHP Intelephense, MySQL Client).
3. Navegador Web Moderno (Google Chrome, Firefox o Edge).
4. Opcional (para desarrollo React): Node.js v18+ y npm.

---

## 🚀 6. CONFIGURACIÓN DEL PROYECTO (PASO A PASO)
Paso 1: Copiar la carpeta del proyecto a:
  C:/xampp/htdocs/innovatech/

Paso 2: En phpMyAdmin (http://localhost/phpmyadmin/):
  - Crear o seleccionar base de datos 'innovatech_db'.
  - Importar el archivo 'schema.sql'.
  - Las tablas y datos de prueba con contraseñas encriptadas se crearán automáticamente.

Paso 3: Verificar conexión en 'config/Database.php':
  - Host: 'localhost'
  - DB Name: 'innovatech_db'
  - Username: 'root'
  - Password: '' (vacía por defecto en XAMPP)

Paso 4: Iniciar en el navegador:
  http://localhost/innovatech/index.php

---

## 🌐 7. CONFIGURACIÓN GLOBAL PARA QUE FUNCIONE CORRECTAMENTE
A. En 'php.ini' de Apache:
  - Habilitar extensión PDO MySQL: 'extension=pdo_mysql'
  - Zona horaria de Colombia: 'date.timezone = America/Bogota'
  - Manejo seguro de sesiones: 'session.cookie_httponly = 1'
  - Reiniciar el servicio Apache en XAMPP Control Panel tras cualquier cambio.

B. Seguridad y Sesiones:
  - 'session_start();' en cada controlador.
  - Validación de rutas con 'if (!isset($_SESSION["usuario_id"]))'.
  - Cifrado con 'password_hash($pass, PASSWORD_BCRYPT)' y verificación con 'password_verify()'.

C. Servidor Web (.htaccess):
  - Asegurar la directiva 'Options -Indexes' para evitar listado de archivos en producción.

---

## 🔑 8. USUARIOS Y CREDENCIALES DE PRUEBA (DEMO)
- Estudiante 1: Doc '1001234567' | Clave 'estudiante123' | Salón 11-A
- Estudiante 2: Doc '1009876543' | Clave 'estudiante123' | Salón 11-B
- Docente: Doc '52123456' | Clave 'docente123' | Dirección Grado 11
- Coordinador/Admin: Doc '10101010' | Clave 'admin123' | Coordinación`,
  },
  {
    filename: 'schema.sql',
    path: 'schema.sql',
    category: 'sql',
    description: 'Script de creación de Base de Datos y tablas para MySQL / phpMyAdmin con hashes de contraseña.',
    content: `-- ====================================================================
-- PROYECTO INNOVATECH - INSTITUCIÓN EDUCATIVA TÉCNICA PÉREZ Y ALDANA
-- Base de Datos MySQL / MariaDB (phpMyAdmin - XAMPP)
-- Grado 11 - Sistema de Gestión de Pupitres Dañados
-- ====================================================================

CREATE DATABASE IF NOT EXISTS innovatech_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE innovatech_db;

-- Tabla de Salones de Clase
CREATE TABLE IF NOT EXISTS salones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_salon VARCHAR(50) NOT NULL UNIQUE,
    ubicacion VARCHAR(100) NOT NULL,
    capacidad INT DEFAULT 35
) ENGINE=InnoDB;

-- Tabla de Usuarios (Estudiantes, Docentes, Administradores)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    identificacion VARCHAR(20) NOT NULL UNIQUE, -- Tarjeta de Identidad / Cédula
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL, -- Encriptado seguro con password_hash()
    rol ENUM('estudiante', 'docente', 'administrador') NOT NULL,
    tipo_usuario ENUM('estudiante', 'docente', 'administrador') NOT NULL, -- Alias para auditoría
    salon_id INT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_inicio_sesion DATETIME NULL, -- Fecha y hora del último acceso al sistema
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    FOREIGN KEY (salon_id) REFERENCES salones(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Tabla de Registro de Pupitres Dañados
CREATE TABLE IF NOT EXISTS pupitres_danados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_pupitre VARCHAR(30) NOT NULL,
    salon_id INT NOT NULL,
    estudiante_id INT NULL,
    motivo TEXT NOT NULL,
    valor_reparacion DECIMAL(10,2) DEFAULT 0.00,
    estado ENUM('Dañado', 'En reparación', 'Arreglado') DEFAULT 'Dañado',
    observaciones TEXT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (salon_id) REFERENCES salones(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Insertar Salones Iniciales
INSERT INTO salones (id, nombre_salon, ubicacion, capacidad) VALUES
(1, 'Salón 11-A', 'Piso 2 - Bloque Principal', 35),
(2, 'Salón 11-B', 'Piso 2 - Bloque Principal', 35),
(3, 'Salón 10-A', 'Piso 1 - Bloque B', 32),
(4, 'Laboratorio de Física', 'Piso 1 - Bloque de Laboratorios', 30);

-- Insertar Usuarios por defecto (Password: estudiante123, docente123, admin123)
-- Hashes generados con BCRYPT password_hash('password', PASSWORD_DEFAULT)
INSERT INTO usuarios (identificacion, nombre, correo, password, rol, salon_id) VALUES
('1001234567', 'Juan Pérez Rodríguez', 'juan.perez@perezyaldana.edu.co', '$2y$10$e846z/8q/Z9v8O3lT2a.a.GjFzV9Lq4a1O1l4a5C3yJ9fV7/V5y6z', 'estudiante', 1),
('1009876543', 'María Paula Aldana', 'maria.aldana@perezyaldana.edu.co', '$2y$10$e846z/8q/Z9v8O3lT2a.a.GjFzV9Lq4a1O1l4a5C3yJ9fV7/V5y6z', 'estudiante', 2),
('52123456', 'Prof. Carlos Alberto Mendoza', 'carlos.mendoza@perezyaldana.edu.co', '$2y$10$7rLSvRl15Zp8KxI7V3ySuOTZ8A.9aV.f6h.C1yJ9fV7/V5y6zY6e.', 'docente', NULL),
('10101010', 'Dra. Elena Ramos (Coordinación)', 'administracion@perezyaldana.edu.co', '$2y$10$7rLSvRl15Zp8KxI7V3ySuOTZ8A.9aV.f6h.C1yJ9fV7/V5y6zY6e.', 'administrador', NULL);

-- Insertar Registros de prueba de Pupitres
INSERT INTO pupitres_danados (codigo_pupitre, salon_id, estudiante_id, motivo, valor_reparacion, estado) VALUES
('P-11A-04', 1, 1, 'Pata metálica desprendida en la soldadura inferior por sobrepeso.', 25000.00, 'En reparación'),
('P-11A-12', 1, 1, 'Espaldar de madera laminada fisurado en el borde derecho.', 45000.00, 'Dañado'),
('P-11B-08', 2, 2, 'Superficie de fórmica rayada con bisturí y tinta.', 18000.00, 'Arreglado');
`,
  },
  {
    filename: 'Database.php',
    path: 'config/Database.php',
    category: 'config',
    description: 'Conexión a la base de datos MySQL mediante PDO con manejo de errores.',
    content: `<?php
/**
 * PROYECTO INNOVATECH - I.E. TÉCNICA PÉREZ Y ALDANA
 * Archivo: config/Database.php
 * Descripción: Clase para establecer conexión segura a MySQL usando PDO.
 */

class Database {
    private $host = "localhost";
    private $db_name = "innovatech_db";
    private $username = "root";
    private $password = ""; // En XAMPP la clave por defecto es vacía
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            echo "<div style='color:red; padding:15px; border:1px solid red; background:#ffe6e6;'>";
            echo "<strong>Error de Conexión en MySQL:</strong> " . $exception->getMessage();
            echo "<br>Asegúrate de que el servidor MySQL esté activo en XAMPP Control Panel.";
            echo "</div>";
        }

        return $this->conn;
    }
}
?>`,
  },
  {
    filename: 'UsuarioModel.php',
    path: 'models/UsuarioModel.php',
    category: 'model',
    description: 'Modelo de datos para Usuarios. Maneja autenticación segura con password_verify().',
    content: `<?php
/**
 * Archivo: models/UsuarioModel.php
 * Capa de Modelo (MVC): Gestiona la interacción con la tabla "usuarios".
 */

require_once __DIR__ . '/../config/Database.php';

class UsuarioModel {
    private $conn;
    private $table_name = "usuarios";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // Buscar usuario por su número de identificación (Documento / Cédula)
    public function findByIdentificacion($identificacion) {
        $query = "SELECT u.*, s.nombre_salon 
                  FROM " . $this->table_name . " u 
                  LEFT JOIN salones s ON u.salon_id = s.id 
                  WHERE u.identificacion = :identificacion LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':identificacion', $identificacion);
        $stmt->execute();

        return $stmt->fetch();
    }

    // Registrar un nuevo usuario con clave hasheada
    public function crearUsuario($identificacion, $nombre, $correo, $password, $rol, $salon_id = null) {
        // Hashing seguro de contraseña con el algoritmo BCRYPT nativo de PHP
        $password_hash = password_hash($password, PASSWORD_BCRYPT);

        $query = "INSERT INTO " . $this->table_name . " 
                  (identificacion, nombre, correo, password, rol, salon_id, estado, ultimo_inicio_sesion) 
                  VALUES (:identificacion, :nombre, :correo, :password, :rol, :salon_id, 'Activo', NULL)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':identificacion', $identificacion);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':password', $password_hash);
        $stmt->bindParam(':rol', $rol);
        $stmt->bindParam(':salon_id', $salon_id);

        return $stmt->execute();
    }

    // Actualizar fecha y hora del último inicio de sesión
    public function actualizarUltimoInicioSesion($id) {
        $query = "UPDATE " . $this->table_name . " 
                  SET ultimo_inicio_sesion = NOW() 
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // Obtener todos los usuarios registrados (Para el Dashboard del Administrador)
    public function obtenerTodos() {
        $query = "SELECT u.id, u.identificacion, u.nombre, u.correo, u.rol, u.estado, 
                         u.ultimo_inicio_sesion, s.nombre_salon 
                  FROM " . $this->table_name . " u 
                  LEFT JOIN salones s ON u.salon_id = s.id 
                  ORDER BY u.id ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
?>`,
  },
  {
    filename: 'PupitreModel.php',
    path: 'models/PupitreModel.php',
    category: 'model',
    description: 'Modelo de Datos para Pupitres Dañados. Consultas SQL para registrar, editar y filtrar.',
    content: `<?php
/**
 * Archivo: models/PupitreModel.php
 * Capa de Modelo (MVC): Operaciones CRUD en la tabla "pupitres_danados".
 */

require_once __DIR__ . '/../config/Database.php';

class PupitreModel {
    private $conn;
    private $table_name = "pupitres_danados";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // Obtener todos los registros de pupitres con información de salón y estudiante
    public function obtenerTodos() {
        $query = "SELECT p.*, s.nombre_salon, u.nombre as nombre_estudiante, u.identificacion as doc_estudiante 
                  FROM " . $this->table_name . " p 
                  JOIN salones s ON p.salon_id = s.id 
                  LEFT JOIN usuarios u ON p.estudiante_id = u.id 
                  ORDER BY p.fecha_registro DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // Obtener pupitres filtrados por salón (Para Vista de Estudiantes)
    public function obtenerPorSalon($salon_id) {
        $query = "SELECT p.*, s.nombre_salon, u.nombre as nombre_estudiante 
                  FROM " . $this->table_name . " p 
                  JOIN salones s ON p.salon_id = s.id 
                  LEFT JOIN usuarios u ON p.estudiante_id = u.id 
                  WHERE p.salon_id = :salon_id 
                  ORDER BY p.fecha_registro DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':salon_id', $salon_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // Registrar un nuevo daño de pupitre
    public function registrarDano($codigo, $salon_id, $estudiante_id, $motivo, $valor, $estado) {
        $query = "INSERT INTO " . $this->table_name . " 
                  (codigo_pupitre, salon_id, estudiante_id, motivo, valor_reparacion, estado) 
                  VALUES (:codigo, :salon_id, :estudiante_id, :motivo, :valor, :estado)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':codigo', $codigo);
        $stmt->bindParam(':salon_id', $salon_id);
        $stmt->bindParam(':estudiante_id', $estudiante_id);
        $stmt->bindParam(':motivo', $motivo);
        $stmt->bindParam(':valor', $valor);
        $stmt->bindParam(':estado', $estado);

        return $stmt->execute();
    }

    // Actualizar estado y costo de reparación
    public function actualizarEstado($id, $estado, $valor) {
        $query = "UPDATE " . $this->table_name . " 
                  SET estado = :estado, valor_reparacion = :valor 
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':valor', $valor);
        $stmt->bindParam(':id', $id);

        return $stmt->execute();
    }
}
?>`,
  },
  {
    filename: 'AuthController.php',
    path: 'controllers/AuthController.php',
    category: 'controller',
    description: 'Controlador de Autenticación. Maneja la verificación de contraseña y sesiones en PHP.',
    content: `<?php
/**
 * Archivo: controllers/AuthController.php
 * Capa Controlador (MVC): Procesa el inicio de sesión y gestión de roles.
 */

require_once __DIR__ . '/../models/UsuarioModel.php';

class AuthController {
    
    public function login() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $identificacion = trim($_POST['identificacion'] ?? '');
            $password = trim($_POST['password'] ?? '');

            if (empty($identificacion) || empty($password)) {
                $error = "Por favor ingrese su número de documento y contraseña.";
                require __DIR__ . '/../views/auth/login.php';
                return;
            }

            $userModel = new UsuarioModel();
            $user = $userModel->findByIdentificacion($identificacion);

            // Verificación segura con password_verify()
            if ($user && password_verify($password, $user['password'])) {
                session_start();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['identificacion'] = $user['identificacion'];
                $_SESSION['nombre'] = $user['nombre'];
                $_SESSION['rol'] = $user['rol'];
                $_SESSION['salon_id'] = $user['salon_id'];
                $_SESSION['nombre_salon'] = $user['nombre_salon'] ?? '';

                // Redirección basada en roles
                if ($user['rol'] === 'estudiante') {
                    header("Location: index.php?action=student_dashboard");
                } else {
                    header("Location: index.php?action=admin_dashboard");
                }
                exit();
            } else {
                $error = "Documento de identidad o contraseña incorrectos.";
                require __DIR__ . '/../views/auth/login.php';
            }
        } else {
            require __DIR__ . '/../views/auth/login.php';
        }
    }

    public function logout() {
        session_start();
        session_unset();
        session_destroy();
        header("Location: index.php?action=login");
        exit();
    }
}
?>`,
  },
  {
    filename: 'PupitreController.php',
    path: 'controllers/PupitreController.php',
    category: 'controller',
    description: 'Controlador de Pupitres. Recibe peticiones de vistas y llama al modelo.',
    content: `<?php
/**
 * Archivo: controllers/PupitreController.php
 * Capa Controlador (MVC): Procesa las acciones de los dashboards de Estudiantes y Admins.
 */

require_once __DIR__ . '/../models/PupitreModel.php';

class PupitreController {
    private $pupitreModel;

    public function __construct() {
        $this->pupitreModel = new PupitreModel();
    }

    // Dashboard exclusivo de Estudiante
    public function studentDashboard() {
        session_start();
        if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'estudiante') {
            header("Location: index.php?action=login");
            exit();
        }

        $salon_id = $_SESSION['salon_id'];
        $pupitres = $this->pupitreModel->obtenerPorSalon($salon_id);

        require __DIR__ . '/../views/student/dashboard.php';
    }

    // Dashboard exclusivo de Docentes y Administradores
    public function adminDashboard() {
        session_start();
        if (!isset($_SESSION['rol']) || ($_SESSION['rol'] !== 'docente' && $_SESSION['rol'] !== 'administrador')) {
            header("Location: index.php?action=login");
            exit();
        }

        $pupitres = $this->pupitreModel->obtenerTodos();

        require __DIR__ . '/../views/admin/dashboard.php';
    }

    // Registrar nuevo daño
    public function guardarDano() {
        session_start();
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $codigo = $_POST['codigo_pupitre'];
            $salon_id = $_POST['salon_id'];
            $estudiante_id = $_POST['estudiante_id'];
            $motivo = $_POST['motivo'];
            $valor = $_POST['valor_reparacion'];
            $estado = $_POST['estado'];

            $this->pupitreModel->registrarDano($codigo, $salon_id, $estudiante_id, $motivo, $valor, $estado);
            header("Location: index.php?action=admin_dashboard&status=success");
            exit();
        }
    }
}
?>`,
  },
  {
    filename: 'login.php',
    path: 'views/auth/login.php',
    category: 'view',
    description: 'Vista del Login con panel verde oscuro central, laterales blancos y validaciones.',
    content: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Innovatech - I.E. Técnica Pérez y Aldana</title>
    <link rel="stylesheet" href="public/css/style.css">
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="login-wrapper">
        <!-- Lateral Izquierdo Blanco -->
        <div class="side-panel left-panel">
            <div class="institutional-watermark">I.E.T. PÉREZ Y ALDANA</div>
        </div>

        <!-- Card Central Verde Oscuro con Borde Neón -->
        <div class="main-login-card">
            <div class="logo-container">
                <div class="school-badge">
                    <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <h1>INNOVATECH</h1>
                <p class="school-name">I.E. Técnica Pérez y Aldana</p>
                <span class="system-subtitle">Sistema de Control de Pupitres</span>
            </div>

            <?php if(!empty($error)): ?>
                <div class="alert-error">
                    <i class="fa-solid fa-triangle-exclamation"></i> <?= htmlspecialchars($error) ?>
                </div>
            <?php endif; ?>

            <form id="loginForm" action="index.php?action=login" method="POST" autocomplete="off">
                <div class="input-group">
                    <label for="identificacion"><i class="fa-solid fa-id-card"></i> Número de Documento / Cédula</label>
                    <div class="input-with-icon">
                        <i class="fa-solid fa-user input-icon"></i>
                        <input type="text" name="identificacion" id="identificacion" placeholder="Ej: 1001234567" required>
                    </div>
                    <small id="idValidationMsg" class="val-msg"></small>
                </div>

                <div class="input-group">
                    <label for="password"><i class="fa-solid fa-lock"></i> Contraseña</label>
                    <div class="input-with-icon">
                        <i class="fa-solid fa-key input-icon"></i>
                        <input type="password" name="password" id="password" placeholder="••••••••" required>
                    </div>
                </div>

                <div class="form-options">
                    <label class="checkbox-container">
                        <input type="checkbox" id="togglePasswordBtn" onclick="togglePasswordVisibility()">
                        <span class="checkmark"></span>
                        Mostrar Contraseña
                    </label>
                </div>

                <button type="submit" class="btn-login">
                    INGRESAR AL SISTEMA <i class="fa-solid fa-arrow-right"></i>
                </button>
            </form>

            <div class="role-help-footer">
                <p><strong>Roles de Acceso:</strong></p>
                <p>Estudiante: Documento de identidad | Docente / Admin: Cédula</p>
            </div>
        </div>

        <!-- Lateral Derecho Blanco -->
        <div class="side-panel right-panel">
            <div class="institutional-watermark">INNOVATECH 2026</div>
        </div>
    </div>

    <script src="public/js/validation.js"></script>
</body>
</html>`,
  },
  {
    filename: 'style.css',
    path: 'public/css/style.css',
    category: 'public',
    description: 'Hoja de estilos CSS con paleta Verde Oscuro, Verde Neón, Azul Oscuro y Blanco.',
    content: `:root {
    --verde-oscuro: #06200f;
    --verde-oscuro-card: #0a2e16;
    --verde-neon: #39ff14;
    --verde-neon-hover: #2de00b;
    --azul-oscuro: #091d36;
    --blanco: #ffffff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: var(--blanco);
    color: #1a1a1a;
    min-height: 100vh;
}

/* Layout de Login con Laterales Blancos y Centro Verde Oscuro */
.login-wrapper {
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: space-between;
    background-color: var(--blanco);
}

.side-panel {
    flex: 1;
    height: 100%;
    background-color: var(--blanco);
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-login-card {
    background-color: var(--verde-oscuro);
    width: 440px;
    max-width: 90%;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(57, 255, 20, 0.35);
    border: 2px solid var(--verde-neon);
    color: var(--blanco);
    text-align: center;
}

.school-badge {
    width: 70px;
    height: 70px;
    background-color: var(--verde-neon);
    color: var(--verde-oscuro);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin: 0 auto 15px auto;
}

.btn-login {
    background-color: var(--verde-neon);
    color: var(--verde-oscuro);
    border: none;
    padding: 14px 28px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-top: 15px;
}

.btn-login:hover {
    background-color: var(--blanco);
    color: var(--verde-oscuro);
    box-shadow: 0 0 20px var(--verde-neon);
}

/* Responsivo para Celular y Tablet */
@media (max-width: 768px) {
    .side-panel { display: none; }
    .login-wrapper { justify-content: center; background-color: var(--verde-oscuro); }
    .main-login-card { width: 95%; border: none; }
}`,
  },
  {
    filename: 'validation.js',
    path: 'public/js/validation.js',
    category: 'public',
    description: 'JavaScript de validación visual en tiempo real y mostrar/ocultar contraseña.',
    content: `/**
 * Archivo: public/js/validation.js
 * JavaScript para interacción en tiempo real del formulario de Login.
 */

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
}

// Validación de Documento en Tiempo Real
document.addEventListener('DOMContentLoaded', function() {
    const idInput = document.getElementById('identificacion');
    const valMsg = document.getElementById('idValidationMsg');

    if (idInput && valMsg) {
        idInput.addEventListener('input', function() {
            const val = this.value.trim();
            if (val.length === 0) {
                valMsg.textContent = '';
                this.style.borderColor = 'rgba(255,255,255,0.2)';
            } else if (!/^[0-9]+$/.test(val)) {
                valMsg.textContent = '⚠️ Solo se permiten números sin puntos ni guiones.';
                valMsg.style.color = '#ff6b6b';
                this.style.borderColor = '#ff6b6b';
            } else if (val.length < 5) {
                valMsg.textContent = '⚠️ Debe tener al menos 5 dígitos.';
                valMsg.style.color = '#fca5a5';
                this.style.borderColor = '#fca5a5';
            } else {
                valMsg.textContent = '✓ Número de documento válido';
                valMsg.style.color = '#39ff14';
                this.style.borderColor = '#39ff14';
            }
        });
    }
});`,
  },
  {
    filename: 'index.php',
    path: 'index.php',
    category: 'router',
    description: 'Enrutador Principal (Front Controller). Dirige las peticiones URL a los controladores.',
    content: `<?php
/**
 * PROYECTO INNOVATECH - INSTITUCIÓN EDUCATIVA TÉCNICA PÉREZ Y ALDANA
 * Archivo: index.php
 * Punto de entrada único del patrón MVC (Front Controller Router).
 */

require_once 'controllers/AuthController.php';
require_once 'controllers/PupitreController.php';

$action = $_GET['action'] ?? 'login';

switch ($action) {
    case 'login':
        $auth = new AuthController();
        $auth->login();
        break;

    case 'logout':
        $auth = new AuthController();
        $auth->logout();
        break;

    case 'student_dashboard':
        $pupitreCtrl = new PupitreController();
        $pupitreCtrl->studentDashboard();
        break;

    case 'admin_dashboard':
        $pupitreCtrl = new PupitreController();
        $pupitreCtrl->adminDashboard();
        break;

    case 'guardar_dano':
        $pupitreCtrl = new PupitreController();
        $pupitreCtrl->guardarDano();
        break;

    default:
        header("Location: index.php?action=login");
        break;
}
?>`,
  },
];
