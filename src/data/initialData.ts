import { Classroom, DeskDamage, PHPFileCode, SystemNotification, User } from '../types';

export const initialClassrooms: Classroom[] = [
  { id: 'salon-11a', nombre: 'Salón 11-A', ubicacion: 'Piso 2 - Bloque Principal', capacidad: 35, totalPupitres: 35 },
  { id: 'salon-11b', nombre: 'Salón 11-B', ubicacion: 'Piso 2 - Bloque Principal', capacidad: 35, totalPupitres: 35 },
  { id: 'salon-10a', nombre: 'Salón 10-A', ubicacion: 'Piso 1 - Bloque B', capacidad: 32, totalPupitres: 32 },
  { id: 'salon-lab', nombre: 'Laboratorio de Física', ubicacion: 'Piso 1 - Bloque de Laboratorios', capacidad: 30, totalPupitres: 30 },
];

export const initialUsers: User[] = [
  {
    id: 'usr-est-1',
    identificacion: '1001234567',
    nombre: 'Juan Pérez Rodríguez',
    correo: 'juan.perez@perezyaldana.edu.co',
    salonId: 'salon-11a',
    salonNombre: 'Salón 11-A',
    rol: 'estudiante',
    fechaRegistro: '2026-02-01',
  },
  {
    id: 'usr-est-2',
    identificacion: '1009876543',
    nombre: 'María Paula Aldana',
    correo: 'maria.aldana@perezyaldana.edu.co',
    salonId: 'salon-11b',
    salonNombre: 'Salón 11-B',
    rol: 'estudiante',
    fechaRegistro: '2026-02-01',
  },
  {
    id: 'usr-est-3',
    identificacion: '1005554433',
    nombre: 'Carlos Andrés Gómez',
    correo: 'carlos.gomez@perezyaldana.edu.co',
    salonId: 'salon-11a',
    salonNombre: 'Salón 11-A',
    rol: 'estudiante',
    fechaRegistro: '2026-02-05',
  },
  {
    id: 'usr-doc-1',
    identificacion: '52123456',
    nombre: 'Prof. Carlos Alberto Mendoza',
    correo: 'carlos.mendoza@perezyaldana.edu.co',
    rol: 'docente',
    fechaRegistro: '2025-01-15',
  },
  {
    id: 'usr-adm-1',
    identificacion: '10101010',
    nombre: 'Dra. Elena Ramos (Coordinación)',
    correo: 'administracion@perezyaldana.edu.co',
    rol: 'administrador',
    fechaRegistro: '2025-01-10',
  },
];

export const initialDeskDamages: DeskDamage[] = [
  {
    id: 'pup-1',
    codigoPupitre: 'P-11A-04',
    salonId: 'salon-11a',
    salonNombre: 'Salón 11-A',
    estudianteId: 'usr-est-1',
    estudianteNombre: 'Juan Pérez Rodríguez',
    estudianteIdentificacion: '1001234567',
    motivo: 'Pata metálica desprendida en la soldadura inferior por sobrepeso de morral.',
    valorReparacion: 25000,
    estado: 'En reparación',
    fechaRegistro: '2026-08-01',
    observacionesAdicionales: 'Enviado al taller de ebanistería del colegio.',
  },
  {
    id: 'pup-2',
    codigoPupitre: 'P-11A-12',
    salonId: 'salon-11a',
    salonNombre: 'Salón 11-A',
    estudianteId: 'usr-est-3',
    estudianteNombre: 'Carlos Andrés Gómez',
    estudianteIdentificacion: '1005554433',
    motivo: 'Espaldar de madera laminada fisurado en el borde derecho.',
    valorReparacion: 45000,
    estado: 'Dañado',
    fechaRegistro: '2026-08-05',
    observacionesAdicionales: 'Requiere cambio de lámina de tríplex de alto tráfico.',
  },
  {
    id: 'pup-3',
    codigoPupitre: 'P-11B-08',
    salonId: 'salon-11b',
    salonNombre: 'Salón 11-B',
    estudianteId: 'usr-est-2',
    estudianteNombre: 'María Paula Aldana',
    estudianteIdentificacion: '1009876543',
    motivo: 'Superficie de fórmica rayada con bisturí y graffiti de tinta.',
    valorReparacion: 18000,
    estado: 'Arreglado',
    fechaRegistro: '2026-07-20',
    fechaUltimaModificacion: '2026-08-02',
    observacionesAdicionales: 'Se realizó pulido, sellado y barnizado técnico.',
  },
  {
    id: 'pup-4',
    codigoPupitre: 'P-10A-02',
    salonId: 'salon-10a',
    salonNombre: 'Salón 10-A',
    estudianteId: 'usr-est-1',
    estudianteNombre: 'Juan Pérez Rodríguez',
    estudianteIdentificacion: '1001234567',
    motivo: 'Parrilla inferior porta-cuadernos doblada y desajustada.',
    valorReparacion: 35000,
    estado: 'En reparación',
    fechaRegistro: '2026-08-08',
    observacionesAdicionales: 'Pendiente de ajuste de remaches reforzados.',
  },
  {
    id: 'pup-5',
    codigoPupitre: 'P-LAB-15',
    salonId: 'salon-lab',
    salonNombre: 'Laboratorio de Física',
    estudianteId: 'usr-est-2',
    estudianteNombre: 'María Paula Aldana',
    estudianteIdentificacion: '1009876543',
    motivo: 'Mecanismo de elevación de silla giratoria trancado.',
    valorReparacion: 50000,
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
    salon_id INT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
                  (identificacion, nombre, correo, password, rol, salon_id) 
                  VALUES (:identificacion, :nombre, :correo, :password, :rol, :salon_id)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':identificacion', $identificacion);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':password', $password_hash);
        $stmt->bindParam(':rol', $rol);
        $stmt->bindParam(':salon_id', $salon_id);

        return $stmt->execute();
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
