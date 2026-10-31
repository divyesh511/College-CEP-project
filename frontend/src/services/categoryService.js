import api from './api';

export const categoryService = {
  getAllCategories: async () => {
    const res = await api.get('/categories');
    return res.data;
  },

  getCategoryById: async (id) => {
    const res = await api.get(`/categories/${id}`);
    return res.data;
  },

  createCategory: async (data) => {
    const res = await api.post('/admin/categories', data);
    return res.data;
  },

  updateCategory: async (id, data) => {
    const res = await api.put(`/admin/categories/${id}`, data);
    return res.data;
  },

  deleteCategory: async (id) => {
    const res = await api.delete(`/admin/categories/${id}`);
    return res.data;
  },
};
