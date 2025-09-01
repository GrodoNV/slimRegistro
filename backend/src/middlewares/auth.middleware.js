const jwt = require('jsonwebtoken');
const { User } = require('../../models');

// Middleware para verificar el token JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ error: 'Token de acceso requerido' });
    }
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar que el usuario aún existe en la base de datos
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    
    // Agregar información del usuario a la request
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Middleware para requerir rol de admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador' });
  }
  next();
};

// Middleware para requerir rol específico
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Acceso denegado. Se requiere uno de estos roles: ${roles.join(', ')}` 
      });
    }
    next();
  };
};

// Middleware para verificar si el usuario puede acceder a su propio recurso o es admin
const canAccessResource = (resourceUserId) => {
  return (req, res, next) => {
    // Los admins pueden acceder a cualquier recurso
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Los usuarios normales solo pueden acceder a sus propios recursos
    if (parseInt(resourceUserId) === req.user.id) {
      return next();
    }
    
    res.status(403).json({ error: 'Acceso denegado' });
  };
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireRole,
  canAccessResource
};
