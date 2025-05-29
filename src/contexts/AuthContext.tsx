
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name?: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: "admin" | "user", name?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");
    const userName = localStorage.getItem("userName");

    if (userEmail && userRole) {
      setUser({
        email: userEmail,
        role: userRole as "admin" | "user",
        name: userName || undefined
      });
    }
  }, []);

  const login = (email: string, role: "admin" | "user", name?: string) => {
    const userData = { email, role, name };
    setUser(userData);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);
    if (name) localStorage.setItem("userName", name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin"
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
