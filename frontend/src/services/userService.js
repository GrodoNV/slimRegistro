import api from './authService';

export const userService = {
  // Obtener todos los usuarios
  async getAllUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  // Obtener usuario por ID
  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Crear nuevo usuario
  async createUser(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Actualizar usuario
  async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Cambiar contraseña
  async changePassword(id, passwordData) {
    const response = await api.put(`/users/${id}/password`, passwordData);
    return response.data;
  },

  // Eliminar usuario
  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};
