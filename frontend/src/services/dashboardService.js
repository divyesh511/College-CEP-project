import api from './api';

export const dashboardService = {
  getAdminStats: async () => {
    const res = await api.get('/admin/dashboard/stats');
    return res.data;
  },
};
