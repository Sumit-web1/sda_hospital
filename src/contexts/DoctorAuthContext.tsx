import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { findDoctorByEmail, type DoctorCredential } from '../data/doctorCredentials';
import { initializeDoctorCredentials, verifyDoctorCredentials } from '../firebase/config';

interface DoctorAuthContextType {
  currentDoctor: DoctorCredential | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const DoctorAuthContext = createContext<DoctorAuthContextType>({
  currentDoctor: null,
  isAuthenticated: false,
  loading: false,
  login: async () => false,
  logout: () => {},
  error: null,
});

export const useDoctorAuth = () => {
  const context = useContext(DoctorAuthContext);
  if (!context) {
    throw new Error('useDoctorAuth must be used within a DoctorAuthProvider');
  }
  return context;
};

interface DoctorAuthProviderProps {
  children: ReactNode;
}

export const DoctorAuthProvider: React.FC<DoctorAuthProviderProps> = ({ children }) => {
  const [currentDoctor, setCurrentDoctor] = useState<DoctorCredential | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount and initialize credentials
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔄 Initializing doctor authentication...');
      try {
        // Initialize doctor credentials in Firebase (but don't wait for it to avoid delays)
        initializeDoctorCredentials().catch(error => {
          console.warn('Firebase initialization failed, using local credentials:', error);
        });

        // Check for existing session immediately
        const savedDoctor = localStorage.getItem('doctorSession');
        const sessionExpiry = localStorage.getItem('doctorSessionExpiry');

        if (savedDoctor && sessionExpiry) {
          const expiryTime = parseInt(sessionExpiry);
          const currentTime = Date.now();

          if (currentTime < expiryTime) {
            // Session is still valid
            const doctorData = JSON.parse(savedDoctor);
            console.log('✅ Found valid session for:', doctorData.name);
            console.log('🔍 Doctor data from session:', doctorData);
            setCurrentDoctor(doctorData);
          } else {
            // Session expired, clear storage
            console.log('⏰ Session expired, clearing storage');
            localStorage.removeItem('doctorSession');
            localStorage.removeItem('doctorSessionExpiry');
            localStorage.removeItem('doctorRememberMe');
          }
        } else {
          console.log('ℹ️ No existing session found');
        }
      } catch (error) {
        console.error('❌ Error initializing authentication:', error);
        // Clear corrupted session data
        localStorage.removeItem('doctorSession');
        localStorage.removeItem('doctorSessionExpiry');
        localStorage.removeItem('doctorRememberMe');
      } finally {
        console.log('✅ Authentication initialization complete');
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Try Firebase authentication first
      const firebaseResult = await verifyDoctorCredentials(email, password);

      if (firebaseResult.success && firebaseResult.doctor) {
        // Set session duration based on remember me option
        const sessionDuration = rememberMe ? (30 * 24 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 30 days or 24 hours
        const sessionExpiry = Date.now() + sessionDuration;

        localStorage.setItem('doctorSession', JSON.stringify(firebaseResult.doctor));
        localStorage.setItem('doctorSessionExpiry', sessionExpiry.toString());
        localStorage.setItem('doctorRememberMe', rememberMe.toString());

        setCurrentDoctor(firebaseResult.doctor as DoctorCredential);
        setError(null);
        return true;
      } else {
        // Fallback to local credentials for demo purposes
        const doctor = findDoctorByEmail(email);

        if (!doctor) {
          setError('Doctor not found. Please check your email address.');
          return false;
        }

        // Verify password
        if (password !== doctor.defaultPassword) {
          setError('Invalid password. Please try again.');
          return false;
        }

        // Set session duration based on remember me option
        const sessionDuration = rememberMe ? (30 * 24 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 30 days or 24 hours
        const sessionExpiry = Date.now() + sessionDuration;

        localStorage.setItem('doctorSession', JSON.stringify(doctor));
        localStorage.setItem('doctorSessionExpiry', sessionExpiry.toString());
        localStorage.setItem('doctorRememberMe', rememberMe.toString());

        console.log('✅ Local login successful for doctor:', doctor.name);
        setCurrentDoctor(doctor);
        setError(null);
        return true;
      }

    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentDoctor(null);
    setError(null);
    localStorage.removeItem('doctorSession');
    localStorage.removeItem('doctorSessionExpiry');
    localStorage.removeItem('doctorRememberMe');
  };

  // Auto-logout when session expires
  useEffect(() => {
    if (currentDoctor) {
      const checkSessionExpiry = () => {
        const sessionExpiry = localStorage.getItem('doctorSessionExpiry');
        if (sessionExpiry) {
          const expiryTime = parseInt(sessionExpiry);
          const currentTime = Date.now();
          
          if (currentTime >= expiryTime) {
            logout();
          }
        }
      };

      // Check every minute
      const interval = setInterval(checkSessionExpiry, 60000);
      return () => clearInterval(interval);
    }
  }, [currentDoctor]);

  const value = {
    currentDoctor,
    isAuthenticated: !!currentDoctor,
    loading,
    login,
    logout,
    error,
  };

  return (
    <DoctorAuthContext.Provider value={value}>
      {children}
    </DoctorAuthContext.Provider>
  );
};
