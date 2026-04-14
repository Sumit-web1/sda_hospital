import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

interface ReceptionistUser {
  uid: string;
  email: string;
  name: string;
  role: string;
}

interface ReceptionistAuthContextType {
  currentReceptionist: ReceptionistUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  error: string | null;
}

const ReceptionistAuthContext = createContext<ReceptionistAuthContextType | null>(null);

export const useReceptionistAuth = () => {
  const context = useContext(ReceptionistAuthContext);
  if (!context) {
    throw new Error("useReceptionistAuth must be used within ReceptionistAuthProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const ReceptionistAuthProvider: React.FC<Props> = ({ children }) => {
  const [currentReceptionist, setCurrentReceptionist] = useState<ReceptionistUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        setCurrentReceptionist(null);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();
          if (data.role === "reception") {
            setCurrentReceptionist({
              uid: user.uid,
              email: user.email || "",
              name: data.name,
              role: data.role,
            });
            setError(null);
          } else {
            setCurrentReceptionist(null);
          }
        } else {
          setCurrentReceptionist(null);
        }
      } catch (err) {
        console.error("Auth init error:", err);
        setError("Failed to initialize authentication.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists() || snap.data()?.role !== "reception") {
        await signOut(auth);
        setError("Unauthorized access. Receptionist only.");
        setLoading(false);
        return false;
      }

      const data = snap.data();
      setCurrentReceptionist({
        uid: user.uid,
        email: user.email || "",
        name: data.name,
        role: data.role,
      });

      if (rememberMe) {
        localStorage.setItem("rememberReceptionist", "true");
      }

      return true;
    } catch (err: any) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentReceptionist(null);
      localStorage.removeItem("rememberReceptionist");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const hasPermission = (permission: string): boolean => {
    return currentReceptionist?.role === "reception";
  };

  const value: ReceptionistAuthContextType = {
    currentReceptionist,
    isAuthenticated: !!currentReceptionist,
    loading,
    login,
    logout,
    hasPermission,
    error,
  };

  return (
    <ReceptionistAuthContext.Provider value={value}>
      {children}
    </ReceptionistAuthContext.Provider>
  );
};