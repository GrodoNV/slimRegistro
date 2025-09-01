import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Configuración base de axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token a todas las requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Login
  async login(username, password) {
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        
        // Redirigir al dashboard después del login exitoso
        window.location.href = '/dashboard';
        return response.data;
      }
    } catch (error) {
      // Limpiar cualquier token anterior
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      throw error;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  },

  // Verificar si está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Obtener rol del usuario
  getUserRole() {
    return localStorage.getItem('userRole');
  },

  // Verificar si es admin
  isAdmin() {
    return this.getUserRole() === 'admin';
  },

  // Obtener token
  getToken() {
    return localStorage.getItem('token');
  }
};

export default api;
