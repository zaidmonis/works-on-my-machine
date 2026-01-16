import React from "react";
import api from "./api";

type User = { id: string; username: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
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
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const response = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const signup = async (username: string, password: string) => {
    const response = await api.post("/auth/signup", { username, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
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
