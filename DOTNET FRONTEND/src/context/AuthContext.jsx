import { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken, isTokenValid, getDecodedToken } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      const decoded = getDecodedToken();
      setUser(decoded);
      setAuthToken(token);
    } else {
      setAuthToken(null);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    console.log("in login", token);
    setAuthToken(token);
    const decoded = getDecodedToken();
    console.log("in login decoded", decoded);
    setUser(decoded);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    
  };

  if (loading) {
    return null;
  }
  console.log("in auth context", user);
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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