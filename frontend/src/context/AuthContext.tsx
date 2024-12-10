import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login, logout, validateSession } from '../services/authService';

interface AuthProviderProps {
  children: ReactNode; 
}

interface AuthContextType {
  user: any | null;
  loginUser: (credentials: { identifier: string; password: string }) => Promise<void>;
  logoutUser: () => Promise<void>;
  validateUserSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  const loginUser = async (credentials: { identifier: string; password: string }) => {
    const response = await login(credentials);
    setUser(response.user);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  const validateUserSession = async () => {
    const session = await validateSession();
    setUser(session.user);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, validateUserSession }}>
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
