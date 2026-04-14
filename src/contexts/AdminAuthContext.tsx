import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebase/config';
import type { AdminCredential } from '../data/adminCredentials';

interface AdminAuthContextType {
  currentAdmin: AdminCredential | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState<AdminCredential | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setCurrentAdmin({
          id: Date.now(),
          email: user.email ?? '',
          defaultPassword: '',
          name: user.displayName ?? 'Administrator',
          role: 'Administrator',
          department: 'Administration',
          level: 'super_admin',
          permissions: ['ALL']
        });
      } else {
        setCurrentAdmin(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );
      return true;
    } catch {
      setError('Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentAdmin(null);
    window.location.href = '/admin-login';
  };

  const hasPermission = (permission: string): boolean => {
    if (!currentAdmin) return false;
    if (currentAdmin.permissions.includes('ALL')) return true;
    return currentAdmin.permissions.includes(permission);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        currentAdmin,
        isAuthenticated: !!currentAdmin,
        loading,
        login,
        logout,
        hasPermission,
        error
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
