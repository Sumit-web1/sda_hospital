import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

interface HRUser {
  uid: string;
  email: string;
  name: string;
  role: "HR";
}

interface HRContextType {
  hrUser: HRUser | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const HRAuthContext = createContext<HRContextType | null>(null);

export const HRAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [hrUser, setHrUser] = useState<HRUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        setHrUser(null);
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists() && snap.data().role === "HR") {
          const data = snap.data();
          setHrUser({
            uid: user.uid,
            email: data.email || user.email || "",
            name: data.name,
            role: "HR"
          });
        } else {
          setHrUser(null);
        }
      } catch (err) {
        setHrUser(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", cred.user.uid));

    if (!snap.exists() || snap.data().role !== "HR") {
      await signOut(auth);
      throw new Error("Access Denied: You do not have HR privileges.");
    }

    const data = snap.data();
    setHrUser({
      uid: cred.user.uid,
      email: data.email || cred.user.email || "",
      name: data.name,
      role: "HR"
    });
  };

  const logout = async () => {
    await signOut(auth);
    setHrUser(null);
  };

  return (
    <HRAuthContext.Provider value={{ hrUser, login, logout, loading }}>
      {children}
    </HRAuthContext.Provider>
  );
};

export const useHRAuth = () => {
  const ctx = useContext(HRAuthContext);
  if (!ctx) {
    throw new Error("useHRAuth must be used inside HRAuthProvider");
  }
  return ctx;
};