import api from './api';

export const articleService = {
  getPublishedArticles: async (categoryId = null, search = '', page = 0, size = 9) => {
    let url = `/articles?page=${page}&size=${size}`;
    if (categoryId) url += `&categoryId=${categoryId}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const res = await api.get(url);
    return res.data;
  },

  getArticleBySlug: async (slug) => {
    const res = await api.get(`/articles/slug/${slug}`);
    return res.data;
  },

  getArticleById: async (id) => {
    const res = await api.get(`/articles/${id}`);
    return res.data;
  },

  getAllArticlesForAdmin: async (search = '', page = 0, size = 10) => {
    let url = `/admin/articles?page=${page}&size=${size}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const res = await api.get(url);
    return res.data;
  },

  createArticle: async (data) => {
    const res = await api.post('/admin/articles', data);
    return res.data;
  },

  updateArticle: async (id, data) => {
    const res = await api.put(`/admin/articles/${id}`, data);
    return res.data;
  },

  togglePublish: async (id, status) => {
    const res = await api.patch(`/admin/articles/${id}/publish?status=${status}`);
    return res.data;
  },

  deleteArticle: async (id) => {
    const res = await api.delete(`/admin/articles/${id}`);
    return res.data;
  },
};
