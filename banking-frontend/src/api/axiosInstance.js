import axios from 'axios';

// In development the Vite proxy forwards /api → http://localhost:8080/api.
// In production set VITE_API_BASE_URL to your deployed backend origin, e.g.
//   VITE_API_BASE_URL=https://api.mybank.com
// Leave it unset (or empty) to keep using the relative /api path (same-origin deploy).
const BASE = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : '/api';

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
