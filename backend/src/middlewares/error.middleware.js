// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Errores de validación de Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json({ 
      error: 'Error de validación', 
      details: errors 
    });
  }
  
  // Error de duplicación (unique constraint)
  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: `${e.path} ya está en uso`
    }));
    return res.status(400).json({ 
      error: 'Error de duplicación', 
      details: errors 
    });
  }
  
  // Error de foreign key
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ 
      error: 'No se puede eliminar este recurso porque está siendo utilizado por otros elementos' 
    });
  }
  
  // Error por defecto
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
};

// Middleware para manejar rutas no encontradas
const notFound = (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method
  });
};

module.exports = {
  errorHandler,
  notFound
};
