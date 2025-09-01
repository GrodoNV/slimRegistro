import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Verificar si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles permitidos, verificar que el usuario tenga uno de ellos
  if (allowedRoles.length > 0) {
    const userRole = authService.getUserRole();
    if (!allowedRoles.includes(userRole)) {
      // Redirigir al dashboard si no tiene permisos para esta ruta
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
