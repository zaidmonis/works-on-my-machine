import React from "react";
import api from "./api";

type User = { id: string; username: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  isGuest: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: () => void;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);
  const [loading, setLoading] = React.useState(true);
  const [isGuest, setIsGuest] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      const guestMode = sessionStorage.getItem("guest") === "true";
      setIsGuest(guestMode);
      setLoading(false);
      return;
    }
    api
      .get("/me")
      .then((response) => setUser(response.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setIsGuest(false);
        setLoading(false);
      });
  }, []);

  const login = async (username: string, password: string) => {
    const response = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    setIsGuest(false);
    sessionStorage.removeItem("guest");
  };

  const signup = async (username: string, password: string) => {
    const response = await api.post("/auth/signup", { username, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    setIsGuest(false);
    sessionStorage.removeItem("guest");
  };

  const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    setUser(null);
    setIsGuest(false);
    sessionStorage.removeItem("guest");
  };

  const continueAsGuest = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsGuest(true);
    sessionStorage.setItem("guest", "true");
  };

  return (
    <AuthContext.Provider value={{ user, loading, isGuest, login, signup, logout, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
