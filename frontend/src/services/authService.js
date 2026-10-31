import api from './api';

export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await api.put('/auth/profile', data);
    return res.data;
  },

  changePassword: async (data) => {
    const res = await api.put('/auth/change-password', data);
    return res.data;
  },

  getAllUsers: async (page = 0, size = 10) => {
    const res = await api.get(`/admin/users?page=${page}&size=${size}`);
    return res.data;
  },
};
