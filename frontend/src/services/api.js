import axios from 'axios';

// Create central Axios instance pointing to backend REST API
const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically inject JWT Bearer Token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cybersafe_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Intercept 401 Unauthorized (expired token) gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and user storage if unauthorized/expired
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        localStorage.removeItem('cybersafe_token');
        localStorage.removeItem('cybersafe_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
