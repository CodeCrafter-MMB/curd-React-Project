import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../config/firebase';

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
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        return 'Login cancelled. Please try again.';
      case 'auth/popup-blocked':
        return 'Popup blocked by browser. Please allow popups and try again.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email address but different sign-in credentials. Please sign in using the original method.';
      case 'auth/user-cancelled':
        return 'Login cancelled. Please try again.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      default:
        return error.message || 'An error occurred during authentication. Please try again.';
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email.split('@')[0])}`
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        id: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || result.user.email.split('@')[0],
        avatar: result.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(result.user.displayName || result.user.email.split('@')[0])}`
      });
      return true;
    } catch (err) {
      setError(formatAuthError(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      await updateProfile(result.user, {
        displayName: name,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
      });

      setUser({
        id: result.user.uid,
        email: result.user.email,
        name: name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
      });
      
      return true;
    } catch (err) {
      setError(formatAuthError(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Get user info from the social provider
      const userInfo = {
        id: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || result.user.email.split('@')[0],
        avatar: result.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(result.user.displayName || result.user.email.split('@')[0])}`
      };

      // If no display name is set, update the profile
      if (!result.user.displayName) {
        await updateProfile(result.user, {
          displayName: result.user.email.split('@')[0],
          photoURL: userInfo.avatar
        });
      }

      setUser(userInfo);
      return true;
    } catch (err) {
      setError(formatAuthError(err));
      console.error('Social login error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => handleSocialLogin(googleProvider);
  const loginWithFacebook = () => handleSocialLogin(facebookProvider);

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
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