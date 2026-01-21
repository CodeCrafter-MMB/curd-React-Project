import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authservice'; 

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatAuthError = (error) => {
    // Backend se aane wale errors ko format karein
    if (typeof error === 'string') {
      return error;
    }
    
    if (error.message) {
      return error.message;
    }

    // Common backend errors
    switch (error.code || error.status) {
      case 401:
        return 'Invalid email or password.';
      case 409:
        return 'An account with this email already exists.';
      case 404:
        return 'No account found with this email address.';
      case 400:
        return error.message || 'Invalid request. Please check your input.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  // Component mount hone par user ko check karein
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = authService.getCurrentUser();
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        setUser({
          id: storedUser.id || storedUser._id,
          email: storedUser.email,
          name: storedUser.name || storedUser.displayName || storedUser.email.split('@')[0],
          avatar: storedUser.avatar || storedUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(storedUser.name || storedUser.email.split('@')[0])}`
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      
      const userData = {
        id: response.user.id || response.user._id,
        email: response.user.email,
        name: response.user.name || response.user.displayName || response.user.email.split('@')[0],
        avatar: response.user.avatar || response.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(response.user.name || response.user.email.split('@')[0])}`
      };
      
      setUser(userData);
      return true;
    } catch (err) {
      const errorMessage = formatAuthError(err);
      setError(errorMessage);
      console.error('Login error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
  setLoading(true);
  setError(null);
  
  console.log('Register called with:', { name, email, password }); // Debug
  
  try {
    const response = await authService.register({ 
      name, 
      email, 
      password 
    });
    
    console.log('Register response:', response); // Debug
    
    const userData = {
      id: response.user.id || response.user._id,
      email: response.user.email,
      name: response.user.name || name,
      avatar: response.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
    };
    
    setUser(userData);
    return true;
  } catch (err) {
    console.error('Register error details:', err); // Debug
    const errorMessage = formatAuthError(err);
    setError(errorMessage);
    return false;
  } finally {
    setLoading(false);
  }
};

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      // Google OAuth flow - window popup ya redirect use karein
      // Ye backend se Google OAuth URL milega
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      // Backend ka Google OAuth URL
      const googleAuthUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`;
      
      const popup = window.open(
        googleAuthUrl,
        'Google Login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Listen for message from popup
      return new Promise((resolve) => {
        window.addEventListener('message', async (event) => {
          if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
            popup.close();
            
            const userData = {
              id: event.data.user.id || event.data.user._id,
              email: event.data.user.email,
              name: event.data.user.name || event.data.user.email.split('@')[0],
              avatar: event.data.user.avatar || event.data.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.data.user.name)}`
            };
            
            // Store token
            localStorage.setItem('token', event.data.token);
            localStorage.setItem('user', JSON.stringify(event.data.user));
            
            setUser(userData);
            setLoading(false);
            resolve(true);
          } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
            popup.close();
            setError(formatAuthError(event.data.error));
            setLoading(false);
            resolve(false);
          }
        }, { once: true });
      });
    } catch (err) {
      const errorMessage = formatAuthError(err);
      setError(errorMessage);
      console.error('Google login error:', err);
      setLoading(false);
      return false;
    }
  };

  const loginWithFacebook = async () => {
    setLoading(true);
    setError(null);
    try {
      // Facebook OAuth flow - similar to Google
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const facebookAuthUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/facebook`;
      
      const popup = window.open(
        facebookAuthUrl,
        'Facebook Login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      return new Promise((resolve) => {
        window.addEventListener('message', async (event) => {
          if (event.data.type === 'FACEBOOK_AUTH_SUCCESS') {
            popup.close();
            
            const userData = {
              id: event.data.user.id || event.data.user._id,
              email: event.data.user.email,
              name: event.data.user.name || event.data.user.email.split('@')[0],
              avatar: event.data.user.avatar || event.data.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.data.user.name)}`
            };
            
            localStorage.setItem('token', event.data.token);
            localStorage.setItem('user', JSON.stringify(event.data.user));
            
            setUser(userData);
            setLoading(false);
            resolve(true);
          } else if (event.data.type === 'FACEBOOK_AUTH_ERROR') {
            popup.close();
            setError(formatAuthError(event.data.error));
            setLoading(false);
            resolve(false);
          }
        }, { once: true });
      });
    } catch (err) {
      const errorMessage = formatAuthError(err);
      setError(errorMessage);
      console.error('Facebook login error:', err);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      authService.logout();
      setUser(null);
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    loginWithGoogle,
    loginWithFacebook,
    isAuthenticated: !!user
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};