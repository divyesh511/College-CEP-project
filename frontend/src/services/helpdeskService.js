import api from './api';

export const helpdeskService = {
  submitQuery: async (data) => {
    const res = await api.post('/helpdesk', data);
    return res.data;
  },

  getMyQueries: async () => {
    const res = await api.get('/helpdesk/my');
    return res.data;
  },

  getQueryById: async (id) => {
    const res = await api.get(`/helpdesk/${id}`);
    return res.data;
  },

  getAllQueriesForAdmin: async (status = null, page = 0, size = 10) => {
    let url = `/admin/helpdesk?page=${page}&size=${size}`;
    if (status) url += `&status=${status}`;
    const res = await api.get(url);
    return res.data;
  },

  respondToQuery: async (id, data) => {
    const res = await api.put(`/admin/helpdesk/${id}/respond`, data);
    return res.data;
  },
};
