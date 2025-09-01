# 🚀 Sistema de Gestión de Usuarios y Casos

Un sistema completo de gestión con autenticación, autorización por roles y funcionalidades CRUD para usuarios y casos.

## ✨ Características Principales

### 🔐 Autenticación y Autorización
- **Login/Logout** con JWT tokens
- **Control de roles** (Admin/User)
- **Protección de rutas** basada en permisos
- **Middleware de seguridad** robusto

### 👥 Gestión de Usuarios (Solo Admin)
- **CRUD completo** de usuarios
- **Cambio de contraseñas** para cualquier usuario
- **Gestión de roles** (admin/user)
- **Exportación a Excel** de usuarios

### 📋 Gestión de Casos
- **CRUD completo** de casos
- **Estados**: Pendiente, En Progreso, Completado, Cancelado
- **Prioridades**: Baja, Media, Alta, Urgente
- **Información del cliente** completa
- **Exportación a Excel** de casos

### 🎨 Interfaz de Usuario
- **Material-UI** para diseño moderno y responsivo
- **Dashboard diferenciado** por roles
- **Navegación intuitiva** y accesible
- **Notificaciones** en tiempo real

## 🏗️ Arquitectura del Sistema

### Backend
- **Node.js** con Express
- **PostgreSQL** como base de datos
- **Sequelize** como ORM
- **JWT** para autenticación
- **bcrypt** para hashing de contraseñas

### Frontend
- **React 18** con hooks
- **Material-UI** para componentes
- **React Router** para navegación
- **Axios** para comunicación con API
- **xlsx** para exportación a Excel

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose
- PostgreSQL (opcional, se incluye en Docker)

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd mi-proyecto
```

### 2. Configurar variables de entorno
Crear archivo `.env` en el directorio raíz:
```env
DB_USER=grodo
DB_PASSWORD=admin123
DB_NAME=my-store
DB_HOST=localhost
DB_PORT=5433
JWT_SECRET=your-super-secret-key
```

### 3. Iniciar servicios con Docker
```bash
docker-compose up -d
```

### 4. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 5. Ejecutar migraciones
```bash
npx sequelize-cli db:migrate
```

### 6. Iniciar el backend
```bash
npm run dev
```

### 7. Instalar dependencias del frontend
```bash
cd ../frontend
npm install
```

### 8. Iniciar el frontend
```bash
npm start
```

## 🌐 Acceso al Sistema

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Base de datos**: localhost:5433
- **PgAdmin**: http://localhost:5050

## 👤 Usuarios de Prueba

### Administradores
- **admin** / **admin123**
- **Estrella** / **admin123**
- **insomnia_test** / **test456**

### Usuarios Normales
- **usuario** / **admin123**
- **testuser** / **test123**

## 📱 Funcionalidades por Rol

### 🔴 Administrador
- ✅ Acceso completo a todas las funcionalidades
- ✅ Gestión completa de usuarios (CRUD)
- ✅ Gestión completa de casos (CRUD)
- ✅ Cambio de contraseñas de usuarios
- ✅ Exportación de datos a Excel
- ✅ Estadísticas del sistema

### 🔵 Usuario Normal
- ✅ Visualización de casos
- ✅ Exportación de casos personales
- ❌ Gestión de usuarios
- ❌ Gestión de casos de otros usuarios

## 🔌 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Login de usuarios
- `POST /api/auth/register` - Registro de usuarios

### Gestión de Usuarios (Solo Admin)
- `GET /api/users` - Listar todos los usuarios
- `GET /api/users/:id` - Obtener usuario específico
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `PUT /api/users/:id/password` - Cambiar contraseña
- `DELETE /api/users/:id` - Eliminar usuario

### Gestión de Casos
- `GET /api/cases` - Listar todos los casos (Admin)
- `GET /api/cases/my-cases` - Casos del usuario actual
- `GET /api/cases/:id` - Obtener caso específico
- `POST /api/cases` - Crear nuevo caso
- `PUT /api/cases/:id` - Actualizar caso
- `DELETE /api/cases/:id` - Eliminar caso

## 🎯 Flujo de Uso

### 1. Inicio de Sesión
1. Acceder a http://localhost:3001
2. Ingresar credenciales de usuario
3. El sistema redirige al dashboard según el rol

### 2. Dashboard
- **Admin**: Ve todas las opciones disponibles
- **User**: Ve opciones limitadas a su rol

### 3. Gestión de Casos
- **Admin**: Acceso completo a todos los casos
- **User**: Solo ve sus propios casos

### 4. Gestión de Usuarios (Solo Admin)
- Crear, editar, eliminar usuarios
- Cambiar roles y contraseñas
- Exportar lista de usuarios

### 5. Exportación
- Botón "Exportar a Excel" en cada sección
- Descarga automática de archivos .xlsx
- Formato optimizado para análisis

## 🛡️ Seguridad

### Autenticación
- Tokens JWT con expiración de 1 hora
- Verificación de usuario en cada request
- Logout automático al expirar token

### Autorización
- Middleware de verificación de roles
- Protección de rutas sensibles
- Prevención de acceso no autorizado

### Validación
- Sanitización de datos de entrada
- Validación de esquemas
- Manejo de errores centralizado

## 📊 Estructura de la Base de Datos

### Tabla Users
- `id` (Primary Key)
- `username` (Unique)
- `password` (Hashed)
- `role` (ENUM: 'admin', 'user')
- `createdAt`, `updatedAt`

### Tabla Cases
- `id` (Primary Key)
- `title`
- `description`
- `status` (ENUM: 'pending', 'in_progress', 'completed', 'cancelled')
- `priority` (ENUM: 'low', 'medium', 'high', 'urgent')
- `clientName`, `clientEmail`, `clientPhone`
- `createdAt`, `updatedAt`

## 🧪 Pruebas

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 🚀 Despliegue

### Producción
1. Configurar variables de entorno de producción
2. Construir el frontend: `npm run build`
3. Configurar servidor web (nginx/apache)
4. Configurar base de datos de producción
5. Usar PM2 para el backend

### Docker
```bash
# Construir imagen
docker build -t sistema-gestion .

# Ejecutar contenedor
docker run -p 3000:3000 sistema-gestion
```

## 📝 Notas de Desarrollo

### Estructura de Archivos
```
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores de la API
│   │   ├── middlewares/     # Middlewares de autenticación
│   │   ├── models/          # Modelos de Sequelize
│   │   ├── routes/          # Definición de rutas
│   │   └── services/        # Lógica de negocio
│   ├── config/              # Configuración de BD
│   └── migrations/          # Migraciones de BD
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   ├── services/        # Servicios de API
│   │   └── App.jsx          # Componente principal
│   └── public/              # Archivos estáticos
└── docker-compose.yml       # Configuración de servicios
```

### Convenciones de Código
- **Backend**: ES6+, async/await, try-catch
- **Frontend**: React Hooks, Material-UI, componentes funcionales
- **Base de datos**: Migraciones, seeders, modelos Sequelize

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico o preguntas:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo
- Revisar la documentación de la API

## 🔄 Changelog

### v1.0.0 (2025-08-31)
- ✅ Sistema de autenticación completo
- ✅ CRUD de usuarios con control de roles
- ✅ CRUD de casos con estados y prioridades
- ✅ Exportación a Excel
- ✅ Dashboard diferenciado por roles
- ✅ Interfaz moderna con Material-UI
- ✅ API RESTful completa
- ✅ Base de datos PostgreSQL con Sequelize

---

**¡Disfruta usando el sistema! 🎉**
