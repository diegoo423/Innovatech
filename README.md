# INNOVATECH — Sistema de Gestión y Control de Pupitres Dañados
### Institución Educativa Técnica Pérez y Aldana — Proyecto Técnico de Grado 11

---

## 📋 1. Descripción General del Proyecto

**INNOVATECH** es un sistema web integral diseñado para modernizar, auditar y controlar el inventario de mobiliario escolar (pupitres, sillas y mesas) en la **Institución Educativa Técnica Pérez y Aldana**. 

El sistema resuelve la problemática de deterioro no registrado de pupitres, agiliza la rendición de cuentas, calcula costos de reparación en pesos colombianos ($ COP) y promueve la cultura del cuidado del bien público escolar mediante un modelo de acceso diferenciado por roles:

- **Rol Estudiante:** Consulta los pupitres asignados a su salón, verifica el estado técnico de los mismos (*Dañado*, *En reparación*, *Arreglado*), revisa novedades registradas a su nombre y reporta incidencias a los directores de grupo.
- **Rol Docente / Administrativo:** Registra nuevos daños con motivo técnico, asigna estudiante responsable, clasifica salón, cotiza valor de reparación en pesos colombianos, actualiza estados y genera estadísticas presupuestales para la toma de decisiones institucionales.

---

## 💻 2. Tipo de Lenguaje Utilizado

El proyecto utiliza una combinación de tecnologías estándares de la industria, garantizando modularidad, seguridad y facilidad de sustentación técnica:

1. **PHP (Versión 8.0 o superior):**
   - Lenguaje de programación del lado del servidor (*Backend*).
   - Implementa los controladores y modelos del patrón arquitectónico **MVC**.
   - Administra el ciclo de vida de sesiones de usuario seguras mediante `$_SESSION`.
   - Aplica algoritmos criptográficos modernos (`password_hash` con algoritmo `PASSWORD_BCRYPT` y `password_verify`).
2. **SQL (Structured Query Language):**
   - Lenguaje estructurado para definición (DDL) y manipulación (DML) de datos.
   - Ejecutado mediante sentencias preparadas de **PDO** (`PDOStatement::execute`) con vinculación estricta de parámetros (`bindParam` / marcadores `:param`) para erradicar vulnerabilidades de **Inyección SQL (SQL Injection)**.
3. **TypeScript / JavaScript (ES6+):**
   - Tipado estático y robusto para la plataforma cliente.
   - Validaciones dinámicas en el navegador en tiempo real (detección de caracteres numéricos en el documento de identidad y conmutador visual para mostrar/ocultar contraseñas).
4. **HTML5 Semántico:**
   - Estructuración accesible mediante etiquetas semánticas (`<header>`, `<main>`, `<nav>`, `<section>`, `<table>`, `<footer>`), atributos identificadores únicos (`id`) y atributos de accesibilidad.
5. **CSS3 / Tailwind CSS:**
   - Hoja de estilos con arquitectura visual basada en la identidad institucional:
     - **Verde Oscuro Institucional:** `#06200f`
     - **Verde Neón de Acento:** `#39ff14`
     - **Azul Marino Secundario:** `#091d36`
     - **Blanco Puro:** `#ffffff`
   - Diseño adaptable (*Responsive Web Design*) para visualización óptima en computadores de escritorio, tabletas y teléfonos celulares.

---

## ⚙️ 3. Tipo de Framework y Arquitectura

### Backend: Arquitectura MVC Nativa en PHP (Pure/Vanilla MVC)
Con el objetivo pedagógico de comprender a fondo la ingeniería de software para el grado 11:
- **No depende de mega-frameworks sobrecargados** (como Laravel, Symfony o CodeIgniter), permitiendo a los estudiantes y evaluadores inspeccionar cada línea de código sin "cajas negras".
- **Separación de responsabilidades clara:**
  - **M (Modelo):** Conexión a base de datos y consultas SQL (`UsuarioModel.php`, `PupitreModel.php`).
  - **V (Vista):** Archivos PHP con marcado HTML limpio y estilizado (`views/auth/login.php`, `views/dashboard/`).
  - **C (Controlador):** Lógica de negocio, validaciones y redirecciones (`AuthController.php`, `PupitreController.php`).
  - **Enrutador Front Controller (`index.php`):** Punto único de entrada que intercepta el parámetro `action` para despachar la petición al controlador respectivo.

