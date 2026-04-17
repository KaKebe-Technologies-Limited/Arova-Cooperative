import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getCurrentUser: () => api.get('/auth/me')
};

// Posts API
export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getBySlug: (slug) => api.get(`/posts/${slug}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`)
};

// Team API
export const teamAPI = {
  getAll: () => api.get('/team'),
  create: (data) => api.post('/team', data),
  update: (id, data) => api.put(`/team/${id}`, data),
  delete: (id) => api.delete(`/team/${id}`)
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`)
};

// Stats API
export const statsAPI = {
  getAll: () => api.get('/stats'),
  create: (data) => api.post('/stats', data),
  update: (id, data) => api.put(`/stats/${id}`, data),
  delete: (id) => api.delete(`/stats/${id}`)
};

// Core Values API
export const coreValuesAPI = {
  getAll: () => api.get('/core-values'),
  create: (data) => api.post('/core-values', data),
  update: (id, data) => api.put(`/core-values/${id}`, data),
  delete: (id) => api.delete(`/core-values/${id}`)
};

// Contact Info API
export const contactInfoAPI = {
  getAll: () => api.get('/contact-info'),
  create: (data) => api.post('/contact-info', data),
  update: (id, data) => api.put(`/contact-info/${id}`, data),
  delete: (id) => api.delete(`/contact-info/${id}`)
};

// Social Links API
export const socialLinksAPI = {
  getAll: () => api.get('/social-links'),
  create: (data) => api.post('/social-links', data),
  update: (id, data) => api.put(`/social-links/${id}`, data),
  delete: (id) => api.delete(`/social-links/${id}`)
};

// Page Content API
export const pageContentAPI = {
  getAll: () => api.get('/page-content'),
  create: (data) => api.post('/page-content', data),
  update: (id, data) => api.put(`/page-content/${id}`, data),
  delete: (id) => api.delete(`/page-content/${id}`)
};

// Contact Submissions API
export const contactSubmissionsAPI = {
  submit: (data) => api.post('/contact-submissions', data),
  getAll: (params) => api.get('/contact-submissions', { params }),
  markAsRead: (id) => api.put(`/contact-submissions/${id}`),
  delete: (id) => api.delete(`/contact-submissions/${id}`)
};

// Upload API
export const uploadAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

export default api;
