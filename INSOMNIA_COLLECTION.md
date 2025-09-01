# Guía de Uso en Insomnia - API de Gestión de Usuarios

## Configuración Inicial

### 1. Crear un nuevo proyecto en Insomnia
- Nombre: `Sistema de Gestión de Usuarios`
- Base URL: `http://localhost:3000`

## Colección de Requests

### 🔐 Autenticación

#### Login como Admin
- **Método**: POST
- **URL**: `{{base_url}}/api/auth/login`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Variables de respuesta**:
  - `token`: `{{response.body.token}}`
  - `role`: `{{response.body.role}}`

#### Login como Usuario Normal
- **Método**: POST
- **URL**: `{{base_url}}/api/auth/login`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "username": "testuser",
    "password": "test123"
  }
  ```

### 👥 Gestión de Usuarios (Solo Admin)

#### Obtener Todos los Usuarios
- **Método**: GET
- **URL**: `{{base_url}}/api/users`
- **Headers**:
  ```
  Authorization: Bearer {{token}}
  ```

#### Obtener Usuario por ID
- **Método**: GET
- **URL**: `{{base_url}}/api/users/1`
- **Headers**:
  ```
  Authorization: Bearer {{token}}
  ```

#### Crear Nuevo Usuario
- **Método**: POST
- **URL**: `{{base_url}}/api/users`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer {{token}}
  ```
- **Body** (JSON):
  ```json
  {
    "username": "nuevo_admin",
    "password": "admin123",
    "role": "admin"
  }
  ```

#### Actualizar Usuario
- **Método**: PUT
- **URL**: `{{base_url}}/api/users/1`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer {{token}}
  ```
- **Body** (JSON):
  ```json
  {
    "username": "admin_actualizado",
    "role": "admin"
  }
  ```

#### Cambiar Contraseña
- **Método**: PUT
- **URL**: `{{base_url}}/api/users/1/password`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer {{token}}
  ```
- **Body** (JSON):
  ```json
  {
    "newPassword": "nueva_contraseña123"
  }
  ```

#### Eliminar Usuario
- **Método**: DELETE
- **URL**: `{{base_url}}/api/users/1`
- **Headers**:
  ```
  Authorization: Bearer {{token}}
  ```

## Variables de Entorno

### Configurar en Insomnia
1. Ir a **Manage Environments**
2. Crear nuevo environment: `Local Development`
3. Agregar variables:

```json
{
  "base_url": "http://localhost:3000",
  "token": "",
  "admin_token": "",
  "user_token": ""
}
```

### Actualizar Token Automáticamente
1. En el request de login, ir a **Tests**
2. Agregar script:

```javascript
if (response.code === 200) {
  const data = JSON.parse(response.body);
  insomnia.setEnvironmentVariable('token', data.token);
  
  if (data.role === 'admin') {
    insomnia.setEnvironmentVariable('admin_token', data.token);
  } else {
    insomnia.setEnvironmentVariable('user_token', data.token);
  }
}
```

## Flujo de Pruebas Recomendado

### 1. Autenticación
1. Hacer login como admin
2. Verificar que se obtenga el token
3. Hacer login como usuario normal
4. Verificar que se obtenga el token

### 2. Funcionalidades de Admin
1. Obtener todos los usuarios
2. Crear un nuevo usuario
3. Obtener el usuario creado por ID
4. Actualizar el usuario
5. Cambiar la contraseña del usuario
6. Eliminar el usuario

### 3. Verificación de Seguridad
1. Intentar acceder a rutas de admin con token de usuario
2. Verificar que se reciba error 403
3. Intentar acceder sin token
4. Verificar que se reciba error 401

## Ejemplos de Respuestas

### Respuesta de Error de Autorización
```json
{
  "error": "Acceso denegado. Se requiere rol de administrador"
}
```

### Respuesta de Error de Token
```json
{
  "error": "Token de acceso requerido"
}
```

### Respuesta de Usuario Creado
```json
{
  "message": "Usuario creado exitosamente",
  "user": {
    "id": 10,
    "username": "nuevo_admin",
    "role": "admin",
    "createdAt": "2025-08-31T23:50:00.000Z",
    "updatedAt": "2025-08-31T23:50:00.000Z"
  }
}
```

## Consejos de Uso

1. **Siempre usar el token correcto**: Admin para gestión, User para autenticación básica
2. **Verificar respuestas**: Revisar códigos de estado y mensajes de error
3. **Probar casos límite**: Usuarios inexistentes, tokens expirados, etc.
4. **Mantener orden**: Crear usuarios de prueba, modificarlos, eliminarlos
5. **Verificar seguridad**: Intentar acceder sin autorización para confirmar protección

## Solución de Problemas

### Error 500
- Verificar que el servidor esté corriendo
- Revisar logs del backend
- Verificar conexión a la base de datos

### Error 401
- Token expirado o inválido
- Hacer login nuevamente
- Verificar formato del token en headers

### Error 403
- Usuario no tiene permisos de admin
- Verificar rol del usuario logueado
- Usar token de usuario admin

### Error 404
- Ruta incorrecta
- Usuario no encontrado
- Verificar ID del usuario
