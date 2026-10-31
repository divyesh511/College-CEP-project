import axios from 'axios';

// Central API base URL: reads VITE_API_BASE_URL in production, falls back to empty string for local Vite proxy
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

// Create central Axios instance pointing to backend REST API
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
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
