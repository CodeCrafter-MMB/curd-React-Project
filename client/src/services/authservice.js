import axios from 'axios';

// Backend URL - Vite env ke through set karein
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Axios instance with default config
const api = axios.create({
  baseURL: `${API_URL}/api/auth`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth functions
const authService = {
  // Register/Signup
  register: async (userData) => {
    try {
      console.log('authService - Input userData:', userData); // Debug
      
      // Backend firstName expect karta hai
      const payload = {
        firstName: userData.name,
        email: userData.email,
        password: userData.password
      };
      
      console.log('authService - Sending payload:', payload); // Debug
      
      const response = await api.post('/register', payload);
      
      console.log('authService - Response:', response.data); // Debug
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('authService - Full error:', error); // Debug
      console.error('authService - Error response:', error.response?.data); // Debug
      throw error.response?.data || { message: error.message };
    }
  },

  // Login
  login: async (credentials) => {
    try {
      console.log('authService - Login credentials:', credentials); // Debug
      
      const response = await api.post('/login', credentials);
      
      console.log('authService - Login response:', response.data); // Debug
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('authService - Login error:', error.response?.data); // Debug
      throw error.response?.data || { message: error.message };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;