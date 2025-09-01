# API Endpoints - Sistema de Autenticación y Gestión de Usuarios

## Base URL
`http://localhost:3000`

## Endpoints Disponibles

### 1. Verificar API
- **GET** `/`
- **Descripción**: Verifica que la API esté funcionando
- **Respuesta**: `API funcionando 🚀`

### 2. Autenticación

#### Login
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Respuesta exitosa**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "role": "admin"
  }
  ```

#### Registro
- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "username": "nuevo_usuario",
    "password": "contraseña123",
    "role": "user"
  }
  ```
- **Respuesta exitosa**:
  ```json
  {
    "user": {
      "id": 5,
      "username": "nuevo_usuario",
      "role": "user",
      "createdAt": "2025-08-31T23:07:49.276Z",
      "updatedAt": "2025-08-31T23:07:49.276Z"
    }
  }
  ```

### 3. Gestión de Usuarios (Solo Admin) 🔐

**Nota**: Todas las rutas requieren autenticación con token JWT y rol de administrador.

#### Obtener Todos los Usuarios
- **GET** `/api/users`
- **Headers**: `Authorization: Bearer <token>`
- **Respuesta**:
  ```json
  {
    "users": [
      {
        "id": 1,
        "username": "admin",
        "role": "admin",
        "createdAt": "2025-08-31T21:25:43.854Z",
        "updatedAt": "2025-08-31T21:25:43.854Z"
      }
    ],
    "count": 1
  }
  ```

#### Obtener Usuario por ID
- **GET** `/api/users/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Respuesta**:
  ```json
  {
    "user": {
      "id": 1,
      "username": "admin",
      "role": "admin",
      "createdAt": "2025-08-31T21:25:43.854Z",
      "updatedAt": "2025-08-31T21:25:43.854Z"
    }
  }
  ```

#### Crear Nuevo Usuario
- **POST** `/api/users`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "username": "nuevo_usuario",
    "password": "contraseña123",
    "role": "user"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "Usuario creado exitosamente",
    "user": {
      "id": 10,
      "username": "nuevo_usuario",
      "role": "user",
      "createdAt": "2025-08-31T23:50:00.000Z",
      "updatedAt": "2025-08-31T23:50:00.000Z"
    }
  }
  ```

#### Actualizar Usuario
- **PUT** `/api/users/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "username": "usuario_actualizado",
    "role": "admin"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "Usuario actualizado exitosamente",
    "user": {
      "id": 10,
      "username": "usuario_actualizado",
      "role": "admin",
      "createdAt": "2025-08-31T23:50:00.000Z",
      "updatedAt": "2025-08-31T23:51:00.000Z"
    }
  }
  ```

#### Cambiar Contraseña
- **PUT** `/api/users/:id/password`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "newPassword": "nueva_contraseña123"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "Contraseña actualizada exitosamente"
  }
  ```

#### Eliminar Usuario
- **DELETE** `/api/users/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Respuesta**:
  ```json
  {
    "message": "Usuario eliminado exitosamente"
  }
  ```

## Usuarios de Prueba Disponibles

1. **admin** / **admin123** (rol: admin) - Usuario principal
2. **usuario** / **admin123** (rol: user)
3. **Estrella** / **admin123** (rol: admin)
4. **testuser** / **test123** (rol: user)
5. **insomnia_test** / **test456** (rol: admin)

## Características de Seguridad 🔒

### Autenticación
- **JWT Tokens**: Expiran en 1 hora
- **Verificación de usuario**: Se verifica que el usuario exista en cada request
- **Manejo de errores**: Tokens expirados e inválidos se manejan apropiadamente

### Autorización
- **Rol Admin**: Acceso completo a todas las funcionalidades
- **Rol User**: Solo acceso a autenticación básica
- **Middleware de protección**: Todas las rutas de gestión requieren rol admin

### Validaciones
- **Contraseñas**: Mínimo 6 caracteres
- **Usernames únicos**: No se permiten duplicados
- **Roles válidos**: Solo 'admin' o 'user'
- **Prevención de auto-eliminación**: Los admins no pueden eliminarse a sí mismos

## Configuración de CORS
- La API está configurada para aceptar peticiones desde cualquier origen
- Headers permitidos: `Content-Type`, `Authorization`

## Base de Datos
- **Tipo**: PostgreSQL
- **Puerto**: 5433
- **Base de datos**: my-store
- **Usuario**: grodo
- **Contraseña**: admin123

## Manejo de Errores
- **Validación**: Errores de Sequelize se manejan apropiadamente
- **Duplicación**: Errores de campos únicos duplicados
- **Foreign Keys**: Protección contra eliminación de recursos en uso
- **Rutas no encontradas**: Respuestas 404 apropiadas

## Notas Importantes
- El token JWT expira en 1 hora
- Las contraseñas se hashean automáticamente con bcrypt
- El rol por defecto es "user" si no se especifica
- Solo los administradores pueden gestionar usuarios
- Los usuarios no pueden acceder a rutas de administración
- Se incluye manejo centralizado de errores
