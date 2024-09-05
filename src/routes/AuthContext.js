import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';

// Create AuthContext
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: !!Cookies.get('authToken'),
    user: null,
  });

  const login = (userData) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
    });
    // Store user details in cookies or other storage
    Cookies.set('authToken', userData.token);
    Cookies.set('userId', userData.userId);
    Cookies.set('userDetails', JSON.stringify(userData.userDetails));
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    Cookies.remove('authToken');
    Cookies.remove('userId');
    Cookies.remove('userDetails');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
