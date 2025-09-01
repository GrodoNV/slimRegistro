import api from './authService';

export const caseService = {
  // Obtener todos los casos
  async getAllCases() {
    const response = await api.get('/cases');
    return response.data;
  },

  // Obtener caso por ID
  async getCaseById(id) {
    const response = await api.get(`/cases/${id}`);
    return response.data;
  },

  // Crear nuevo caso
  async createCase(caseData) {
    const formData = new FormData();
    for (const key in caseData) {
      formData.append(key, caseData[key]);
    }
    const response = await api.post('/cases', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Actualizar caso
  async updateCase(id, caseData) {
    const formData = new FormData();
    for (const key in caseData) {
      if (caseData[key] !== null && caseData[key] !== undefined) {
        formData.append(key, caseData[key]);
      }
    }
    const response = await api.put(`/cases/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Eliminar caso
  async deleteCase(id) {
    const response = await api.delete(`/cases/${id}`);
    return response.data;
  }
};