### Capa de Abstracción de Datos: PHP Data Objects (PDO)
- Emplea el driver nativo `PDO` con manejo estricto de excepciones (`PDO::ERRMODE_EXCEPTION`) y mapeo asociativo (`PDO::FETCH_ASSOC`).

### Entorno de Demostración y Simulación Frontend: React + Vite
- Para la versión interactiva y multiplataforma en la nube se utiliza **React 18/19** con empaquetador ultrarrápido **Vite**, **Tailwind CSS** y la suite de iconos **Lucide React**.

---

## 🗄️ 4. Tipo de Base de Datos

El proyecto cuenta con doble modalidad de base de datos para adecuarse tanto al entorno de sustentación local en el colegio como al despliegue en la nube:

### A. Base de Datos en la Nube: Google Firebase Cloud Firestore (En Producción y Tiempo Real)
- **Servicio:** Google Cloud Firestore (NoSQL orientada a documentos en tiempo real).
- **ID de Proyecto:** `quadratic-beacon-8xctm`
- **Reglas de Seguridad (`firestore.rules`):** Desplegadas con validación estricta de atributos (`isValidDeskDamage`, `isValidClassroom`, `isValidNotification`, `isValidUser`), límites de tamaño de cadenas y aislamiento de operaciones.
- **Colecciones Firestore Sincronizadas:**
  - `/pupitres/{pupitreId}`: Registro de pupitres, motivos, cotización y estado.
  - `/salones/{salonId}`: Catálogo de salones y cantidades.
  - `/notificaciones/{notificacionId}`: Avisos institucionales y alertas automáticas.
  - `/usuarios/{usuarioId}`: Perfiles de estudiantes, docentes y administradores.
- **Ventajas:** Sincronización bidireccional instantánea mediante listeners `onSnapshot()`, soporte sin conexión (*offline caching*) y sin necesidad de abrir puertos de base de datos.

### B. Base de Datos Relacional Local: MySQL / MariaDB (Entorno XAMPP)
- **Motor de Base de Datos:** **MySQL** o **MariaDB** (incluido nativamente en paquetes como XAMPP, WAMP o LAMP).
- **Cotejamiento / Codificación:** `utf8mb4` con intercalación `utf8mb4_unicode_ci` (soporta tildes, eñes y caracteres especiales del español).
- **Herramienta de Administración:** **phpMyAdmin** o consola de comandos de MySQL.

### Estructura de Tablas del Sistema:
1. **`salones`**:
   - `id` (INT AUTO_INCREMENT PRIMARY KEY)
   - `codigo_salon` (VARCHAR 20 UNIQUE) — Ejemplo: `SALON-11A`
   - `nombre` (VARCHAR 100) — Ejemplo: `Salón 11-A`
   - `ubicacion` (VARCHAR 150) — Ejemplo: `Piso 2 - Bloque Principal`
   - `capacidad` (INT) — Capacidad máxima de estudiantes
   - `total_pupitres` (INT) — Total de pupitres inventariados
2. **`usuarios`**:
   - `id` (INT AUTO_INCREMENT PRIMARY KEY)
   - `identificacion` (VARCHAR 20 UNIQUE) — Cédula o Tarjeta de Identidad
   - `nombre_completo` (VARCHAR 150)
   - `correo` (VARCHAR 150 UNIQUE)
   - `password_hash` (VARCHAR 255) — Contraseña protegida con BCRYPT
   - `rol` (ENUM: `'estudiante'`, `'docente'`, `'administrador'`)
   - `salon_id` (INT NULL, Llave Foránea a `salones.id`)
   - `fecha_registro` (DATETIME)
