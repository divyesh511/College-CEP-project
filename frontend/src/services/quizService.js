import api from './api';

export const quizService = {
  getAllQuizzes: async (categoryId = null) => {
    let url = '/quizzes';
    if (categoryId) url += `?categoryId=${categoryId}`;
    const res = await api.get(url);
    return res.data;
  },

  getQuizForPlay: async (id) => {
    const res = await api.get(`/quizzes/${id}`);
    return res.data;
  },

  submitQuiz: async (id, answers) => {
    const res = await api.post(`/quizzes/${id}/submit`, { answers });
    return res.data;
  },

  getMyQuizHistory: async () => {
    const res = await api.get('/quizzes/attempts/my');
    return res.data;
  },

  getQuizForAdmin: async (id) => {
    const res = await api.get(`/admin/quizzes/${id}`);
    return res.data;
  },

  createQuiz: async (data) => {
    const res = await api.post('/admin/quizzes', data);
    return res.data;
  },

  updateQuiz: async (id, data) => {
    const res = await api.put(`/admin/quizzes/${id}`, data);
    return res.data;
  },

  deleteQuiz: async (id) => {
    const res = await api.delete(`/admin/quizzes/${id}`);
    return res.data;
  },
};
