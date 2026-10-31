import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cybersafe_token'));
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on load
  useEffect(() => {
    const storedUser = localStorage.getItem('cybersafe_user');
    const storedToken = localStorage.getItem('cybersafe_token');

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (err) {
        console.error('Error parsing stored user data:', err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = (authToken, userData) => {
    localStorage.setItem('cybersafe_token', authToken);
    localStorage.setItem('cybersafe_user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('cybersafe_token');
    localStorage.removeItem('cybersafe_user');
    setToken(null);
    setUser(null);
  };

  // Check role helper
  const hasRole = (roleName) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(roleName);
  };

  const isAdmin = () => hasRole('ROLE_ADMIN');
  const isAuthenticated = () => !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        setUser,
        hasRole,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