3. **`pupitres_danados`**:
   - `id` (INT AUTO_INCREMENT PRIMARY KEY)
   - `codigo_pupitre` (VARCHAR 30 UNIQUE) — Ejemplo: `P-11A-04`
   - `salon_id` (INT, Llave Foránea a `salones.id`)
   - `estudiante_responsable_id` (INT, Llave Foránea a `usuarios.id`)
   - `motivo` (TEXT) — Diagnóstico o causa del daño
   - `valor_reparacion` (DECIMAL 10,2) — Costo estimado en pesos colombianos ($ COP)
   - `estado` (ENUM: `'Dañado'`, `'En reparación'`, `'Arreglado'`)
   - `observaciones` (TEXT)
   - `fecha_registro` (DATE)
   - `fecha_actualizacion` (TIMESTAMP)

---

## 🛠️ 5. Configuración Inicial (Requisitos Previos)

Antes de poner en marcha el proyecto en un equipo local de cómputo, asegúrate de contar con los siguientes programas instalados:

1. **Servidor Local Web:**
   - Descargar e instalar **XAMPP** para Windows, macOS o Linux desde [apachefriends.org](https://www.apachefriends.org/).
   - Asegurarse de que XAMPP incluya **Apache 2.4+**, **PHP 8.0+** y **MySQL / MariaDB 10.4+**.
2. **Editor de Código Fuente:**
   - **Visual Studio Code** (recomendado).
   - Extensiones de VS Code sugeridas:
     - *PHP Intelephense* (autocompletado de sintaxis PHP).
     - *MySQL* o *Database Client* (para consultar la base de datos directamente).
     - *Tailwind CSS IntelliSense*.
3. **Navegador Web Moderno:**
   - Google Chrome, Mozilla Firefox, Microsoft Edge o Brave.
4. **Opcional (Para compilar o ejecutar el simulador React):**
   - **Node.js (v18 o superior)** y gestor de paquetes **npm**.

---

## 🚀 6. Configuración del Proyecto (Paso a Paso)

Sigue estos sencillos pasos para instalar y ejecutar el proyecto con la arquitectura PHP MVC:

### Paso 1: Ubicación de los Archivos en XAMPP
1. Inicia el panel de control de **XAMPP**.
2. Dirígete al directorio raíz de publicación web de Apache:
   - En Windows: `C:\xampp\htdocs\`
   - En Linux: `/opt/lampp/htdocs/`
   - En macOS: `/Applications/XAMPP/xamppfiles/htdocs/`
3. Crea una carpeta llamada `innovatech`:
   ```bash
   C:\xampp\htdocs\innovatech\
   ```
4. Copia dentro de esta carpeta los archivos del proyecto (los puedes descargar o copiar directamente desde la pestaña **"Código MVC (PHP)"** de la aplicación).

### Paso 2: Importar la Base de Datos en phpMyAdmin
1. En el panel de control de XAMPP, haz clic en **Start** en los módulos **Apache** y **MySQL**.
2. Abre tu navegador web e ingresa a:
   ```url
   http://localhost/phpmyadmin/
   ```
3. Haz clic en la pestaña superior **Importar** (o crea manualmente una base de datos llamada `innovatech_db`).
4. Haz clic en **Seleccionar archivo** y elige el archivo `schema.sql` ubicado en la raíz del proyecto.
5. Presiona el botón inferior **Continuar** (o **Importar**).
6. phpMyAdmin creará automáticamente la base de datos `innovatech_db`, todas sus tablas, restricciones de clave foránea e insertará los datos de prueba institucionales con claves ya encriptadas con BCRYPT.

### Paso 3: Configurar la Conexión a la Base de Datos
Verifica el archivo `config/Database.php` para asegurarte de que coincida con tus credenciales de MySQL en XAMPP:

```php
<?php
class Database {
    private $host = "localhost";
    private $db_name = "innovatech_db";
    private $username = "root";      // Usuario predeterminado en XAMPP
    private $password = "";          // Contraseña vacía por defecto en XAMPP
    private $charset = "utf8mb4";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
        } catch (PDOException $exception) {
            die("Error de Conexión a MySQL: " . $exception->getMessage());
        }
        return $this->conn;
    }
}
?>
```

### Paso 4: Ejecutar el Sistema en el Navegador
Abre tu navegador e ingresa a la siguiente dirección:
```url
http://localhost/innovatech/index.php
```
¡Listo! El sistema cargará la pantalla de inicio de sesión con el diseño oficial en verde oscuro y neón de la institución.

---

## 🌐 7. Configuración Global para que Funcione Correctamente

Para garantizar el funcionamiento fluido, seguro y sin advertencias en cualquier servidor web, deben verificarse las siguientes directivas globales:

### A. Configuración de PHP (`php.ini`)
Localiza el archivo `php.ini` (en XAMPP: botón **Config** junto a Apache -> `PHP (php.ini)`):

1. **Habilitar extensión PDO MySQL:**
   Verifica que la siguiente línea **NO** tenga punto y coma (`;`) al inicio:
   ```ini
   extension=pdo_mysql
   ```
2. **Zona Horaria Oficial de Colombia:**
   Configura la directiva de fecha para que los registros de pupitres almacenen la hora exacta:
   ```ini
   date.timezone = America/Bogota
   ```
3. **Visualización de Errores en Fase de Desarrollo:**
   Para detectar cualquier anomalía durante la programación:
   ```ini
   display_errors = On
   display_startup_errors = On
   error_reporting = E_ALL
   ```
   *(En producción institucional se recomienda cambiar a `display_errors = Off` y activar `log_errors = On`).*
4. **Manejo Seguro de Sesiones:**
   Asegúrate de que las sesiones almacenen las cookies de forma segura:
   ```ini
   session.cookie_httponly = 1
   session.use_only_cookies = 1
   ```

> **Importante:** Cada vez que modifiques el archivo `php.ini`, debes presionar **Stop** y luego **Start** en Apache desde el panel de XAMPP para que los cambios surtan efecto.

### B. Manejo de Sesiones e Inicio de Sesión
- En cada controlador o vista protegida, la primera instrucción ejecutable debe ser `session_start();`.
- Para proteger las rutas privadas, el controlador valida la existencia de la sesión:
  ```php
  if (!isset($_SESSION['usuario_id'])) {
      header("Location: index.php?action=login");
      exit();
  }
  ```

### C. Seguridad y Encriptación de Contraseñas
- **Nunca se deben almacenar contraseñas en texto plano.**
- Al registrar o actualizar contraseñas se usa:
  ```php
  $hash = password_hash($passwordPlano, PASSWORD_BCRYPT);
  ```
- Al validar el acceso en el login se comprueba contra el hash:
  ```php
  if (password_verify($passwordIngresado, $usuario['password_hash'])) {
      // Acceso concedido
  }
  ```

### D. Servidor Web Apache y Redirección Limpia (`.htaccess`)
Para habilitar URLs limpias y evitar la visualización del listado de directorios, se recomienda incluir en la raíz del proyecto un archivo `.htaccess`:
```apache
Options -Indexes

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.php?action=$1 [QSA,L]
</IfModule>
```

---

## 🔑 8. Credenciales de Prueba y Demostración (Seed Data)

El script `schema.sql` incluye los siguientes usuarios de prueba listos para sustentar ante el docente o jurado:

| Rol | Nombre Completo | Tipo de Documento / Usuario | Contraseña | Asignación / Salón |
| :--- | :--- | :--- | :--- | :--- |
| **Estudiante** | Juan Pérez Rodríguez | `1001234567` | `estudiante123` | Salón 11-A |
| **Estudiante** | María Paula Aldana | `1009876543` | `estudiante123` | Salón 11-B |
| **Estudiante** | Carlos Andrés Gómez | `1005554433` | `estudiante123` | Salón 11-A |
| **Docente** | Prof. Carlos Alberto Mendoza | `52123456` | `docente123` | Dirección Grado 11 |
| **Administrador** | Dra. Elena Ramos (Coordinación) | `10101010` | `admin123` | Coordinación Académica |

---

## 📁 9. Estructura de Carpetas del Proyecto (Arquitectura MVC)

```text
innovatech/
│
├── config/
│   └── Database.php             # Configuración y conexión PDO a MySQL
│
├── controllers/
│   ├── AuthController.php       # Gestión de Login, validación de credenciales y Logout
│   └── PupitreController.php    # CRUD de pupitres, filtros por salón y estadísticas
│
├── models/
│   ├── UsuarioModel.php         # Consultas de autenticación y roles en la tabla 'usuarios'
│   └── PupitreModel.php         # Consultas SQL para inventario y costos de reparación
│
├── views/
│   ├── auth/
│   │   └── login.php            # Vista de inicio de sesión con estilo institucional y neón
│   └── dashboard/
│       ├── student.php          # Vista restringida para estudiantes
│       └── admin.php            # Vista completa para docentes y coordinadores
│
├── public/
│   ├── css/
│   │   └── style.css            # Estilos personalizados (verde oscuro, verde neón, glow)
│   ├── js/
│   │   └── validation.js        # Validación en tiempo real y alternador de contraseña
│   └── img/
│       └── logo_colegio.png     # Escudo oficial de la I.E.T. Pérez y Aldana
│
├── schema.sql                   # Script de creación de tablas y datos de prueba para MySQL
├── index.php                    # Front Controller (enrutador central del sistema)
├── .htaccess                    # Configuración de seguridad para el servidor Apache
└── README.md                    # Manual técnico y guía de instalación completa
```

---

## ⚡ 10. Ejecución del Simulador Interactivo (Entorno React / Vite)

Si deseas ejecutar o modificar el simulador web interactivo en desarrollo:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

El servidor local se ejecutará en `http://localhost:3000` con recarga instantánea.

---

## ❓ 11. Preguntas Frecuentes y Solución de Problemas (Troubleshooting)

1. **Error: "Access denied for user 'root'@'localhost'"**
   - **Causa:** La contraseña de MySQL en tu XAMPP no está vacía o el usuario es distinto.
   - **Solución:** Abre `config/Database.php` y ajusta el atributo `$password = "tu_password";`.
2. **Error: "Call to undefined function PDO" o "Driver not found"**
   - **Causa:** La extensión `pdo_mysql` está deshabilitada en PHP.
   - **Solución:** Abre `php.ini`, busca `;extension=pdo_mysql` y quita el punto y coma inicial. Reinicia Apache.
3. **El puerto 80 o 3306 de XAMPP está ocupado:**
   - **Causa:** Programas como Skype, VMware, IIS o servicios locales de MySQL ocupan el puerto.
   - **Solución:** En el panel de XAMPP, haz clic en **Config** -> **Service and Port Settings** y asigna el puerto 8080 para Apache y 3307 para MySQL (si cambias el puerto de MySQL, añade `;port=3307` en el DSN de `Database.php`).
4. **¿Por qué se muestra el mensaje de error de documento en tiempo real?**
   - El script `public/js/validation.js` valida que el número de identificación contenga exclusivamente números y tenga una longitud mínima de 5 dígitos para prevenir errores de digitación antes del envío al servidor.

---

### © 2026 Innovatech — Institución Educativa Técnica Pérez y Aldana
*Desarrollado para el proyecto técnico de Grado 11 en articulación con educación tecnológica en desarrollo de software.*
